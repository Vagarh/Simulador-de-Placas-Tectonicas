"""
Datos geológicos de las placas tectónicas y posiciones de los continentes
a lo largo del tiempo geológico.

Las coordenadas son aproximaciones simplificadas de las posiciones
reales de los continentes para cada era geológica.
"""

GEOLOGICAL_ERAS = {
    -335: {
        "name": "Pangea (Carbonífero)",
        "description": "Todos los continentes están unidos formando el supercontinente Pangea, "
                       "rodeado por el superocéano Panthalassa.",
        "climate": "Clima tropical húmedo en el ecuador, glaciaciones en el sur (Gondwana).",
        "fauna": "Anfibios gigantes, primeros reptiles, insectos enormes como Meganeura.",
        "flora": "Grandes bosques de helechos arborescentes y licópodos que formarán el carbón.",
        "events": "Formación de Pangea. Era del Carbón. Niveles de oxígeno muy altos (~35%).",
    },
    -200: {
        "name": "Pangea Tardía (Triásico-Jurásico)",
        "description": "Pangea comienza a fragmentarse. Se abre el Océano Atlántico Central.",
        "climate": "Clima cálido y árido en el interior de Pangea, sin casquetes polares.",
        "fauna": "Aparición de los primeros dinosaurios y mamíferos primitivos.",
        "flora": "Coníferas, cicadáceas y ginkgos dominan la vegetación.",
        "events": "Extinción masiva del Triásico-Jurásico. Inicio de la ruptura de Pangea.",
    },
    -150: {
        "name": "Jurásico Tardío",
        "description": "Laurasia (norte) y Gondwana (sur) se separan. El Atlántico se ensancha.",
        "climate": "Clima cálido y húmedo globalmente. Sin hielo polar.",
        "fauna": "Edad de oro de los dinosaurios: Brachiosaurus, Allosaurus, Stegosaurus.",
        "flora": "Bosques de coníferas y helechos. Primeras plantas con flor aparecen.",
        "events": "Expansión del Océano Atlántico. Formación del Océano Índico.",
    },
    -66: {
        "name": "Cretácico Tardío",
        "description": "Los continentes se acercan a su posición actual. India migra hacia Asia.",
        "climate": "Clima cálido, nivel del mar alto. Mares epicontinentales extensos.",
        "fauna": "T-Rex, Triceratops, Velociraptor. Aves modernas y mamíferos pequeños.",
        "flora": "Las plantas con flor (angiospermas) dominan por primera vez.",
        "events": "Impacto del asteroide Chicxulub. Extinción masiva K-Pg (dinosaurios).",
    },
    0: {
        "name": "Presente (Holoceno)",
        "description": "Configuración actual de los continentes.",
        "climate": "Período interglaciar. Casquetes polares en ambos polos.",
        "fauna": "Era de los mamíferos. Homo sapiens es la especie dominante.",
        "flora": "Gran diversidad de angiospermas. Biomas variados según latitud.",
        "events": "Civilización humana. Cambio climático antropogénico.",
    },
    50: {
        "name": "Futuro Cercano (+50 Ma)",
        "description": "África colisiona con Europa cerrando el Mediterráneo. "
                       "Australia se desplaza hacia el norte.",
        "climate": "Predicción: clima más cálido por la redistribución continental.",
        "fauna": "Especulativo: evolución adaptativa de mamíferos y aves.",
        "flora": "Especulativo: adaptación a nuevas condiciones climáticas.",
        "events": "Cierre del Mediterráneo. California se separa de Norteamérica.",
    },
    250: {
        "name": "Pangea Última (+250 Ma)",
        "description": "Los continentes se reagrupan formando un nuevo supercontinente: Pangea Última.",
        "climate": "Interior extremadamente árido y caliente, costas habitables.",
        "fauna": "Completamente especulativo: formas de vida radicalmente diferentes.",
        "flora": "Especulativo: plantas adaptadas a condiciones extremas.",
        "events": "Formación de Pangea Última. Cierre del Atlántico y el Pacífico.",
    },
}

# Continentes simplificados como polígonos [lon, lat] para cada era
# Cada continente tiene un nombre, color y lista de coordenadas

CONTINENT_DATA = {
    -335: [
        {
            "name": "Pangea",
            "color": [34, 139, 34, 180],
            "coordinates": [
                # Pangea centrada aproximadamente
                [[-20, 40], [30, 45], [60, 35], [70, 20], [60, 0],
                 [50, -10], [40, -30], [30, -50], [20, -60], [0, -65],
                 [-10, -55], [-20, -40], [-30, -20], [-40, -10],
                 [-50, 0], [-60, 10], [-50, 25], [-40, 35], [-20, 40]]
            ],
        },
    ],
    -200: [
        {
            "name": "Laurasia",
            "color": [139, 90, 43, 180],
            "coordinates": [
                [[-80, 30], [-60, 40], [-30, 45], [0, 50], [30, 50],
                 [60, 45], [90, 40], [120, 35], [140, 30],
                 [130, 20], [100, 15], [70, 20], [40, 15],
                 [10, 20], [-20, 15], [-50, 20], [-70, 25], [-80, 30]]
            ],
        },
        {
            "name": "Gondwana",
            "color": [34, 139, 34, 180],
            "coordinates": [
                [[-60, 0], [-40, 5], [-10, 0], [20, -5], [50, -10],
                 [70, -20], [80, -35], [60, -50], [30, -60],
                 [0, -65], [-20, -60], [-40, -50], [-60, -35],
                 [-70, -20], [-65, -10], [-60, 0]]
            ],
        },
    ],
    -150: [
        {
            "name": "Norteamérica",
            "color": [139, 90, 43, 180],
            "coordinates": [
                [[-100, 25], [-90, 35], [-70, 45], [-50, 45],
                 [-40, 40], [-30, 35], [-40, 25], [-60, 20],
                 [-80, 15], [-95, 18], [-100, 25]]
            ],
        },
        {
            "name": "Eurasia",
            "color": [160, 82, 45, 180],
            "coordinates": [
                [[-10, 30], [10, 40], [30, 45], [60, 45], [90, 40],
                 [120, 35], [140, 30], [130, 20], [100, 20],
                 [70, 25], [40, 20], [10, 25], [-10, 30]]
            ],
        },
        {
            "name": "África",
            "color": [34, 139, 34, 180],
            "coordinates": [
                [[-20, 10], [-5, 15], [15, 10], [30, 0], [35, -15],
                 [25, -30], [10, -35], [-5, -30], [-15, -15],
                 [-20, 0], [-20, 10]]
            ],
        },
        {
            "name": "Sudamérica",
            "color": [46, 139, 87, 180],
            "coordinates": [
                [[-50, 0], [-35, 5], [-25, 0], [-20, -10],
                 [-25, -25], [-35, -40], [-45, -45],
                 [-55, -35], [-55, -20], [-55, -10], [-50, 0]]
            ],
        },
        {
            "name": "Antártida",
            "color": [200, 200, 220, 180],
            "coordinates": [
                [[20, -55], [50, -50], [80, -50], [100, -55],
                 [120, -60], [100, -70], [60, -70], [30, -65], [20, -55]]
            ],
        },
        {
            "name": "India",
            "color": [210, 150, 50, 180],
            "coordinates": [
                [[50, -20], [60, -15], [70, -20], [70, -30],
                 [60, -35], [50, -30], [50, -20]]
            ],
        },
        {
            "name": "Australia",
            "color": [210, 105, 30, 180],
            "coordinates": [
                [[90, -40], [100, -35], [120, -35], [130, -40],
                 [130, -50], [110, -55], [90, -50], [90, -40]]
            ],
        },
    ],
    -66: [
        {
            "name": "Norteamérica",
            "color": [139, 90, 43, 180],
            "coordinates": [
                [[-130, 35], [-120, 50], [-100, 55], [-80, 55],
                 [-60, 50], [-50, 45], [-60, 30], [-80, 20],
                 [-100, 20], [-120, 25], [-130, 35]]
            ],
        },
        {
            "name": "Europa",
            "color": [160, 82, 45, 180],
            "coordinates": [
                [[-10, 40], [0, 50], [15, 55], [30, 55],
                 [40, 50], [30, 40], [15, 38], [0, 38], [-10, 40]]
            ],
        },
        {
            "name": "Asia",
            "color": [184, 134, 11, 180],
            "coordinates": [
                [[40, 35], [60, 45], [80, 55], [100, 55],
                 [120, 50], [140, 40], [150, 30], [130, 20],
                 [100, 15], [80, 20], [60, 25], [40, 35]]
            ],
        },
        {
            "name": "África",
            "color": [34, 139, 34, 180],
            "coordinates": [
                [[-15, 25], [5, 30], [30, 25], [40, 10],
                 [45, -5], [40, -25], [30, -35], [15, -35],
                 [0, -30], [-10, -15], [-15, 5], [-15, 25]]
            ],
        },
        {
            "name": "Sudamérica",
            "color": [46, 139, 87, 180],
            "coordinates": [
                [[-70, 5], [-55, 10], [-40, 5], [-35, -5],
                 [-35, -20], [-45, -35], [-55, -45], [-65, -50],
                 [-75, -40], [-75, -25], [-75, -10], [-70, 5]]
            ],
        },
        {
            "name": "India",
            "color": [210, 150, 50, 180],
            "coordinates": [
                [[65, 5], [75, 10], [85, 5], [85, -5],
                 [80, -15], [70, -15], [65, -5], [65, 5]]
            ],
        },
        {
            "name": "Australia",
            "color": [210, 105, 30, 180],
            "coordinates": [
                [[110, -25], [125, -20], [145, -20], [155, -25],
                 [150, -35], [135, -40], [120, -40], [110, -35],
                 [110, -25]]
            ],
        },
        {
            "name": "Antártida",
            "color": [200, 200, 220, 180],
            "coordinates": [
                [[-60, -70], [-30, -65], [0, -65], [30, -65],
                 [60, -65], [90, -65], [120, -70], [90, -75],
                 [60, -80], [30, -80], [0, -75], [-30, -75], [-60, -70]]
            ],
        },
    ],
    0: [
        {
            "name": "Norteamérica",
            "color": [139, 90, 43, 180],
            "coordinates": [
                [[-130, 40], [-125, 50], [-110, 55], [-100, 60],
                 [-80, 65], [-60, 60], [-55, 50], [-65, 45],
                 [-75, 30], [-85, 25], [-100, 20], [-105, 25],
                 [-115, 30], [-125, 35], [-130, 40]]
            ],
        },
        {
            "name": "Europa",
            "color": [160, 82, 45, 180],
            "coordinates": [
                [[-10, 36], [0, 43], [5, 48], [10, 55],
                 [25, 60], [30, 65], [40, 60], [30, 50],
                 [25, 45], [15, 40], [5, 38], [-10, 36]]
            ],
        },
        {
            "name": "Asia",
            "color": [184, 134, 11, 180],
            "coordinates": [
                [[30, 35], [40, 45], [50, 50], [60, 55],
                 [80, 60], [100, 65], [120, 60], [140, 50],
                 [150, 40], [140, 30], [120, 20], [100, 10],
                 [80, 15], [60, 25], [40, 30], [30, 35]]
            ],
        },
        {
            "name": "África",
            "color": [34, 139, 34, 180],
            "coordinates": [
                [[-17, 15], [-5, 30], [10, 35], [30, 30],
                 [40, 20], [50, 10], [45, 0], [40, -10],
                 [35, -25], [30, -34], [20, -35], [10, -30],
                 [15, -20], [10, -10], [0, 5], [-10, 10], [-17, 15]]
            ],
        },
        {
            "name": "Sudamérica",
            "color": [46, 139, 87, 180],
            "coordinates": [
                [[-80, 5], [-75, 10], [-60, 10], [-50, 5],
                 [-35, -5], [-35, -15], [-40, -22], [-50, -30],
                 [-55, -35], [-65, -45], [-70, -55], [-75, -50],
                 [-75, -40], [-70, -25], [-75, -15], [-80, -5], [-80, 5]]
            ],
        },
        {
            "name": "Australia",
            "color": [210, 105, 30, 180],
            "coordinates": [
                [[115, -15], [130, -12], [145, -15], [150, -22],
                 [153, -28], [150, -35], [140, -38], [130, -35],
                 [120, -32], [115, -25], [115, -15]]
            ],
        },
        {
            "name": "Antártida",
            "color": [200, 200, 220, 180],
            "coordinates": [
                [[-60, -65], [-30, -68], [0, -70], [30, -68],
                 [60, -66], [90, -66], [120, -66], [150, -68],
                 [180, -70], [150, -75], [120, -78], [90, -80],
                 [60, -78], [30, -78], [0, -80], [-30, -78], [-60, -65]]
            ],
        },
        {
            "name": "India",
            "color": [210, 150, 50, 180],
            "coordinates": [
                [[68, 8], [72, 20], [78, 28], [85, 28],
                 [90, 22], [88, 15], [80, 8], [75, 10], [68, 8]]
            ],
        },
    ],
    50: [
        {
            "name": "Norteamérica",
            "color": [139, 90, 43, 180],
            "coordinates": [
                [[-135, 42], [-128, 52], [-115, 58], [-100, 62],
                 [-80, 67], [-60, 62], [-55, 52], [-65, 47],
                 [-75, 32], [-85, 27], [-100, 22], [-110, 28],
                 [-120, 33], [-130, 38], [-135, 42]]
            ],
        },
        {
            "name": "Euráfrica",
            "color": [160, 82, 45, 180],
            "coordinates": [
                [[-15, 30], [-5, 35], [5, 45], [10, 52],
                 [25, 58], [35, 62], [45, 55], [50, 45],
                 [45, 30], [50, 15], [45, 0], [40, -10],
                 [35, -25], [25, -34], [15, -30], [5, -15],
                 [0, 0], [-10, 15], [-15, 30]]
            ],
        },
        {
            "name": "Asia",
            "color": [184, 134, 11, 180],
            "coordinates": [
                [[50, 38], [55, 48], [65, 55], [80, 62],
                 [100, 67], [120, 62], [140, 52], [150, 42],
                 [140, 32], [120, 22], [100, 12], [80, 17],
                 [60, 28], [50, 38]]
            ],
        },
        {
            "name": "Sudamérica",
            "color": [46, 139, 87, 180],
            "coordinates": [
                [[-85, 3], [-78, 8], [-65, 8], [-55, 3],
                 [-42, -7], [-40, -18], [-45, -25], [-55, -33],
                 [-60, -38], [-70, -48], [-75, -55], [-80, -50],
                 [-80, -42], [-75, -28], [-80, -18], [-85, -7], [-85, 3]]
            ],
        },
        {
            "name": "Australia",
            "color": [210, 105, 30, 180],
            "coordinates": [
                [[120, -5], [135, -2], [150, -5], [155, -12],
                 [153, -22], [148, -30], [138, -32], [128, -28],
                 [120, -22], [118, -12], [120, -5]]
            ],
        },
        {
            "name": "Antártida",
            "color": [200, 200, 220, 180],
            "coordinates": [
                [[-60, -65], [-30, -68], [0, -70], [30, -68],
                 [60, -66], [90, -66], [120, -66], [150, -68],
                 [180, -70], [150, -75], [120, -78], [90, -80],
                 [60, -78], [30, -78], [0, -80], [-30, -78], [-60, -65]]
            ],
        },
    ],
    250: [
        {
            "name": "Pangea Última",
            "color": [34, 139, 34, 180],
            "coordinates": [
                [[-30, 60], [0, 65], [30, 65], [60, 60],
                 [80, 50], [90, 35], [85, 20], [80, 5],
                 [75, -10], [70, -25], [60, -40], [40, -50],
                 [20, -55], [0, -55], [-20, -50], [-35, -40],
                 [-45, -25], [-50, -10], [-55, 5], [-55, 20],
                 [-50, 35], [-45, 45], [-30, 60]]
            ],
        },
    ],
}

# Límites de placas tectónicas (simplificados) para visualización
PLATE_BOUNDARIES = [
    # Dorsal Mesoatlántica
    {"name": "Dorsal Mesoatlántica", "type": "divergente",
     "color": [255, 100, 100, 200],
     "path": [[-20, 65], [-20, 50], [-25, 30], [-15, 10],
              [-10, 0], [-15, -15], [-10, -30], [-15, -45], [-25, -55]]},
    # Cinturón de Fuego del Pacífico (simplificado)
    {"name": "Cinturón de Fuego", "type": "convergente",
     "color": [255, 50, 50, 200],
     "path": [[-70, -55], [-75, -40], [-80, -20], [-85, 0],
              [-100, 15], [-115, 30], [-125, 40], [-130, 50],
              [-160, 55], [170, 55], [150, 45], [140, 35],
              [130, 25], [120, 10], [115, -5], [120, -15]]},
    # Dorsal del Pacífico Oriental
    {"name": "Dorsal del Pacífico", "type": "divergente",
     "color": [255, 100, 100, 200],
     "path": [[-115, 25], [-110, 15], [-105, 5], [-100, -5],
              [-110, -20], [-115, -35], [-120, -50]]},
    # Zona de colisión India-Asia
    {"name": "Colisión India-Asia", "type": "convergente",
     "color": [255, 50, 50, 200],
     "path": [[65, 35], [75, 32], [85, 28], [95, 25], [100, 20]]},
    # Dorsal Índica
    {"name": "Dorsal Índica", "type": "divergente",
     "color": [255, 100, 100, 200],
     "path": [[25, -35], [40, -30], [55, -25], [70, -15],
              [80, -5], [90, -10], [100, -20]]},
]

# Ubicaciones conocidas con sus posiciones aproximadas en diferentes eras
KNOWN_LOCATIONS = {
    "Madrid, España": {
        -335: {"lat": -5, "lon": 10, "description": "Cerca del ecuador, en el interior de Pangea"},
        -200: {"lat": 15, "lon": 0, "description": "En la zona tropical de Pangea"},
        -150: {"lat": 25, "lon": -5, "description": "En Laurasia, zona subtropical"},
        -66: {"lat": 35, "lon": -5, "description": "En Europa, clima cálido subtropical"},
        0: {"lat": 40.4, "lon": -3.7, "description": "Posición actual en la Península Ibérica"},
        50: {"lat": 42, "lon": -2, "description": "Europa se desplaza ligeramente al norte"},
        250: {"lat": 50, "lon": 30, "description": "Parte del supercontinente Pangea Última"},
    },
    "Nueva York, EEUU": {
        -335: {"lat": -5, "lon": -10, "description": "Cerca del ecuador, en Pangea central"},
        -200: {"lat": 20, "lon": -25, "description": "En Laurasia, zona tropical"},
        -150: {"lat": 30, "lon": -40, "description": "Costa este de Laurasia"},
        -66: {"lat": 40, "lon": -55, "description": "Costa este de Norteamérica"},
        0: {"lat": 40.7, "lon": -74.0, "description": "Posición actual en la costa este"},
        50: {"lat": 42, "lon": -76, "description": "Ligeramente al norte"},
        250: {"lat": 45, "lon": 10, "description": "Parte de Pangea Última"},
    },
    "Tokio, Japón": {
        -335: {"lat": 10, "lon": 50, "description": "En el borde de Pangea"},
        -200: {"lat": 20, "lon": 80, "description": "Costa de Laurasia"},
        -150: {"lat": 25, "lon": 100, "description": "Borde de la placa Euroasiática"},
        -66: {"lat": 30, "lon": 130, "description": "Arco insular en formación"},
        0: {"lat": 35.7, "lon": 139.7, "description": "Posición actual en Japón"},
        50: {"lat": 38, "lon": 142, "description": "Japón se desplaza ligeramente"},
        250: {"lat": 40, "lon": 60, "description": "Integrado en Pangea Última"},
    },
    "Sídney, Australia": {
        -335: {"lat": -50, "lon": 40, "description": "En Gondwana, cerca del polo sur"},
        -200: {"lat": -45, "lon": 60, "description": "En Gondwana, zona polar"},
        -150: {"lat": -40, "lon": 90, "description": "Australia unida a la Antártida"},
        -66: {"lat": -35, "lon": 140, "description": "Australia se separa de la Antártida"},
        0: {"lat": -33.9, "lon": 151.2, "description": "Posición actual en Australia"},
        50: {"lat": -25, "lon": 155, "description": "Australia migra hacia el norte"},
        250: {"lat": -10, "lon": 70, "description": "Australia colisiona con Asia"},
    },
    "Ciudad de México, México": {
        -335: {"lat": 0, "lon": -15, "description": "En el ecuador de Pangea"},
        -200: {"lat": 10, "lon": -30, "description": "En la zona tropical de Laurasia"},
        -150: {"lat": 15, "lon": -55, "description": "En la placa de Norteamérica"},
        -66: {"lat": 18, "lon": -90, "description": "Cerca del impacto de Chicxulub"},
        0: {"lat": 19.4, "lon": -99.1, "description": "Posición actual en México"},
        50: {"lat": 20, "lon": -102, "description": "México ligeramente desplazado"},
        250: {"lat": 25, "lon": -20, "description": "Parte de Pangea Última"},
    },
    "Buenos Aires, Argentina": {
        -335: {"lat": -40, "lon": -10, "description": "En Gondwana, zona templada"},
        -200: {"lat": -35, "lon": -20, "description": "En Gondwana, separándose"},
        -150: {"lat": -35, "lon": -30, "description": "Sudamérica se separa de África"},
        -66: {"lat": -35, "lon": -50, "description": "Sudamérica migra al oeste"},
        0: {"lat": -34.6, "lon": -58.4, "description": "Posición actual en Argentina"},
        50: {"lat": -36, "lon": -62, "description": "Sudamérica se desplaza al oeste"},
        250: {"lat": -30, "lon": -10, "description": "Parte de Pangea Última"},
    },
    "El Cairo, Egipto": {
        -335: {"lat": -20, "lon": 20, "description": "En Gondwana, zona tropical sur"},
        -200: {"lat": -10, "lon": 15, "description": "Norte de Gondwana"},
        -150: {"lat": 0, "lon": 10, "description": "Borde norte de África"},
        -66: {"lat": 20, "lon": 20, "description": "Norte de África, mar de Tetis al norte"},
        0: {"lat": 30.0, "lon": 31.2, "description": "Posición actual en Egipto"},
        50: {"lat": 33, "lon": 32, "description": "Más cerca de Europa"},
        250: {"lat": 40, "lon": 45, "description": "Integrado en Pangea Última"},
    },
    "Bogotá, Colombia": {
        -335: {"lat": -10, "lon": -15, "description": "En Gondwana, cerca del ecuador"},
        -200: {"lat": -5, "lon": -20, "description": "Borde norte de Gondwana"},
        -150: {"lat": 0, "lon": -30, "description": "Norte de Sudamérica"},
        -66: {"lat": 3, "lon": -60, "description": "Norte de Sudamérica"},
        0: {"lat": 4.7, "lon": -74.1, "description": "Posición actual en Colombia"},
        50: {"lat": 5, "lon": -78, "description": "Colombia se desplaza al oeste"},
        250: {"lat": 10, "lon": -15, "description": "Parte de Pangea Última"},
    },
}

# Velocidades de placas tectónicas principales (cm/año, aproximado)
PLATE_VELOCITIES = {
    "Pacífica": {"velocidad_cm_año": 7.5, "dirección": "Noroeste"},
    "Norteamericana": {"velocidad_cm_año": 2.3, "dirección": "Oeste-Suroeste"},
    "Sudamericana": {"velocidad_cm_año": 3.0, "dirección": "Oeste-Noroeste"},
    "Euroasiática": {"velocidad_cm_año": 2.1, "dirección": "Este"},
    "Africana": {"velocidad_cm_año": 2.15, "dirección": "Norte-Noreste"},
    "Indo-Australiana": {"velocidad_cm_año": 6.0, "dirección": "Norte-Noreste"},
    "Antártica": {"velocidad_cm_año": 1.0, "dirección": "Casi estacionaria"},
    "Nazca": {"velocidad_cm_año": 7.6, "dirección": "Este"},
    "Filipina": {"velocidad_cm_año": 6.5, "dirección": "Noroeste"},
    "Arábiga": {"velocidad_cm_año": 4.0, "dirección": "Norte-Noreste"},
}
