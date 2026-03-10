# 🌍 Simulador de Placas Tectónicas

Una aplicación web interactiva que permite a los usuarios explorar la geografía de la Tierra a lo largo del tiempo, visualizando la deriva continental, la formación de supercontinentes y la apertura de nuevos océanos.

![Simulador de Placas Tectónicas](https://i.imgur.com/your-screenshot.png)  <!-- Reemplaza con una captura de pantalla de tu aplicación -->

## ✨ Características Principales

-   **Globo Terráqueo 3D Interactivo:** Visualización de la Tierra en 3D con un mapa base geográfico real, permitiendo al usuario rotar, hacer zoom y explorar el planeta.
-   **Línea de Tiempo Geológica:** Una línea de tiempo interactiva que abarca desde el pasado (Pangea, -335 Ma) hasta un futuro especulativo (Pangea Última, +250 Ma).
-   **Capas de Información:** Opción para mostrar información contextual sobre las diferentes eras geológicas, incluyendo clima, fauna, flora y eventos geológicos clave.
-   **Límites de Placas:** Visualización de los límites de las principales placas tectónicas en la era actual.
-   **Búsqueda de Ubicación:** Permite al usuario buscar una ubicación actual (ej. "Madrid, España") y ver dónde se encontraría en diferentes momentos del pasado o futuro.

## 🚀 Pila Tecnológica

-   **Lenguaje:** Python
-   **Framework de la aplicación:** [Streamlit](https://streamlit.io/)
-   **Visualización 3D y Mapas:** [PyDeck](https://pydeck.gl/)
-   **Manipulación de Datos:** [Pandas](https://pandas.pydata.org/) y [GeoPandas](https://geopandas.org/)

## ⚙️ Cómo Ejecutar el Proyecto

Sigue estos pasos para ejecutar el simulador en tu máquina local.

**1. Prerrequisitos:**
   -   Tener Python 3.8 o superior instalado.

**2. Clonar el Repositorio (si aplica):**
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

**3. Crear un Entorno Virtual (recomendado):**
   ```bash
   python -m venv venv
   ```
   -   En Windows:
       ```bash
       .\venv\Scripts\activate
       ```
   -   En macOS/Linux:
       ```bash
       source venv/bin/activate
       ```

**4. Instalar Dependencias:**
   Instala todas las librerías necesarias desde el archivo `requirements.txt`.
   ```bash
   pip install -r requirements.txt
   ```

**5. Ejecutar la Aplicación:**
   Lanza la aplicación Streamlit.
   ```bash
   streamlit run src/app.py
   ```
   La aplicación se abrirá automáticamente en tu navegador web.

## 📊 Fuentes de Datos

El simulador se basa en datos de fuentes abiertas y científicas para modelar las posiciones de los continentes y los límites de las placas. Las coordenadas son simplificaciones basadas en:

-   Modelos de reconstrucción de placas como **GPlates**.
-   Datos geológicos y geofísicos del **Servicio Geológico de Estados Unidos (USGS)** y la **NASA**.
-   **Artículos Científicos** sobre la reconstrucción de la historia de la Tierra y las proyecciones de la deriva continental.

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
