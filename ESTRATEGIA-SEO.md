# Estrategia SEO - Cal Marengo Gastrobar

## 1. SEO Técnico Implementado

### Meta Tags Optimizados
- **Title tags** únicos por idioma con keywords principales
- **Meta descriptions** de 150-160 caracteres con llamada a la acción
- **Keywords** relevantes para búsqueda local
- **Robots meta tag** configurado para indexación

### Etiquetas Hreflang
- Implementadas para indicar versiones de idioma (valenciano/castellano)
- `x-default` apuntando a la versión valenciana

### URLs Canónicas
- Cada página tiene su URL canónica definida
- Evita contenido duplicado entre versiones

### Open Graph y Twitter Cards
- Optimizado para compartir en redes sociales
- Imagen OG configurada (necesita crear `/img/og-image.jpg`)

### Datos Estructurados (Schema.org)
- **Tipo Restaurant** con toda la información del negocio
- Horarios de apertura
- Menú con platos principales
- Coordenadas geográficas
- Rating agregado

### Geo Tags
- Región: ES-VC (Comunidad Valenciana)
- Coordenadas: 39.5397, -0.3686
- Placename: Vinalesa, València

---

## 2. Keywords Objetivo

### Keywords Principales (Short-tail)
| Keyword | Volumen Est. | Dificultad |
|---------|-------------|------------|
| gastrobar vinalesa | Medio | Baja |
| restaurante vinalesa | Alto | Media |
| bar vinalesa | Medio | Baja |

### Keywords Long-tail
- "donde desayunar en vinalesa"
- "paella valenciana viernes vinalesa"
- "bocadillos artesanos valencia"
- "cuina valenciana tradicional"
- "eventos privados vinalesa"
- "mejores esmorzars valencia norte"
- "bar de tapes vinalesa"

### Keywords Locales
- "comer cerca de mi vinalesa"
- "restaurantes horta nord"
- "gastrobar cerca de valencia"

---

## 3. Acciones SEO Pendientes

### Inmediatas (Prioritarias)

#### Google Business Profile
1. Crear/reclamar ficha de Google My Business
2. Completar toda la información:
   - Nombre: Cal Marengo Gastrobar
   - Categoría: Gastrobar, Restaurante valenciano
   - Dirección: Carrer Cura Sapinya, 32, 46114 Vinalesa
   - Teléfono: 681 035 690
   - Horario completo
   - Fotos del local, platos, ambiente
3. Publicar posts semanales (paella viernes, platos del día)
4. Responder a todas las reseñas

#### Imágenes
1. Crear `/img/og-image.jpg` (1200x630px) con logo y foto del local
2. Crear `/img/logo.png` para Schema.org
3. Crear favicon `/img/favicon.ico`
4. Optimizar todas las imágenes (WebP, compresión)
5. Añadir atributos `alt` descriptivos

#### Core Web Vitals
- Las fuentes de Google están con `preconnect` (implementado)
- CSS minificado en producción
- JavaScript diferido o al final del body

### Corto Plazo (1-2 semanas)

#### Contenido
1. **Blog/Noticias** (opcional): Crear sección con:
   - Recetas tradicionales valencianas
   - Historia de Cal Marengo
   - Eventos especiales
   - Plato de la semana

2. **Testimonios**: Añadir sección con reseñas de clientes

#### Enlaces Locales
1. Registrarse en directorios locales:
   - TripAdvisor
   - ElTenedor
   - Yelp
   - Páginas Amarillas
2. Colaborar con blogs de gastronomía local
3. Aparecer en guías de Vinalesa/L'Horta Nord

### Medio Plazo (1 mes)

#### Redes Sociales
1. Mantener Instagram activo (@calmarengo)
2. Publicar fotos de platos con hashtags locales:
   - #vinalesa #lhortanord #cuinavalenciana
   - #gastrobarvalencia #esmorzarvalencia

#### Reseñas
1. Solicitar reseñas a clientes satisfechos
2. Crear tarjetas con QR para dejar reseña
3. Responder siempre (positivas y negativas)

---

## 4. Monitorización

### Herramientas Recomendadas
1. **Google Search Console** - Indexación y rendimiento
2. **Google Analytics 4** - Tráfico y comportamiento
3. **Google Business Profile Insights** - Búsquedas locales

### KPIs a Seguir
- Posición para "gastrobar vinalesa"
- Clics desde búsqueda orgánica
- Llamadas desde Google Maps
- Solicitudes de direcciones
- Número de reseñas y puntuación media

---

## 5. Checklist de Implementación

### Archivos Creados
- [x] `/index.html` - Versión valenciana con SEO
- [x] `/es/index.html` - Versión castellana con SEO
- [x] `/css/styles.css` - Estilos separados
- [x] `/js/main.js` - JavaScript separado
- [x] `/sitemap.xml` - Mapa del sitio
- [x] `/robots.txt` - Instrucciones para crawlers

### Pendiente de Crear
- [ ] `/img/og-image.jpg` (1200x630px)
- [ ] `/img/logo.png`
- [ ] `/img/favicon.ico`
- [ ] `/img/apple-touch-icon.png`

### Registro en Buscadores
- [ ] Enviar sitemap a Google Search Console
- [ ] Verificar propiedad del dominio
- [ ] Configurar Google Business Profile

---

## 6. Estructura de Carpetas Final

```
CalMarengo/
├── index.html              # Página principal (Valenciano)
├── sitemap.xml             # Mapa del sitio
├── robots.txt              # Instrucciones crawlers
├── ESTRATEGIA-SEO.md       # Este documento
├── css/
│   └── styles.css          # Estilos
├── js/
│   └── main.js             # JavaScript
├── es/
│   └── index.html          # Versión castellano
├── val/                    # (Reservado para futuro)
└── img/                    # Imágenes (pendiente)
    ├── og-image.jpg
    ├── logo.png
    ├── favicon.ico
    └── apple-touch-icon.png
```

---

## Contacto para Implementación

Para completar la estrategia SEO, el propietario debe:

1. Proporcionar fotografías profesionales del local y platos
2. Acceso a Google Business Profile
3. Dominio calmarengo.es configurado
4. Hosting con certificado SSL (HTTPS obligatorio)
