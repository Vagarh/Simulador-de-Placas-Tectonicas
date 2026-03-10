"""
Panel de información contextual sobre las eras geológicas.
"""
import streamlit as st

from data.plates_data import GEOLOGICAL_ERAS, PLATE_VELOCITIES


def render_info_panel(era: int):
    """Renderiza el panel de información para la era seleccionada."""
    era_info = GEOLOGICAL_ERAS.get(era)
    if not era_info:
        return

    st.markdown("### 📋 Información de la Era")

    col1, col2 = st.columns(2)

    with col1:
        with st.expander("🌡️ Clima", expanded=True):
            st.write(era_info["climate"])

        with st.expander("🦕 Fauna", expanded=True):
            st.write(era_info["fauna"])

    with col2:
        with st.expander("🌿 Flora", expanded=True):
            st.write(era_info["flora"])

        with st.expander("💥 Eventos Principales", expanded=True):
            st.write(era_info["events"])


def render_plate_velocities():
    """Muestra las velocidades actuales de las placas tectónicas."""
    st.markdown("### 🏃 Velocidades de Placas Tectónicas")
    st.caption("Velocidades actuales medidas por GPS")

    for plate, info in PLATE_VELOCITIES.items():
        col1, col2, col3 = st.columns([2, 1, 1])
        with col1:
            st.write(f"**{plate}**")
        with col2:
            st.write(f"{info['velocidad_cm_año']} cm/año")
        with col3:
            st.write(f"→ {info['dirección']}")
