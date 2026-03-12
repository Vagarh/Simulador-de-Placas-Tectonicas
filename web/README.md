# 🌍 Simulador de Placas Tectónicas - Cesium Earth

Aplicación web interactiva para explorar la geografía de la Tierra a través del tiempo geológico.

## 🚀 Cómo usar

### Iniciar servidor local

```bash
# Python 3
python -m http.server 8000

# O usar el script del directorio principal
../start.sh
```

Abre: **http://localhost:8000**

## 🎮 Controles

| Acción | Control |
|--------|---------|
| Rotar | Click + arrastrar |
| Zoom | Scroll / Pinch |
| Inclinar | Click derecho + arrastrar |
| Cambiar era | Arrastra la línea de tiempo |
| Ver capas | Botón ☰ en el header |

## 📊 Eras Geológicas

| Slider | Era | Tiempo |
|--------|-----|--------|
| 0 | Pangea Primitiva | -350 Ma |
| 1 | Pangea | -300 Ma |
| 2 | Pangea Tardía | -250 Ma |
| 3 | Jurásico | -200 Ma |
| 4 | Cretácico Medio | -150 Ma |
| 5 | Cretácico Tardío | -100 Ma |
| 6 | Eoceno | -50 Ma |
| 7 | Presente | 0 Ma |

## 📁 Estructura

```
web/
├── index.html          # Página principal
├── css/style.css      # Estilos
├── js/
│   ├── data.js        # Datos geológicos
│   └── app.js         # Lógica Cesium
└── data/              # GeoJSON de continentes
    ├── coastlines_present.json
    ├── coastlines_50ma.json
    ├── coastlines_100ma.json
    ├── coastlines_150ma.json
    ├── coastlines_200ma.json
    ├── coastlines_250ma.json
    ├── coastlines_300ma.json
    └── coastlines_350ma_pangea.json
```

## 🔬 Fuentes de Datos

- **GPlates Web Service** - https://gws.gplates.org/
- **Modelo Müller et al. 2019** - Reconstrucción de placas
- **CesiumJS** - https://cesium.com/
- **NASA/USGS** - Imágenes satelitales

## 📝 Notas

- Los datos de continentes son reconstrucciones científicas reales
- Las velocidades de placas están en cm/año (promedio geológico)
- Requiere conexión a internet para CesiumJS
