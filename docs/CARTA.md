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
