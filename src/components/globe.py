"""
Componente de visualización del globo 3D usando PyDeck.
"""
import pydeck as pdk
import streamlit as st

from data.plates_data import CONTINENT_DATA, PLATE_BOUNDARIES


def create_continent_layer(era: int) -> list[pdk.Layer]:
    """Crea las capas de polígonos de los continentes para una era dada."""
    continents = CONTINENT_DATA.get(era, CONTINENT_DATA[0])
    layers = []

    for continent in continents:
        polygon_data = []
        for coords in continent["coordinates"]:
            polygon_data.append({
                "polygon": coords,
                "name": continent["name"],
            })

        layer = pdk.Layer(
            "PolygonLayer",
            data=polygon_data,
            get_polygon="polygon",
            get_fill_color=continent["color"],
            get_line_color=[255, 255, 255, 100],
            get_line_width=2,
            line_width_min_pixels=1,
            pickable=True,
            auto_highlight=True,
            highlight_color=[255, 255, 0, 100],
        )
        layers.append(layer)

    return layers


def create_plate_boundary_layer() -> pdk.Layer:
    """Crea la capa de límites de placas tectónicas (solo para el presente)."""
    path_data = []
    for boundary in PLATE_BOUNDARIES:
        path_data.append({
            "path": boundary["path"],
            "name": boundary["name"],
            "type": boundary["type"],
            "color": boundary["color"],
        })

    return pdk.Layer(
        "PathLayer",
        data=path_data,
        get_path="path",
        get_color="color",
        get_width=3,
        width_min_pixels=2,
        pickable=True,
    )


def create_location_marker_layer(lat: float, lon: float, label: str) -> pdk.Layer:
    """Crea una capa con un marcador para una ubicación específica."""
    return pdk.Layer(
        "ScatterplotLayer",
        data=[{"position": [lon, lat], "name": label}],
        get_position="position",
        get_fill_color=[255, 0, 0, 220],
        get_radius=200000,
        radius_min_pixels=6,
        radius_max_pixels=15,
        pickable=True,
    )


def render_globe(era: int, show_boundaries: bool = False,
                 location_marker: dict | None = None):
    """
    Renderiza el globo 3D interactivo con los continentes de la era seleccionada.

    Args:
        era: Año geológico (negativo = pasado, positivo = futuro)
        show_boundaries: Si True, muestra los límites de placas (solo presente)
        location_marker: Dict con lat, lon, label para mostrar un marcador
    """
    all_layers = create_continent_layer(era)

    if show_boundaries and era == 0:
        all_layers.append(create_plate_boundary_layer())

    if location_marker:
        all_layers.append(
            create_location_marker_layer(
                location_marker["lat"],
                location_marker["lon"],
                location_marker["label"],
            )
        )

    view_state = pdk.ViewState(
        latitude=15,
        longitude=0,
        zoom=0.8,
        pitch=45,
    )

    tooltip = {
        "html": "<b>{name}</b>",
        "style": {
            "backgroundColor": "rgba(0,0,0,0.7)",
            "color": "white",
            "fontSize": "14px",
            "padding": "8px",
        },
    }

    deck = pdk.Deck(
        layers=all_layers,
        initial_view_state=view_state,
        tooltip=tooltip,
        map_provider="carto",
        map_style=pdk.map_styles.CARTO_DARK,
    )

    st.pydeck_chart(deck, use_container_width=True)
