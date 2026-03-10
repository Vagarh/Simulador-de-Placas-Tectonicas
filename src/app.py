"""
Simulador de Placas Tectónicas
Aplicación interactiva para explorar la geografía de la Tierra a lo largo del tiempo.
"""
import sys
import os

# Agregar el directorio raíz al path para imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import streamlit as st

from src.components.globe import render_globe
from src.components.timeline import render_timeline
from src.components.info_panel import render_info_panel, render_plate_velocities
from src.components.location_search import render_location_search

# Configuración de la página
st.set_page_config(
    page_title="Simulador de Placas Tectónicas",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Estilos CSS personalizados
st.markdown("""
<style>
    .main-title {
        text-align: center;
        background: linear-gradient(90deg, #1a5276, #2e86c1, #1a5276);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0;
    }
    .subtitle {
        text-align: center;
        color: #7f8c8d;
        font-size: 1.1rem;
        margin-top: 0;
    }
    div[data-testid="stDecoration"] {
        background-image: linear-gradient(90deg, #1a5276, #2e86c1, #1a5276);
    }
</style>
""", unsafe_allow_html=True)

# Título principal
st.markdown('<p class="main-title">🌍 Simulador de Placas Tectónicas</p>', unsafe_allow_html=True)
st.markdown(
    '<p class="subtitle">Explora la geografía de la Tierra desde Pangea hasta el futuro</p>',
    unsafe_allow_html=True,
)

st.divider()

# --- Barra lateral ---
with st.sidebar:
    st.markdown("## ⚙️ Configuración")

    show_boundaries = st.checkbox(
        "🔴 Mostrar límites de placas",
        value=False,
        help="Muestra los límites de las placas tectónicas (solo en el presente)",
    )

    show_info = st.checkbox(
        "📋 Mostrar información de la era",
        value=True,
        help="Muestra datos sobre clima, fauna, flora y eventos",
    )

    show_velocities = st.checkbox(
        "🏃 Mostrar velocidades de placas",
        value=False,
        help="Muestra las velocidades actuales de las placas tectónicas",
    )

    st.divider()

    # Búsqueda de ubicación en la barra lateral
    location_marker = render_location_search(
        st.session_state.get("current_era", 0)
    )

    st.divider()

    st.markdown("### ℹ️ Acerca de")
    st.caption(
        "Este simulador muestra posiciones aproximadas de los continentes "
        "a lo largo del tiempo geológico. Las coordenadas son simplificaciones "
        "basadas en modelos de reconstrucción de placas como GPlates."
    )
    st.caption(
        "Fuentes: USGS, NASA, modelos GPlates, "
        "publicaciones científicas sobre tectónica de placas."
    )

# --- Contenido principal ---

# Línea de tiempo
selected_era = render_timeline()
st.session_state["current_era"] = selected_era

st.divider()

# Visualización del globo
col_globe, col_info = st.columns([3, 1]) if show_info else (st.container(), None)

with col_globe if show_info else st.container():
    st.markdown("### 🗺️ Mapa de Continentes")
    render_globe(
        era=selected_era,
        show_boundaries=show_boundaries,
        location_marker=location_marker,
    )

# Panel de información
if show_info and col_info is not None:
    with col_info:
        render_info_panel(selected_era)

# Velocidades de placas
if show_velocities:
    st.divider()
    render_plate_velocities()
