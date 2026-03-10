"""
Componente de la línea de tiempo geológica.
"""
import streamlit as st

from data.plates_data import GEOLOGICAL_ERAS


ERA_KEYS = sorted(GEOLOGICAL_ERAS.keys())


def format_era_label(ma: int) -> str:
    """Formatea la etiqueta de una era geológica."""
    if ma < 0:
        return f"Hace {abs(ma)} Ma"
    elif ma == 0:
        return "Presente"
    else:
        return f"+{ma} Ma (Futuro)"


def render_timeline() -> int:
    """
    Renderiza la línea de tiempo geológica y retorna la era seleccionada.
    Returns:
        El valor en millones de años de la era seleccionada.
    """
    st.markdown("### 🕐 Línea de Tiempo Geológica")

    # Initialize session state for slider if it doesn't exist
    if "era_slider" not in st.session_state:
        st.session_state.era_slider = ERA_KEYS.index(0)

    def set_era(index):
        st.session_state.era_slider = index

    # Mostrar botones de acceso rápido
    cols = st.columns(len(ERA_KEYS))
    for i, era_key in enumerate(ERA_KEYS):
        era_data = GEOLOGICAL_ERAS[era_key]
        short_name = era_data["name"].split("(")[0].strip()
        if len(short_name) > 12:
            short_name = short_name[:12] + "…"
        with cols[i]:
            st.button(
                short_name,
                key=f"era_btn_{era_key}",
                use_container_width=True,
                type="primary" if i == st.session_state.era_slider else "secondary",
                on_click=set_era,
                args=(i,),
            )

    # Selector de era con slider
    era_index = st.slider(
        "Viaja en el tiempo",
        min_value=0,
        max_value=len(ERA_KEYS) - 1,
        key="era_slider",
        format="",
        help="Desliza para viajar en el tiempo geológico",
    )

    selected_era = ERA_KEYS[era_index]
    era_info = GEOLOGICAL_ERAS[selected_era]


    # Mostrar información de la era
    st.markdown(f"## 🌍 {era_info['name']}")
    st.markdown(f"**{format_era_label(selected_era)}**")
    st.info(era_info["description"])

    return selected_era
