# Proyecto: Simulador de Placas Tectónicas

## Visión del Proyecto

Crear una aplicación web interactiva que permita a los usuarios explorar la geografía de la Tierra a lo largo del tiempo, desde el pasado geológico hasta un futuro especulativo. La herramienta visualizará la deriva continental, la formación de supercontinentes y la apertura de nuevos océanos, todo basado en datos científicos sobre el movimiento de las placas tectónicas.

## Estado Actual

✅ **Migración completada a Cesium.js**

La aplicación ha sido completamente reescrita usando Cesium.js en lugar de Streamlit/PyDeck. Esto proporciona:

- Globo 3D realista con imágenes satelitales de la NASA
- Mejor rendimiento y experiencia de usuario
- Capas de datos geoespaciales más precisas
- Interfaz más moderna y responsive

## Características Principales

- **🌐 Globo Terráqueo 3D Interactivo**: Visualización de la Tierra con Cesium.js usando imágenes satelitales reales de la NASA/USGS
- **⏰ Línea de Tiempo Geológica**: Desde -335 Ma (Pangea) hasta +250 Ma (Pangea Última)
- **🔴 Límites de Placas Tectónicas**: Visualización de dorsales, fosas y fallas
- **📍 Búsqueda de Ubicaciones**: Encuentra ciudades y ve su posición histórica
- **🏃 Vectores de Movimiento**: Dirección y velocidad de las placas

## Estructura del Proyecto

```
Simulador-de-Placas-Tectonicas/
├── web/                    # Aplicación web principal (Cesium.js)
│   ├── index.html
│   ├── css/style.css
│   ├── js/app.js
│   ├── js/data.js
│   └── README.md
├── src/                    # Código Python (legado)
├── data/                   # Datos geológicos
└── README.md
```

## Cómo ejecutar

```bash
cd web
python3 -m http.server 8000
# Abrir http://localhost:8000
```

## Pila Tecnológica

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Motor 3D**: Cesium.js (imágenes satelitales NASA/USGS)
- **Datos**: USGS, NASA, modelos GPlates

## Fuentes de Datos

- **Modelos de Placas Tectónicas**: GPlates (https://www.gplates.org/)
- **Datos Geológicos y Geofísicos**: USGS (https://www.usgs.gov/)
- **Imágenes Satelitales**: NASA Blue Marble via Cesium Ion
- **Artículos Científicos**: Investigaciones sobre reconstrucción de la historia de la Tierra

## Futuras Mejoras

- [ ] Modelos 3D de continentes para cada era
- [ ] Animaciones de transición entre eras
- [ ] Más ubicaciones para búsqueda
- [ ] Datos de elevación histórica
- [ ] Modo VR para exploración inmersiva
