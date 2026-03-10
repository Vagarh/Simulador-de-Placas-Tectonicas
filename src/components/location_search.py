"""
Componente de búsqueda de ubicación para rastrear posiciones a través del tiempo.
"""
import streamlit as st

from data.plates_data import KNOWN_LOCATIONS, GEOLOGICAL_ERAS


def render_location_search(current_era: int) -> dict | None:
    """
    Renderiza el buscador de ubicaciones y retorna el marcador si se selecciona una.

    Args:
        current_era: La era geológica actualmente seleccionada.

    Returns:
        Dict con lat, lon, label si hay una ubicación seleccionada, None si no.
    """
    st.markdown("### 📍 Buscar Ubicación")
    st.caption("Busca una ciudad y mira dónde estaba en diferentes eras geológicas")

    location_names = ["-- Selecciona una ubicación --"] + list(KNOWN_LOCATIONS.keys())

    selected = st.selectbox(
        "Ubicación",
        location_names,
        label_visibility="collapsed",
    )

    if selected == "-- Selecciona una ubicación --":
        return None

    location_data = KNOWN_LOCATIONS[selected]

    # Encontrar la era más cercana disponible para esta ubicación
    available_eras = sorted(location_data.keys())
    closest_era = min(available_eras, key=lambda x: abs(x - current_era))

    era_data = location_data[closest_era]

    # Mostrar información de la ubicación
    era_name = GEOLOGICAL_ERAS[closest_era]["name"]

    st.success(f"**{selected}** en la era **{era_name}**")
    st.write(f"📌 {era_data['description']}")
    st.write(f"🌐 Coordenadas: {era_data['lat']:.1f}°, {era_data['lon']:.1f}°")

    # Tabla de viaje en el tiempo para esta ubicación
    with st.expander("🕰️ Ver posición en todas las eras"):
        for era_key in sorted(location_data.keys()):
            era_info = location_data[era_key]
            era_name_full = GEOLOGICAL_ERAS[era_key]["name"]
            indicator = " ← actual" if era_key == closest_era else ""
            st.write(
                f"**{era_name_full}**: "
                f"({era_info['lat']:.1f}°, {era_info['lon']:.1f}°) "
                f"- {era_info['description']}{indicator}"
            )

    return {
        "lat": era_data["lat"],
        "lon": era_data["lon"],
        "label": selected,
    }
