#!/usr/bin/env python3
"""
Descarga dos CSVs publicadas desde Google Sheets (Categorias y Platos)
y genera js/carta-data.json con el schema que consume la web.

Variables de entorno requeridas:
    SHEET_CATEGORIAS_URL   URL CSV publicada de la pestaña Categorias
    SHEET_PLATOS_URL       URL CSV publicada de la pestaña Platos

Variables opcionales:
    OUTPUT_PATH            Ruta del JSON de salida (default: js/carta-data.json)

Uso local:
    SHEET_CATEGORIAS_URL=... SHEET_PLATOS_URL=... python scripts/build-carta.py
"""

import csv
import io
import json
import os
import sys
import urllib.request
from pathlib import Path

CAT_REQUIRED = [
    "id", "orden",
    "nombre_val", "nombre_esp",
    "nota_texto_val", "nota_texto_esp",
    "nota_extra_val", "nota_extra_esp",
    "precio",
]
PLATO_REQUIRED = [
    "cat_id", "orden",
    "nombre_val", "nombre_esp",
    "desc_val", "desc_esp",
]


def fetch_csv(url: str) -> list[dict]:
    with urllib.request.urlopen(url, timeout=30) as resp:
        raw = resp.read().decode("utf-8-sig")
    reader = csv.DictReader(io.StringIO(raw))
    return [{(k or "").strip(): (v or "").strip() for k, v in row.items()} for row in reader]


def ensure_columns(rows: list[dict], required: list[str], label: str) -> None:
    if not rows:
        sys.exit(f"ERROR: la pestaña '{label}' está vacía")
    missing = [c for c in required if c not in rows[0]]
    if missing:
        sys.exit(f"ERROR: faltan columnas en '{label}': {missing}")


def to_int(value: str, label: str) -> int:
    try:
        return int(value)
    except ValueError:
        sys.exit(f"ERROR: 'orden' no numérico en {label}: {value!r}")


def build_lang(categorias: list[dict], platos: list[dict], lang: str) -> dict:
    name_col = "nombre_val" if lang == "val" else "nombre_esp"
    note_text_col = "nota_texto_val" if lang == "val" else "nota_texto_esp"
    note_extra_col = "nota_extra_val" if lang == "val" else "nota_extra_esp"
    desc_col = "desc_val" if lang == "val" else "desc_esp"

    platos_por_cat: dict[str, list[dict]] = {}
    for p in platos:
        cat_id = p["cat_id"]
        if not cat_id:
            continue
        platos_por_cat.setdefault(cat_id, []).append(p)

    categories = []
    for cat in sorted(categorias, key=lambda c: to_int(c["orden"], f"Categorias id={c.get('id')}")):
        cat_id = cat["id"]
        if not cat_id:
            continue
        items_sorted = sorted(
            platos_por_cat.get(cat_id, []),
            key=lambda p: to_int(p["orden"], f"Platos cat_id={cat_id}"),
        )
        cat_obj = {
            "name": cat[name_col],
            "items": [
                {"name": p[name_col], "desc": p[desc_col]}
                for p in items_sorted
            ],
        }
        if cat[note_text_col] or cat["precio"]:
            cat_obj["note"] = {
                "text": cat[note_text_col],
                "extra": cat[note_extra_col],
                "price": cat["precio"],
            }
        categories.append(cat_obj)

    return {"categories": categories}


def main() -> None:
    cat_url = os.environ.get("SHEET_CATEGORIAS_URL")
    plato_url = os.environ.get("SHEET_PLATOS_URL")
    if not cat_url or not plato_url:
        sys.exit("ERROR: define SHEET_CATEGORIAS_URL y SHEET_PLATOS_URL")

    print("Descargando Categorias…")
    categorias = fetch_csv(cat_url)
    ensure_columns(categorias, CAT_REQUIRED, "Categorias")

    print("Descargando Platos…")
    platos = fetch_csv(plato_url)
    ensure_columns(platos, PLATO_REQUIRED, "Platos")

    data = {
        "val": build_lang(categorias, platos, "val"),
        "es": build_lang(categorias, platos, "esp"),
    }

    output = Path(os.environ.get("OUTPUT_PATH", "js/carta-data.json"))
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Escrito {output} ({len(categorias)} categorías, {len(platos)} platos)")


if __name__ == "__main__":
    main()
