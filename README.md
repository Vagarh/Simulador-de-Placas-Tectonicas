# 🌍 Simulador de Placas Tectónicas

> Explora la historia geológica de la Tierra en un globo 3D interactivo — desde la Pangea hace 350 millones de años hasta el presente.

## Demo

![Demo del Simulador](./public/demo.webp)

---

## ✨ Características

| Característica | Descripción |
|---|---|
| 🌐 **Globo 3D con texturas** | Renderizado con Cesium.js + imágenes satelitales de ArcGIS |
| ⏰ **Línea de tiempo geológica** | Navega desde −350 Ma (Pangea) hasta hoy |
| 🔴 **Límites de placas** | Dorsales, fosas de subducción y fallas transformantes |
| 🌊 **Líneas de costa históricas** | GeoJSON de GPlates para cada era |
| 📍 **Búsqueda de ciudades** | Encuentra dónde estaba tu ciudad en el pasado |
| 🏃 **Vectores de movimiento** | Dirección y velocidad de cada placa en cm/año |
| 📚 **Info científica** | Clima, fauna, flora y hitos por era; link directo a Wikipedia |
| 🔄 **Auto-rotación** | El globo rota al cargar; se detiene al interactuar |

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo local
npm run dev
# → Abre http://localhost:3000
```

> **Para producción** (Vercel):
> ```bash
> npm run build
> ```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Motor 3D | [Cesium.js 1.112](https://cesium.com) via CDN |
| Imágenes base | ArcGIS World Imagery (libre) |
| Estilos | Tailwind CSS + CSS Variables (UI/UX Pro Max) |
| Lenguaje | TypeScript |
| Datos GeoJSON | [GPlates](https://www.gplates.org/) |
| Deploy | [Vercel](https://vercel.com) |

---

## 📂 Estructura del Proyecto

```
Simulador-de-Placas-Tectonicas/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Layout raíz con CDN Cesium + fuentes
│   │   ├── page.tsx         # UI principal (glassmorphism dashboard)
│   │   └── globals.css      # Design system (UI/UX Pro Max)
│   ├── components/
│   │   └── SimulatorInitializer.tsx  # Client-side Cesium init
│   └── lib/
│       ├── app.ts           # Lógica TectonicSimulator
│       └── data.ts          # Datos de eras + placas + ubicaciones
├── public/
│   ├── data/                # GeoJSON de líneas de costa (8 eras)
│   └── demo.webp            # Grabación demo
└── README.md
```

---

## 🌐 Eras Geológicas Incluidas

| Era | Millones de años | Descripción |
|---|---|---|
| Pangea Primitiva | −350 Ma | Formación del supercontinente |
| Pangea | −300 Ma | Pangea completamente unida |
| Pangea Tardía | −250 Ma | Comienzo de la fragmentación |
| Jurásico | −200 Ma | Apertura del Atlántico central |
| Cretácico Medio | −150 Ma | Laurasia y Gondwana se separan |
| Cretácico Tardío | −100 Ma | India migra rápidamente al norte |
| Eoceno | −50 Ma | Colisión India–Asia, nace el Himalaya |
| **Presente** | **0 Ma** | **Configuración actual** |

---

## 📊 Fuentes de Datos

- **GeoJSON de continentes**: [GPlates Community](https://www.gplates.org/)
- **Imágenes satelitales**: ArcGIS World Imagery (Esri)
- **Velocidades de placas**: USGS / publicaciones científicas de referencia

---

## 🤝 Contribuir

1. Fork del repositorio
2. Crea tu rama `feature/mi-mejora`
3. Haz commit de tus cambios
4. Abre un Pull Request

---

*Construido con ❤️ usando Cesium.js + Next.js*
