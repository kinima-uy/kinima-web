# Kinima · Web

Landing de Kinima hecha en React (Vite). Incluye la subpágina **Kinima Photography** en `/fotografia`, que por ahora está oculta: para mostrarla, cambiá `SHOW_PHOTOGRAPHY` a `true` en `src/config.js`.

## Correrla en tu compu

Necesitás [Node.js](https://nodejs.org) 18 o más nuevo.

```bash
npm install
npm run dev        # abre http://localhost:5173
```

## Subirla a Netlify

**Opción A, conectando el repo (recomendada):**
1. Subí esta carpeta a un repositorio de GitHub.
2. En Netlify: *Add new site → Import an existing project* y elegí el repo.
3. Netlify lee `netlify.toml` solo: corre `npm run build` y publica la carpeta `dist`.

**Opción B, arrastrando:**
1. Corré `npm run build`.
2. Arrastrá la carpeta `dist` a [app.netlify.com/drop](https://app.netlify.com/drop).

La carpeta `dist` ya incluye el archivo `_redirects`, así que `/fotografia` funciona aunque recargues la página.

### Publicar en Vercel
Importá el repo (o subí la carpeta) en Vercel: detecta Vite solo. El archivo `vercel.json` hace que `/fotografia` y `/robotec` funcionen al recargar.
Para el formulario, poné tu clave de [Web3Forms](https://web3forms.com) en `WEB3FORMS_KEY` dentro de `src/config.js`.

### Formulario de contacto (Netlify)
Usa **Netlify Forms**. Después de publicar, andá a *Site configuration → Forms* y activá la detección de formularios. Volvé a publicar y vas a ver el formulario `contacto`. En *Forms → Form notifications* podés hacer que cada consulta te llegue por mail.

### Dominio kinima.uy
En Netlify: *Domain management → Add a domain* y seguí los pasos para apuntar el DNS.

## Dónde cambiar cada cosa

| Qué | Dónde |
|---|---|
| Logo oficial | `public/logo-navy.svg` (fondos claros), `public/logo-crema.svg` (fondos oscuros), `public/isotipo.svg` (favicon) |
| Personita animada | `src/lib/brand.jsx`. Está armada con las piezas reales del isotipo (`public/iso-k.png` y `public/iso-punto.png`) |
| Juego de la tele | `src/components/Game.jsx` |
| Prototipos de "Cómo funciona" | `src/components/HowItWorks.jsx`. Al principio del archivo explica cómo reemplazarlos por imágenes |
| Textos de cada sección | `src/components/Sections.jsx`, `Support.jsx`, `Team.jsx`, `Faq.jsx`, `Contact.jsx` |
| Foto de Carolina | Guardala en `public/carolina.jpg` y cambiá `photo: null` en `src/components/Team.jsx` |
| Fotos de Kinima Photography | Guardalas en `public/fotos/` y completá `src` en `WORKS`, en `src/pages/Photography.jsx` |
| Colores y estilos | `src/styles.css`. Los colores de marca están al principio, en `:root` |

## Accesibilidad
- Botón para pausar todo el movimiento (abajo a la derecha). Si el sistema pide reducir movimiento, la web arranca pausada.
- Se puede navegar con teclado y los formularios tienen etiquetas y mensajes de error claros.
