# Proyecto: Simulador de Placas Tectónicas

## Visión del Proyecto

Crear una aplicación web interactiva que permita a los usuarios explorar la geografía de la Tierra a lo largo del tiempo, desde el pasado geológico hasta un futuro especulativo. La herramienta visualizará la deriva continental, la formación de supercontinentes y la apertura de nuevos océanos, todo basado en datos científicos sobre el movimiento de las placas tectónicas.

## Características Principales

- **Globo Terráqueo 3D Interactivo:** Visualización de la Tierra en 3D, permitiendo al usuario rotar, hacer zoom y explorar el planeta.
- **Línea de Tiempo Geológica:** Una línea de tiempo que abarca desde el pasado (ej. Pangea) hasta el futuro (ej. Pangea Última), permitiendo al usuario "viajar" en el tiempo y ver la configuración de los continentes.
- **Predicción Futura:** Un modelo que predice la geografía futura de los continentes basado en las velocidades y trayectorias actuales de las placas tectónicas.
- **Capas de Información:** Opción para mostrar información contextual sobre las diferentes eras geológicas, como la fauna y flora dominante, el clima y los principales eventos geológicos.
- **Búsqueda de Ubicación:** Permitir al usuario buscar una ubicación actual (ej. "Madrid, España") y ver dónde se encontraría en diferentes momentos del pasado o futuro.

## Fuentes de Datos

El simulador se basará en datos de fuentes abiertas y científicas:

- **Modelos de Placas Tectónicas:** Utilizaremos modelos de reconstrucción de placas como GPlates, que proporciona datos sobre los movimientos de las placas en el pasado.
- **Datos Geológicos y Geofísicos:** Datos del [Servicio Geológico de Estados Unidos (USGS)](https://www.usgs.gov/) y de la [NASA](https://www.nasa.gov/) sobre la corteza terrestre, el paleomagnetismo y las velocidades de las placas.
- **Artículos Científicos:** Investigaciones y publicaciones sobre la reconstrucción de la historia de la Tierra y las proyecciones de la deriva continental.

## Pila Tecnológica Propuesta

- **Frontend (UI):**
  - **Framework:** [Streamlit](https://streamlit.io/) para crear la interfaz de usuario interactiva. Streamlit es ideal para crear aplicaciones de datos de forma rápida en Python.
  - **Visualización 3D:** Streamlit se integra bien con librerías como [PyDeck](https.pydeck.io/) para visualizaciones geoespaciales y 3D.

- **Backend y Lógica de la Aplicación:**
  - **Lenguaje y Framework:** Python y Streamlit. La lógica de la aplicación, el procesamiento de datos y la interfaz de usuario se construirán dentro del entorno de Streamlit.
  - **Procesamiento de Datos:** Usaremos bibliotecas de Python como [Pandas](https://pandas.pydata.org/) y [GeoPandas](https://geopandas.org/) para manejar los datos geológicos.

- **Despliegue:**
  - La aplicación podría ser desplegada en plataformas como Vercel, Netlify (para el frontend) y Heroku o un servicio de "cloud functions" para el backend.
