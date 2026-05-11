# Carta — cómo actualizarla

La carta de calmarengo.com se genera desde una Google Sheet. La parte "dinámica" (categorías y platos) vive en la Sheet; los textos fijos (*Extres*, *Fora de Carta*, títulos) siguen en `js/carta-data.js`.

## Flujo rápido

1. Editas la Sheet.
2. (Automático cada hora, o manual desde **Actions → Update carta from Google Sheet → Run workflow**.)
3. La Action descarga las CSVs, genera `js/carta-data.json`, commitea a `main` si hay cambios. GitHub Pages redespliega en ~1 minuto.

> Google tarda **hasta 5 minutos** en refrescar la versión publicada como CSV. Si editas y lanzas la Action al instante, espera 5 minutos y vuelve a lanzarla.

## Setup inicial (solo una vez)

1. Crea la Google Sheet con dos pestañas: `Categorias` y `Platos`.
2. En cada pestaña, **Archivo → Compartir → Publicar en la web** → selecciona la pestaña → formato **CSV** → Publicar. Copia la URL.
3. En el repo: **Settings → Secrets and variables → Actions → Variables** → crea:
   - `SHEET_CATEGORIAS_URL` = URL CSV de la pestaña Categorias
   - `SHEET_PLATOS_URL` = URL CSV de la pestaña Platos
4. Lanza el workflow manualmente una vez para verificar.

## Estructura de la Sheet

### Pestaña `Categorias`

| Columna | Significado |
|---|---|
| `id` | Identificador corto y único, sin espacios (ej. `entrepans`, `cavall`). |
| `orden` | Entero; orden de aparición en la carta. |
| `nombre_val` / `nombre_esp` | Nombre de la categoría en cada idioma. |
| `nota_texto_val` / `nota_texto_esp` | Texto de la nota-precio (ej. "Entrepa, una beguda i café"). Dejar vacío si no hay nota. |
| `nota_extra_val` / `nota_extra_esp` | Paréntesis extra (ej. "(olives i cacau)"). |
| `precio` | Precio común (ej. `9,00€`). |

### Pestaña `Platos`

| Columna | Significado |
|---|---|
| `cat_id` | Debe coincidir con un `id` de la pestaña Categorias. |
| `orden` | Entero; orden dentro de la categoría. |
| `nombre_val` / `nombre_esp` | Nombre del plato. |
| `desc_val` / `desc_esp` | Descripción. Se permiten etiquetas `<strong>` para resaltar. |

## Operaciones frecuentes

- **Añadir plato:** nueva fila en `Platos`. Pon el `cat_id` correcto y el `orden`.
- **Mover plato de categoría:** cambia `cat_id`.
- **Cambiar un precio de sección:** edita `precio` en `Categorias` (solo una vez; aplica a todos los platos de esa sección).
- **Ocultar categoría temporalmente:** bórrala de `Categorias` (sus platos dejarán de aparecer). Para restaurar, vuelve a añadir la fila.
- **Cambiar *Extres* o *Fora de Carta*:** editar directamente `js/carta-data.js` y hacer commit. No vienen de la Sheet.

## Probar localmente antes de mergear

La web lee `js/carta-data.json`, que es un snapshot committeado en el repo. La Google Sheet **solo** se consulta cuando corre la Action. Por eso, si editas la Sheet y abres `carta.html` en local, sigues viendo la versión vieja: no estás leyendo la Sheet, estás leyendo el JSON del repo. Para previsualizar una edición de la Sheet sin esperar a que la Action la lleve a `main`, regenera el snapshot tú mismo.

**1. Regenera `js/carta-data.json` desde tu Sheet:**

```bash
cd /Users/guillermobadia/CODE/Repos/calmarengo

SHEET_CATEGORIAS_URL="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv&gid=0" \
SHEET_PLATOS_URL="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv&gid=<gid_platos>" \
python3 scripts/build-carta.py
```

Usa las **mismas URLs** que guardaste como Repository Variables en GitHub.

**2. Levanta servidor local:**

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000/carta.html` (val) y `http://localhost:8000/es/carta.html` (esp). `carta-data.js` añade `?v=<timestamp>` al fetch, así que no hay caché entre recargas — basta refrescar el navegador.

**3. Descarta cambios locales antes de commitear cualquier otra cosa:**

```bash
git checkout -- js/carta-data.json
```

(La Action es quien debe mantener este fichero al día. Si lo commiteas tú a mano, no pasa nada grave, pero la próxima vez que corra la Action sobreescribirá tu commit con lo que diga la Sheet.)

**Truco si te impacientas con el cache de Google (~5 min):** en vez de las URLs `/pub?output=csv`, exporta cada pestaña manualmente desde **Archivo → Descargar → CSV**, guárdalas en `/tmp/categorias.csv` y `/tmp/platos.csv`, y corre:

```bash
SHEET_CATEGORIAS_URL="file:///tmp/categorias.csv" \
SHEET_PLATOS_URL="file:///tmp/platos.csv" \
python3 scripts/build-carta.py
```

## Si la Action falla

1. Mira el log en **Actions**. Errores comunes:
   - *"faltan columnas"* → has renombrado/borrado una cabecera en la Sheet.
   - *"'orden' no numérico"* → alguna celda `orden` tiene texto en vez de número.
   - *HTTP 404 / 403 al descargar CSV* → la Sheet dejó de estar publicada; reabre **Publicar en la web**.
2. Ejecutar el script en local para reproducir:
   ```bash
   SHEET_CATEGORIAS_URL="…" SHEET_PLATOS_URL="…" python scripts/build-carta.py
   ```
3. El fichero `js/carta-data.json` es el último snapshot válido. Si la Action sigue fallando, la web sigue mostrando ese snapshot.
