'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const SimulatorInitializer = dynamic(
  () => import('../components/SimulatorInitializer'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <SimulatorInitializer />

      {/* The 3D Cesium Map Container */}
      <div id="cesiumContainer"></div>
      
      {/* UI Overlay */}
      <div id="ui-container" className="h-screen w-screen relative">
          
          {/* Header Panel */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
              
              {/* Left Logo & Info Panel */}
              <div className="flex bg-[var(--color-card)]/80 backdrop-blur-md rounded-xl border border-[var(--border-color)] overflow-hidden shadow-2xl pointer-events-auto">
                  <div className="bg-[var(--color-primary)] p-4 flex items-center justify-center">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div className="p-3 pr-6 flex flex-col justify-center">
                      <h1 className="text-sm font-bold tracking-wide uppercase text-[var(--color-primary)] mb-0.5">Simulador Tectónico</h1>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                        <span className="text-xs font-semibold text-[var(--color-foreground)]" id="eraIndicator">Presente (0 Ma)</span>
                      </div>
                  </div>
              </div>

              {/* Top Right Controls & Search */}
              <div className="flex flex-col gap-2 pointer-events-auto items-end">
                <div className="flex gap-2">
                  <button id="btn-reset" className="hover-magnetic flex items-center justify-center w-10 h-10 bg-[var(--color-card)]/80 backdrop-blur-md rounded-lg border border-[var(--border-color)] text-[var(--color-foreground)] hover:bg-[var(--color-secondary)]/90 transition-colors shadow-lg" title="Vista inicial">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                  </button>
                  <button id="btn-rotate" className="hover-magnetic flex items-center justify-center w-10 h-10 bg-[var(--color-card)]/80 backdrop-blur-md rounded-lg border border-[var(--border-color)] text-[var(--color-foreground)] hover:bg-[var(--color-secondary)]/90 transition-colors shadow-lg" title="Auto-rotar">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
                  </button>
                  <button id="btn-layers" className="hover-magnetic flex items-center justify-center w-10 h-10 bg-[var(--color-card)]/80 backdrop-blur-md rounded-lg border border-[var(--border-color)] text-[var(--color-foreground)] hover:bg-[var(--color-secondary)]/90 transition-colors shadow-lg" title="Capas">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg>
                  </button>
                </div>
                
                <div id="searchPanel" className="bg-[var(--color-card)]/80 backdrop-blur-md rounded-lg border border-[var(--border-color)] shadow-xl p-2 flex flex-col w-64 max-h-[300px]">
                  <div className="flex items-center gap-2 bg-[var(--color-background)] rounded border border-[var(--border-color)] p-1">
                      <input type="text" id="searchInput" placeholder="Buscar ciudad..." className="bg-transparent border-none outline-none text-xs text-[var(--color-foreground)] w-full px-2" />
                      <button id="btn-search" className="p-1.5 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary)]/80 transition-colors">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                      </button>
                  </div>
                  <div className="flex-1 overflow-y-auto mt-2 text-xs flex flex-col gap-1" id="searchResults"></div>
                </div>
              </div>
          </div>

          {/* Left Layers Panel (Data Dense) */}
          <div className="pointer-events-auto absolute left-4 top-24 bottom-[100px] w-64 bg-[var(--color-card)]/80 backdrop-blur-md border border-[var(--border-color)] rounded-xl shadow-2xl flex flex-col transition-all duration-300" id="layersPanel">
              <div className="flex items-center justify-between p-3 border-b border-[var(--border-color)]">
                  <h3 className="text-xs uppercase font-bold text-[var(--color-muted-foreground)] tracking-wider">Dashboard de Capas</h3>
                  <button id="closeLayers" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"><svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
                  {[
                    { id: 'layer-coastlines', label: 'Líneas de costa', checked: true },
                    { id: 'layer-plates', label: 'Polígonos de placas', checked: false },
                    { id: 'layer-boundaries', label: 'Límites de placas', checked: false },
                    { id: 'layer-vectors', label: 'Vectores de velocidad', checked: false },
                    { id: 'layer-labels', label: 'Etiquetas de nomenclatura', checked: false }
                  ].map((layer, idx) => (
                    <label key={idx} className="custom-checkbox flex items-center justify-between p-2 rounded hover:bg-[var(--color-secondary)]/50 cursor-pointer border border-transparent hover:border-[var(--border-color)] transition-colors">
                        <span className="text-xs font-medium text-[var(--color-foreground)] select-none">{layer.label}</span>
                        <div className="relative w-8 h-4 rounded-full bg-[var(--color-muted)] border border-[var(--border-color)] transition-colors duration-200">
                          <input type="checkbox" id={layer.id} className="sr-only peer" defaultChecked={layer.checked} />
                          <div className="absolute left-[2px] top-[2px] w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-4 peer-checked:bg-[var(--color-primary)]"></div>
                        </div>
                    </label>
                  ))}
                  
                  <div className="mt-4 p-3 rounded-lg border border-[var(--border-color)] bg-[var(--color-background)]/50">
                      <p className="text-[10px] text-[var(--color-muted-foreground)] leading-relaxed">
                          La carga de datos geológicos en tiempo real puede afectar el rendimiento visual. Múltiples capas vectoriales se procesan mediante WebGL.
                      </p>
                  </div>
              </div>
          </div>

          {/* Right Info Panel (Data Dense) */}
          <div className="pointer-events-auto absolute right-4 top-[170px] bottom-[100px] w-72 bg-[var(--color-card)]/80 backdrop-blur-md border border-[var(--border-color)] rounded-xl shadow-2xl flex flex-col transition-all duration-300 transform opacity-100 translates-x-0" id="infoPanel">
              <div className="flex items-center justify-between p-3 border-b border-[var(--border-color)]">
                  <h3 id="infoTitle" className="text-xs uppercase font-bold text-[var(--color-primary)] tracking-wider">Presente</h3>
                  <button id="closeInfo" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"><svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                  <p id="infoDesc" className="text-xs text-[var(--color-foreground)] leading-relaxed pb-4 border-b border-[var(--border-color)]">Configuración actual de los continentes.</p>
                  
                  <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1v4h-2V5z"/></svg>
                          <h4 className="text-[10px] uppercase font-bold tracking-widest">Clima Global</h4>
                      </div>
                      <div className="bg-[var(--color-background)]/60 rounded p-2 border border-[var(--border-color)]">
                        <p id="infoClimate" className="text-[11px] text-[var(--color-foreground)] font-medium">Período interglaciar con casquetes polares.</p>
                      </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="8.5" cy="9.5" r="1.5"/><circle cx="15.5" cy="9.5" r="1.5"/><path d="M12 16c-1.48 0-2.75-.81-3.45-2H8.5c.78 1.94 2.73 3.3 5 3.3s4.22-1.36 5-3.3h-2.05c-.7 1.19-1.97 2-3.45 2z"/></svg>
                          <h4 className="text-[10px] uppercase font-bold tracking-widest">Biodiversidad Dominante</h4>
                      </div>
                      <div className="bg-[var(--color-background)]/60 rounded p-2 border border-[var(--border-color)]">
                        <p id="infoFauna" className="text-[11px] text-[var(--color-foreground)] font-medium">Era de los mamíferos.</p>
                      </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                          <h4 className="text-[10px] uppercase font-bold tracking-widest">Hitos Clave</h4>
                      </div>
                      <div className="bg-[var(--color-background)]/60 rounded p-2 border border-[var(--border-color)] mb-2">
                        <p id="infoEvents" className="text-[11px] text-[var(--color-foreground)] font-medium">Civilización humana.</p>
                      </div>
                  </div>

                  <a id="infoWiki" href="https://es.wikipedia.org/wiki/Holoceno" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] text-[var(--color-foreground)] font-bold text-xs rounded transition-colors hover-magnetic border border-[var(--color-primary)]/30">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                      Leer más en Wikipedia
                  </a>
              </div>
          </div>

          {/* Bottom Timeline Analytics Panel */}
          <div className="pointer-events-auto absolute bottom-4 left-4 right-4 bg-[var(--color-card)]/85 backdrop-blur-xl border border-[var(--border-color)] rounded-xl shadow-2xl p-4 flex items-center gap-6">
              
              <button id="btn-play-timeline" className="hover-magnetic flex-shrink-0 w-12 h-12 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white rounded-full flex items-center justify-center shadow-lg transition-colors outline-none cursor-pointer border-[3px] border-[var(--color-primary)]/30 backdrop-blur">
                  <svg id="icon-play" viewBox="0 0 24 24" className="w-5 h-5 fill-current ml-1"><path d="M8 5v14l11-7z"/></svg>
                  <svg id="icon-pause" viewBox="0 0 24 24" className="w-5 h-5 fill-current hidden"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              </button>
              
              <div className="flex-1 flex flex-col relative w-full h-full pt-1">
                  {/* Timeline labels mapped geometrically */}
                  <div className="flex justify-between absolute w-full top-[-10px]">
                      {['-350 Ma', '-300', '-250', '-200', '-150', '-100', '-50', '0'].map((label, i) => (
                        <span key={i} data-era={i} className={`timeline-labels text-[10px] font-mono cursor-pointer transition-colors ${i === 7 ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}>{label}</span>
                      ))}
                  </div>
                  
                  <div className="relative mt-5 w-full">
                      <input type="range" id="timeline" min="0" max="7" defaultValue="7" step="1" className="timeline-slider absolute w-full z-10" />
                      
                      <div className="absolute w-full top-[1px] flex justify-between pointer-events-none z-0 px-2">
                        {[0,1,2,3,4,5,6,7].map((marker) => (
                            <div key={marker} data-index={marker} className={`marker w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/50 ${marker === 7 ? 'opacity-0' : ''}`}></div>
                        ))}
                      </div>
                  </div>
              </div>
          </div>

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-xl transition-all duration-500 hidden" id="loading">
              <div className="flex flex-col items-center bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--border-color)] shadow-xl max-w-sm w-full text-center">
                  <div className="text-4xl mb-4 animate-bounce">🌍</div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2">Inicializando</h2>
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-6">Cargando datos vectoriales geológicos...</p>
                  
                  <div className="w-full h-1 bg-[var(--color-muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--color-primary)] transition-all ease-out duration-200 w-1/4" id="progress"></div>
                  </div>
              </div>
          </div>

          <div id="toast"></div>
      </div>
    </>
  );
}
