export interface EraConfig {
  name: string;
  year: number;
  file: string;
  description: string;
  climate: string;
  fauna: string;
  flora: string;
  events: string;
  wikipedia?: string;
}

export const ERA_CONFIG: Record<number, EraConfig> = {
  0: {
      name: 'Pangea Primitiva (-350 Ma)',
      year: -350,
      file: 'data/coastlines_350ma_pangea.json',
      description: 'Formación de Pangea. Colisión de continentes (Laurentia y Gondwana).',
      climate: 'Clima variable. Glaciación en el sur (Gondwana).',
      fauna: 'Diversificación de peces con mandíbulas y primeros anfibios.',
      flora: 'Primeros bosques extensos de helechos y licópodos.',
      events: 'Orogenia Varisca/Alemana. Era del Carbonífero.',
      wikipedia: 'https://es.wikipedia.org/wiki/Pangea'
  },
  1: {
      name: 'Pangea (-300 Ma)',
      year: -300,
      file: 'data/coastlines_300ma.json',
      description: 'Supercontinente Pangea completamente formado. Todos los continentes unidos.',
      climate: 'Glaciaciones en Gondwana. Tropical húmedo en ecuador.',
      fauna: 'Anfibios gigantes. Meganeura. Primeros reptiles (cotylosaurios).',
      flora: 'Grandes bosques de licópodos que formarán carbón.',
      events: 'Era del Carbón. Niveles de oxígeno al 35%.',
      wikipedia: 'https://es.wikipedia.org/wiki/P%C3%A9rmico'
  },
  2: {
      name: 'Pangea Tardía (-250 Ma)',
      year: -250,
      file: 'data/coastlines_250ma.json',
      description: 'Supercontinente Pangea comenzando a fragmentarse. Primeras grietas.',
      climate: 'Extremadamente árido en el interior continental.',
      fauna: 'Reptiles primitivos. Ancestros de dinosaurios. Terapsidos (mamíferos reptiloides).',
      flora: 'Helechos arborescentes. Ginkgos. Coníferas emergiendo.',
      events: 'Extinción masiva del Pérmico-Triásico (96% de especies).',
      wikipedia: 'https://es.wikipedia.org/wiki/Tri%C3%A1sico'
  },
  3: {
      name: 'Jurásico (-200 Ma)',
      year: -200,
      file: 'data/coastlines_200ma.json',
      description: 'Pangea se fragmenta. Apertura del Océano Atlántico central.',
      climate: 'Cálido y árido en el interior. Sin casquetes polares.',
      fauna: 'Primeros dinosaurios grandes. Plesiosaurios en mares.',
      flora: 'Coníferas dominantes. Cicadáceas. Bennettitales.',
      events: 'Extinción masiva Triásico-Jurásica. Inicio de la ruptura de Pangea.',
      wikipedia: 'https://es.wikipedia.org/wiki/Jur%C3%A1sico'
  },
  4: {
      name: 'Cretácico Medio (-150 Ma)',
      year: -150,
      file: 'data/coastlines_150ma.json',
      description: 'Laurasia (norte) y Gondwana (sur) se separan. Atlántico se ensancha.',
      climate: 'Cálido y húmedo globalmente. Nivel del mar alto.',
      fauna: 'Dinosaurios gigantes: Brachiosaurus, Stegosaurus, Allosaurus.',
      flora: 'Coníferas y cicadáceas dominantes. Primeras angiospermas.',
      events: 'Expansión del Atlántico. Formación del Océano Índico.',
      wikipedia: 'https://es.wikipedia.org/wiki/Cret%C3%A1cico'
  },
  5: {
      name: 'Cretácico Tardío (-100 Ma)',
      year: -100,
      file: 'data/coastlines_100ma.json',
      description: 'Continentes se acercan a posición actual. India migra rápidamente hacia Asia.',
      climate: 'Cálido global. Sin hielo polar. Mares epicontinentales extensos.',
      fauna: 'T-Rex, Triceratops, Velociraptor. Aves primitivas.',
      flora: 'Angiospermas (florales) diversificándose rápidamente.',
      events: 'Mares interiores cubren Norteamérica central.',
      wikipedia: 'https://es.wikipedia.org/wiki/Cret%C3%A1cico_superior'
  },
  6: {
      name: 'Eoceno (-50 Ma)',
      year: -50,
      file: 'data/coastlines_50ma.json',
      description: 'Configuración similar al presente pero con diferencias sutiles.',
      climate: 'Muy cálido. Bosques tropicales hasta los polos.',
      fauna: 'Mamíferos diversificándose. Primeros primates. Ballenas terrestres.',
      flora: 'Bosques tropicales extensos. Dominancia de angiospermas.',
      events: 'Colisión India-Asia comenzando. Apertura del Atlántico Norte.',
      wikipedia: 'https://es.wikipedia.org/wiki/Eoceno'
  },
  7: {
      name: 'Presente (0 Ma)',
      year: 0,
      file: 'data/coastlines_present.json',
      description: 'Configuración actual de los continentes.',
      climate: 'Período interglaciar. Casquetes polares en ambos polos.',
      fauna: 'Era de los mamíferos. Homo sapiens es la especie dominante.',
      flora: 'Gran diversidad de angiospermas. Biomas variados según latitud.',
      events: 'Civilización humana. Cambio climático antropogénico. Sexta extinción masiva.',
      wikipedia: 'https://es.wikipedia.org/wiki/Holoceno'
  }
};

export const ERA_TIMELINE_ORDER = [0, 1, 2, 3, 4, 5, 6, 7];

export interface LocationCoords {
  lat: number;
  lon: number;
}

export const LOCATIONS: Record<string, LocationCoords> = {
  'Madrid, España': { lat: 40.4168, lon: -3.7038 },
  'Nueva York, USA': { lat: 40.7128, lon: -74.0060 },
  'Tokio, Japón': { lat: 35.6762, lon: 139.6503 },
  'Sídney, Australia': { lat: -33.8688, lon: 151.2093 },
  'Ciudad de México': { lat: 19.4326, lon: -99.1332 },
  'Buenos Aires, Argentina': { lat: -34.6037, lon: -58.3816 },
  'El Cairo, Egipto': { lat: 30.0444, lon: 31.2357 },
  'Bogotá, Colombia': { lat: 4.7110, lon: -74.0721 },
  'Londres, UK': { lat: 51.5074, lon: -0.1278 },
  'Pekín, China': { lat: 39.9042, lon: 116.4074 },
  'París, Francia': { lat: 48.8566, lon: 2.3522 },
  'Berlín, Alemania': { lat: 52.5200, lon: 13.4050 },
  'Moscú, Rusia': { lat: 55.7558, lon: 37.6173 },
  'Mumbai, India': { lat: 19.0760, lon: 72.8777 },
  'Río de Janeiro, Brasil': { lat: -22.9068, lon: -43.1729 },
  'Cape Town, Sudáfrica': { lat: -33.9249, lon: 18.4241 },
  'Los Ángeles, USA': { lat: 34.0522, lon: -118.2437 },
  'San Francisco, USA': { lat: 37.7749, lon: -122.4194 },
  'Seúl, Corea del Sur': { lat: 37.5665, lon: 126.9780 },
  'Bangkok, Tailandia': { lat: 13.7563, lon: 100.5018 }
};

export interface PlateColor {
  name: string;
  color: [number, number, number, number];
}

export const PLATE_COLORS: Record<number | string, PlateColor> = {
  101: { name: 'Norteamérica', color: [139, 90, 43, 200] },
  201: { name: 'Sudamérica', color: [46, 139, 87, 200] },
  301: { name: 'Eurasia', color: [160, 82, 45, 200] },
  401: { name: 'África', color: [34, 139, 34, 200] },
  501: { name: 'India', color: [184, 134, 11, 200] },
  601: { name: 'Australia', color: [210, 105, 30, 200] },
  701: { name: 'Antártida', color: [200, 200, 220, 200] },
  801: { name: 'Pacífico', color: [70, 130, 180, 200] },
  901: { name: 'Nazca', color: [255, 140, 0, 200] },
  1001: { name: 'Filipina', color: [128, 0, 128, 200] },
  1101: { name: 'Caribe', color: [0, 128, 128, 200] },
  default: { name: 'Desconocida', color: [128, 128, 128, 200] }
};

export interface PlateBoundary {
  name: string;
  type: 'divergente' | 'convergente' | 'subduccion' | 'transformante';
  coordinates: [number, number][];
}

export const PLATE_BOUNDARIES: PlateBoundary[] = [
  {
      name: 'Dorsal Mesoatlántica',
      type: 'divergente',
      coordinates: [[-30, 70], [-28, 60], [-25, 50], [-22, 40], [-20, 30], [-18, 20], [-16, 10], [-15, 0], [-14, -10], [-14, -20], [-14, -30], [-15, -40], [-16, -50], [-18, -60]]
  },
  {
      name: 'Cinturón de Fuego del Pacífico',
      type: 'convergente',
      coordinates: [[-75, -50], [-80, -40], [-85, -20], [-90, 0], [-100, 15], [-115, 30], [-130, 45], [-150, 55], [170, 55], [150, 45], [140, 35], [130, 25], [120, 10], [115, -5], [120, -15], [130, -35]]
  },
  {
      name: 'Dorsal del Pacífico Oriental',
      type: 'divergente',
      coordinates: [[-120, 55], [-115, 40], [-110, 25], [-105, 10], [-100, -5], [-105, -20], [-110, -35], [-115, -50]]
  },
  {
      name: 'Dorsal Índica',
      type: 'divergente',
      coordinates: [[20, -45], [40, -35], [60, -25], [80, -15], [100, -10], [120, -15], [140, -25]]
  },
  {
      name: 'Fosa de las Marianas',
      type: 'subduccion',
      coordinates: [[130, 10], [135, 12], [140, 14], [145, 16], [147, 18], [145, 15], [140, 12], [135, 10]]
  },
  {
      name: 'Falla de San Andrés',
      type: 'transformante',
      coordinates: [[-125, 40], [-123, 38], [-121, 36], [-119, 34], [-117, 32]]
  }
];

export interface PlateCenter {
  name: string;
  lat: number;
  lon: number;
  velocity: number;
  direction: number;
}

export const PLATE_CENTERS: PlateCenter[] = [
  { name: 'Norteamérica', lat: 50, lon: -100, velocity: 2.3, direction: 260 },
  { name: 'Sudamérica', lat: -15, lon: -60, velocity: 3.0, direction: 270 },
  { name: 'Eurasia', lat: 55, lon: 60, velocity: 2.1, direction: 90 },
  { name: 'África', lat: 5, lon: 20, velocity: 2.15, direction: 20 },
  { name: 'India', lat: 20, lon: 78, velocity: 6.0, direction: 30 },
  { name: 'Australia', lat: -25, lon: 135, velocity: 6.0, direction: 30 },
  { name: 'Antártida', lat: -80, lon: 0, velocity: 1.0, direction: 0 },
  { name: 'Pacífico', lat: 0, lon: -150, velocity: 7.5, direction: 310 }
];

export interface PlateInfo {
  name: string;
  velocity: string;
  direction: string;
}

export const PLATE_INFO: Record<number, PlateInfo> = {
  101: { name: 'Placa Norteamericana', velocity: '2.3 cm/año', direction: 'Oeste-Suroeste' },
  201: { name: 'Placa Sudamericana', velocity: '3.0 cm/año', direction: 'Oeste' },
  301: { name: 'Placa Euroasiática', velocity: '2.1 cm/año', direction: 'Este' },
  401: { name: 'Placa Africana', velocity: '2.15 cm/año', direction: 'Norte-Noreste' },
  501: { name: 'Placa India', velocity: '6.0 cm/año', direction: 'Norte' },
  601: { name: 'Placa Australiana', velocity: '6.0 cm/año', direction: 'Noreste' },
  701: { name: 'Placa Antártica', velocity: '1.0 cm/año', direction: 'Estacionaria' },
  801: { name: 'Placa del Pacífico', velocity: '7.5 cm/año', direction: 'Noroeste' },
  901: { name: 'Placa de Nazca', velocity: '7.6 cm/año', direction: 'Este' }
};
