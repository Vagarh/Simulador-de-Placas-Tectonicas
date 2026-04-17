import { ERA_CONFIG, LOCATIONS, PLATE_COLORS, PLATE_BOUNDARIES, PLATE_CENTERS, PLATE_INFO } from './data';

export class TectonicSimulator {
    viewer: any;
    currentEraIndex: number;
    coastlineEntities: any[];
    platePolygonEntities: any[];
    boundaryEntities: any[];
    vectorEntities: any[];
    labelEntities: any[];
    markerEntity: any;
    isRotating: boolean;
    rotationInterval: any;
    isPlaying: boolean;
    playInterval: any;
    layers: {
        coastlines: boolean;
        plates: boolean;
        boundaries: boolean;
        vectors: boolean;
        labels: boolean;
    };

    constructor() {
        this.viewer = null;
        this.currentEraIndex = 7; // Comenzar en Presente
        this.coastlineEntities = [];
        this.platePolygonEntities = [];
        this.boundaryEntities = [];
        this.vectorEntities = [];
        this.labelEntities = [];
        this.markerEntity = null;
        this.isRotating = false;
        this.rotationInterval = null;
        this.isPlaying = false;
        this.playInterval = null;
        
        // Estado de capas
        this.layers = {
            coastlines: true,
            plates: false,
            boundaries: false,
            vectors: false,
            labels: false
        };
        
        this.init();
    }

    async init() {
        this.showLoading();
        
        try {
            await this.initCesium();
            this.setupEventListeners();
            await this.loadEra(7); // Cargar Presente primero
            this.hideLoading();
            this.showToast('Simulador cargado.', 'success');
            
            // Iniciar rotación automática al empezar para mayor impacto visual
            if (!this.isRotating) {
                this.toggleRotation();
            }
        } catch (error) {
            console.error('Error initializing:', error);
            this.hideLoading();
            this.showToast('Nota: Error de red o token de mapas.', 'error');
        }
        
        // Atrapa cualquier rechazo de promesa no manejado de Cesium interno para que Next.js no muestre pantalla de error
        window.addEventListener('unhandledrejection', (e) => {
            if (e.reason && e.reason.message && e.reason.message.includes('Request has failed')) {
                e.preventDefault(); // Suprime el error visual de Next.js
                console.warn('Cesium Network Warning:', e.reason.message);
            }
        });
    }

    showLoading() {
        const progress = document.getElementById('progress');
        if(!progress) return;
        let width = 0;
        const interval = setInterval(() => {
            width += Math.random() * 15;
            if (width > 100) width = 100;
            progress.style.width = width + '%';
            if (width === 100) clearInterval(interval);
        }, 200);
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if(loading) loading.classList.add('hidden');
    }

    async initCesium() {
        const globalObj = window as any;
        const Cesium = globalObj.Cesium;
        
        // Proveedor de texturas satelitales gratis y estéticas de ArcGIS
        this.viewer = new Cesium.Viewer('cesiumContainer', {
            imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
            }),
            
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            
            skyBox: new Cesium.SkyBox({
                sources: {
                    positiveX: 'https://cesiumjs.org/images/SkyBox/tycho2t3_80_px.jpg',
                    negativeX: 'https://cesiumjs.org/images/SkyBox/tycho2t3_80_mx.jpg',
                    positiveY: 'https://cesiumjs.org/images/SkyBox/tycho2t3_80_py.jpg',
                    negativeY: 'https://cesiumjs.org/images/SkyBox/tycho2t3_80_my.jpg',
                    positiveZ: 'https://cesiumjs.org/images/SkyBox/tycho2t3_80_pz.jpg',
                    negativeZ: 'https://cesiumjs.org/images/SkyBox/tycho2t3_80_mz.jpg'
                }
            }),
            
            shouldAnimate: true
        });

        // Improve camera navigation / map interaction defaults
        this.viewer.scene.screenSpaceCameraController.enableCollisionDetection = true;
        this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000000;
        this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 35000000;
        this.viewer.scene.screenSpaceCameraController.inertiaSpin = 0.9;
        this.viewer.scene.screenSpaceCameraController.inertiaTranslate = 0.9;
        this.viewer.scene.screenSpaceCameraController.inertiaZoom = 0.9;

        this.viewer.scene.globe.enableLighting = true;
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
        this.viewer.scene.skyAtmosphere.show = true;
        this.viewer.scene.fog.enabled = true;
        this.viewer.scene.fog.density = 0.0001;
        this.viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.02, 1.0);

        // Vista inicial
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(0, 15, 25000000),
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-90),
                roll: 0
            },
            duration: 0
        });
    }

    async loadEra(index: number) {
        const era = ERA_CONFIG[index];
        if (!era) return;

        this.currentEraIndex = index;

        // Actualizar UI
        const eraIndicator = document.getElementById('eraIndicator');
        const infoTitle = document.getElementById('infoTitle');
        const infoDesc = document.getElementById('infoDesc');
        const infoClimate = document.getElementById('infoClimate');
        const infoFauna = document.getElementById('infoFauna');
        const infoEvents = document.getElementById('infoEvents');
        const infoWiki = document.getElementById('infoWiki') as HTMLAnchorElement;

        if(eraIndicator) eraIndicator.textContent = era.name;
        if(infoTitle) infoTitle.textContent = era.name;
        if(infoDesc) infoDesc.textContent = era.description;
        if(infoClimate) infoClimate.textContent = era.climate;
        if(infoFauna) infoFauna.textContent = era.fauna;
        if(infoEvents) infoEvents.textContent = era.events;
        if(infoWiki && era.wikipedia) {
            infoWiki.href = era.wikipedia;
            infoWiki.style.display = 'flex';
        } else if (infoWiki) {
            infoWiki.style.display = 'none';
        }

        // Mostrar panel de info
        const infoPanel = document.getElementById('infoPanel');
        if(infoPanel) {
            infoPanel.style.opacity = '1';
            infoPanel.style.transform = 'translateX(0)';
        }

        // Actualizar timeline visual
        this.updateTimelineMarkers(index);

        // Cargar GeoJSON de líneas de costa
        await this.loadCoastlines(`/${era.file}`); // root path for public folder
        
        // Recargar otras capas según estado
        if (this.layers.plates) this.loadPlatePolygons();
        if (this.layers.boundaries) this.loadPlateBoundaries();
        if (this.layers.vectors) this.loadVelocityVectors();
        if (this.layers.labels) this.loadPlateLabels();
    }

    async loadCoastlines(url: string) {
        // Limpiar entidades anteriores
        this.coastlineEntities.forEach(e => this.viewer.entities.remove(e));
        this.coastlineEntities = [];

        try {
            const response = await fetch(url);
            const geojson = await response.json();

            if (!geojson.features || geojson.features.length === 0) {
                console.warn('No features found in:', url);
                return;
            }

            geojson.features.forEach((feature: any) => {
                if (!feature.geometry) return;

                const plateId = feature.properties?.PLATEID1 || 0;
                const plateInfo = PLATE_COLORS[plateId] || PLATE_COLORS.default;

                if (feature.geometry.type === 'Polygon') {
                    this.createPolygonEntity(feature.geometry.coordinates, plateInfo.color, plateId);
                } else if (feature.geometry.type === 'MultiPolygon') {
                    feature.geometry.coordinates.forEach((polygon: any) => {
                        this.createPolygonEntity(polygon, plateInfo.color, plateId);
                    });
                }
            });

            console.log(`Loaded ${this.coastlineEntities.length} coastline entities`);

        } catch (error) {
            console.error('Error loading coastlines:', error);
            this.showToast('Error cargando datos de continentes', 'error');
        }
    }

    createPolygonEntity(coordinates: any[], color: any[], plateId: number) {
        const Cesium = (window as any).Cesium;
        try {
            const hierarchy = coordinates[0].map((coord: any[]) => {
                return Cesium.Cartesian3.fromDegrees(coord[0], coord[1]);
            });

            const entity = this.viewer.entities.add({
                polygon: {
                    hierarchy: new Cesium.PolygonHierarchy(hierarchy),
                    material: Cesium.Color.fromBytes(color[0], color[1], color[2], color[3]),
                    outline: true,
                    outlineColor: Cesium.Color.fromBytes(
                        Math.min(color[0] + 40, 255),
                        Math.min(color[1] + 40, 255),
                        Math.min(color[2] + 40, 255),
                        255
                    ),
                    outlineWidth: 1,
                    height: 0,
                    extrudedHeight: 30000
                },
                properties: {
                    plateId: plateId,
                    plateName: PLATE_INFO[plateId]?.name || 'Placa desconocida'
                }
            });

            this.coastlineEntities.push(entity);
        } catch (e) {
            // Ignorar polígonos inválidos
        }
    }

    loadPlatePolygons() {
        const Cesium = (window as any).Cesium;
        // Limpiar anteriores
        this.platePolygonEntities.forEach(e => this.viewer.entities.remove(e));
        this.platePolygonEntities = [];

        const plateOutlines = [
            { name: 'Norteamérica', coords: [[-170, 75], [-50, 75], [-50, 10], [-90, 10], [-120, 25], [-170, 55]] },
            { name: 'Sudamérica', coords: [[-85, 15], [-35, 15], [-35, -55], [-75, -55], [-85, -10]] },
            { name: 'Eurasia', coords: [[-25, 75], [180, 75], [180, 10], [140, 10], [100, 0], [50, 10], [0, 35], [-25, 35]] },
            { name: 'África', coords: [[-20, 35], [55, 35], [55, -35], [10, -35], [-20, 5]] },
            { name: 'Australia', coords: [[110, -10], [155, -10], [155, -45], [110, -45]] },
            { name: 'Antártida', coords: [[-180, -60], [180, -60], [180, -90], [-180, -90]] },
            { name: 'India', coords: [[65, 35], [95, 35], [95, 5], [65, 5]] }
        ];

        plateOutlines.forEach((plate, index) => {
            const coords = plate.coords.map(c => Cesium.Cartesian3.fromDegrees(c[0], c[1]));
            const color = [100 + index * 20, 150, 200, 100];

            const entity = this.viewer.entities.add({
                polygon: {
                    hierarchy: new Cesium.PolygonHierarchy(coords),
                    material: Cesium.Color.fromBytes(color[0], color[1], color[2], 60),
                    outline: true,
                    outlineColor: Cesium.Color.fromBytes(color[0], color[1], color[2], 150),
                    outlineWidth: 2,
                    height: 0,
                    extrudedHeight: 50000
                },
                properties: { plateName: plate.name }
            });

            this.platePolygonEntities.push(entity);
        });
    }

    loadPlateBoundaries() {
        const Cesium = (window as any).Cesium;
        this.boundaryEntities.forEach(e => this.viewer.entities.remove(e));
        this.boundaryEntities = [];

        PLATE_BOUNDARIES.forEach(boundary => {
            const positions = boundary.coordinates.map(coord => 
                Cesium.Cartesian3.fromDegrees(coord[0], coord[1])
            );

            let color;
            switch(boundary.type) {
                case 'divergente': color = Cesium.Color.fromBytes(0, 255, 150, 200); break;
                case 'convergente': 
                case 'subduccion': color = Cesium.Color.fromBytes(255, 50, 50, 200); break;
                case 'transformante': color = Cesium.Color.fromBytes(255, 200, 50, 200); break;
                default: color = Cesium.Color.WHITE;
            }

            const entity = this.viewer.entities.add({
                polyline: {
                    positions: positions,
                    width: 3,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 0.3,
                        color: color
                    }),
                    clampToGround: true
                },
                properties: { 
                    boundaryName: boundary.name,
                    boundaryType: boundary.type 
                }
            });

            this.boundaryEntities.push(entity);
        });
    }

    loadVelocityVectors() {
        const Cesium = (window as any).Cesium;
        this.vectorEntities.forEach(e => this.viewer.entities.remove(e));
        this.vectorEntities = [];

        PLATE_CENTERS.forEach(plate => {
            if (plate.velocity <= 0) return;

            const start = Cesium.Cartesian3.fromDegrees(plate.lon, plate.lat);
            
            // Calcular punto final basado en dirección y velocidad
            const rad = Cesium.Math.toRadians(plate.direction);
            const distance = plate.velocity * 50000;
            
            const endLon = plate.lon + (Math.sin(rad) * distance / 111000);
            const endLat = plate.lat + (Math.cos(rad) * distance / 111000);
            const end = Cesium.Cartesian3.fromDegrees(endLon, endLat);

            const lineEntity = this.viewer.entities.add({
                polyline: {
                    positions: [start, end],
                    width: 3,
                    material: new Cesium.PolylineArrowMaterialProperty(
                        Cesium.Color.fromBytes(255, 200, 50, 200)
                    ),
                    clampToGround: true
                }
            });

            const pointEntity = this.viewer.entities.add({
                position: start,
                point: {
                    pixelSize: 8,
                    color: Cesium.Color.fromBytes(255, 200, 50, 255),
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2
                }
            });

            this.vectorEntities.push(lineEntity, pointEntity);
        });
    }

    loadPlateLabels() {
        const Cesium = (window as any).Cesium;
        this.labelEntities.forEach(e => this.viewer.entities.remove(e));
        this.labelEntities = [];

        PLATE_CENTERS.forEach(plate => {
            const entity = this.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(plate.lon, plate.lat),
                label: {
                    text: plate.name,
                    font: 'bold 14px Inter, sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 3,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    pixelOffset: new Cesium.Cartesian2(0, 0),
                    scaleByDistance: new Cesium.NearFarScalar(1.5e6, 1.5, 1.5e7, 0.5)
                }
            });

            this.labelEntities.push(entity);
        });
    }

    setupEventListeners() {
        const Cesium = (window as any).Cesium;
        const timeline = document.getElementById('timeline') as HTMLInputElement;
        if(timeline) {
            timeline.addEventListener('input', (e: any) => {
                const index = parseInt(e.target.value);
                this.loadEra(index);
            });
        }

        document.querySelectorAll('.marker').forEach(marker => {
            marker.addEventListener('click', () => {
                const index = parseInt((marker as HTMLElement).dataset.index || "0");
                if(timeline) timeline.value = index.toString();
                this.loadEra(index);
            });
        });

        document.querySelectorAll('.timeline-labels span').forEach(label => {
            label.addEventListener('click', () => {
                const index = parseInt((label as HTMLElement).dataset.era || "0");
                if(timeline) timeline.value = index.toString();
                this.loadEra(index);
            });
        });

        const layerCoastlines = document.getElementById('layer-coastlines') as HTMLInputElement;
        if(layerCoastlines){
            layerCoastlines.addEventListener('change', (e: any) => {
                this.layers.coastlines = e.target.checked;
                this.coastlineEntities.forEach(entity => entity.show = e.target.checked);
            });
        }

        const layerPlates = document.getElementById('layer-plates') as HTMLInputElement;
        if(layerPlates){
            layerPlates.addEventListener('change', (e: any) => {
                this.layers.plates = e.target.checked;
                if (e.target.checked) {
                    this.loadPlatePolygons();
                } else {
                    this.platePolygonEntities.forEach(entity => entity.show = false);
                }
            });
        }

        const layerBoundaries = document.getElementById('layer-boundaries') as HTMLInputElement;
        if(layerBoundaries){
            layerBoundaries.addEventListener('change', (e: any) => {
                this.layers.boundaries = e.target.checked;
                if (e.target.checked) {
                    this.loadPlateBoundaries();
                } else {
                    this.boundaryEntities.forEach(entity => entity.show = false);
                }
            });
        }

        const layerVectors = document.getElementById('layer-vectors') as HTMLInputElement;
        if(layerVectors){
            layerVectors.addEventListener('change', (e: any) => {
                this.layers.vectors = e.target.checked;
                if (e.target.checked) {
                    this.loadVelocityVectors();
                } else {
                    this.vectorEntities.forEach(entity => entity.show = false);
                }
            });
        }

        const layerLabels = document.getElementById('layer-labels') as HTMLInputElement;
        if(layerLabels){
            layerLabels.addEventListener('change', (e: any) => {
                this.layers.labels = e.target.checked;
                if (e.target.checked) {
                    this.loadPlateLabels();
                } else {
                    this.labelEntities.forEach(entity => entity.show = false);
                }
            });
        }

        const btnReset = document.getElementById('btn-reset');
        if(btnReset) {
            btnReset.addEventListener('click', () => {
                this.viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(0, 15, 25000000),
                    orientation: { heading: 0, pitch: Cesium.Math.toRadians(-90), roll: 0 },
                    duration: 1.5
                });
            });
        }

        const btnRotate = document.getElementById('btn-rotate');
        if(btnRotate){
            btnRotate.addEventListener('click', () => {
                this.toggleRotation();
            });
        }

        const btnLayers = document.getElementById('btn-layers');
        if(btnLayers){
            btnLayers.addEventListener('click', () => {
                this.togglePanel('layersPanel');
            });
        }

        const closeLayers = document.getElementById('closeLayers');
        if(closeLayers){
            closeLayers.addEventListener('click', () => {
                this.closePanel('layersPanel');
            });
        }

        const closeInfo = document.getElementById('closeInfo');
        if(closeInfo){
            closeInfo.addEventListener('click', () => {
                this.closePanel('infoPanel');
            });
        }

        const mobileOverlay = document.getElementById('mobile-overlay');
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => {
                this.closePanel('layersPanel');
                this.closePanel('infoPanel');
            });
        }

        const btnSearch = document.getElementById('btn-search');
        if(btnSearch){
            btnSearch.addEventListener('click', () => {
                this.searchLocation();
            });
        }

        const searchInput = document.getElementById('searchInput');
        if(searchInput){
            searchInput.addEventListener('keypress', (e: any) => {
                if (e.key === 'Enter') this.searchLocation();
            });
        }

        const btnPlayTimeline = document.getElementById('btn-play-timeline');
        if(btnPlayTimeline){
            btnPlayTimeline.addEventListener('click', () => {
                this.togglePlay();
            });
        }

        this.setupRaycasting();
    }

    setupRaycasting() {
        const Cesium = (window as any).Cesium;
        const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        handler.setInputAction((movement: any) => {
            const pickedObject = this.viewer.scene.pick(movement.endPosition);

            if (Cesium.defined(pickedObject) && pickedObject.id) {
                const entity = pickedObject.id;
                if (entity.properties && entity.properties.plateName) {
                    this.showToast(`Placa Tectónica: ${entity.properties.plateName.getValue()}`, 'info');
                    document.body.style.cursor = 'pointer';
                }
                else if (entity.properties && entity.properties.boundaryName) {
                    this.showToast(`Límite: ${entity.properties.boundaryName.getValue()} (${entity.properties.boundaryType.getValue()})`, 'info');
                    document.body.style.cursor = 'pointer';
                } else {
                    document.body.style.cursor = 'default';
                }
            } else {
                document.body.style.cursor = 'default';
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction((movement: any) => {
            const pickedObject = this.viewer.scene.pick(movement.position);
            
            // Pausar rotación si el usuario pincha el globo para explorar
            if (this.isRotating) {
                this.toggleRotation();
                const btnRotate = document.getElementById('btn-rotate');
                if(btnRotate) btnRotate.classList.remove('active');
            }

            if (Cesium.defined(pickedObject) && pickedObject.id) {
                const entity = pickedObject.id;
                if (entity.properties && entity.properties.plateName) {
                    const plateName = entity.properties.plateName.getValue();
                    this.showToast(`Seleccionado: ${plateName}`, 'success');
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        const btnPlay = document.getElementById('btn-play-timeline');
        const iconPlay = document.getElementById('icon-play');
        const iconPause = document.getElementById('icon-pause');
        if(!btnPlay || !iconPlay || !iconPause) return;

        if (this.isPlaying) {
            btnPlay.classList.add('playing');
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';

            this.playInterval = setInterval(() => {
                let nextIndex = this.currentEraIndex + 1;
                if (nextIndex > 7) {
                    nextIndex = 0;
                }
                const timeline = document.getElementById('timeline') as HTMLInputElement;
                if(timeline) timeline.value = nextIndex.toString();
                this.loadEra(nextIndex);
            }, 2000);
        } else {
            btnPlay.classList.remove('playing');
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
            clearInterval(this.playInterval);
        }
    }

    updateTimelineMarkers(index: number) {
        document.querySelectorAll('.marker').forEach((m: any, i) => {
            m.classList.toggle('active', i === index);
        });
        document.querySelectorAll('.timeline-labels span').forEach((s: any, i) => {
            s.classList.toggle('active', i === index);
        });
    }

    togglePanel(panelId: string) {
        const panel = document.getElementById(panelId);
        if(!panel) return;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            const isVisible = panel.classList.contains('open');
            this.closePanel('layersPanel');
            this.closePanel('infoPanel');

            if (!isVisible) {
                panel.classList.add('open');
                const overlay = document.getElementById('mobile-overlay');
                if(overlay) overlay.classList.add('show');
            }
        } else {
            const isVisible = panel.style.opacity !== '0' && panel.style.opacity !== '';
            if (isVisible) {
                this.closePanel(panelId);
            } else {
                panel.style.opacity = '1';
                panel.style.transform = 'translateX(0)';
            }
        }
    }

    closePanel(panelId: string) {
        const panel = document.getElementById(panelId);
        if(!panel) return;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            panel.classList.remove('open');
            const overlay = document.getElementById('mobile-overlay');
            if (overlay) overlay.classList.remove('show');
        } else {
            panel.style.opacity = '0';
            panel.style.transform = panelId === 'layersPanel' ? 'translateX(-320px)' : 'translateX(320px)';
        }
    }

    toggleRotation() {
        const Cesium = (window as any).Cesium;
        this.isRotating = !this.isRotating;
        const btnRotate = document.getElementById('btn-rotate');
        if(btnRotate) btnRotate.classList.toggle('active', this.isRotating);
        
        if (this.isRotating) {
            this.rotationInterval = setInterval(() => {
                this.viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.001);
            }, 16);
        } else {
            clearInterval(this.rotationInterval);
        }
    }

    searchLocation() {
        const input = document.getElementById('searchInput') as HTMLInputElement;
        if(!input) return;
        const query = input.value.toLowerCase().trim();
        if (!query) return;

        const results = Object.entries(LOCATIONS).filter(([name]) => 
            name.toLowerCase().includes(query)
        );

        const container = document.getElementById('searchResults');
        if(!container) return;
        container.innerHTML = '';

        if (results.length === 0) {
            container.innerHTML = '<div class="search-result-item">No encontrado</div>';
            return;
        }

        results.forEach(([name, coords]) => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.textContent = name;
            div.addEventListener('click', () => {
                this.flyToLocation(name, coords);
                container.innerHTML = '';
            });
            container.appendChild(div);
        });
    }

    flyToLocation(name: string, coords: any) {
        const Cesium = (window as any).Cesium;
        if (this.markerEntity) {
            this.viewer.entities.remove(this.markerEntity);
        }

        this.markerEntity = this.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(coords.lon, coords.lat),
            point: {
                pixelSize: 15,
                color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 3
            },
            label: {
                text: name.split(',')[0],
                font: 'bold 14px Inter, sans-serif',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 3,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -10)
            }
        });

        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(coords.lon, coords.lat, 3000000),
            duration: 2
        });

        this.showToast(name, 'success');
    }

    showToast(message: string, type = 'info') {
        const toast = document.getElementById('toast');
        if(!toast) return;
        toast.textContent = message;
        toast.className = type;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}
