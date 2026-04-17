'use client';

import { useEffect } from 'react';
import { TectonicSimulator } from '../lib/app';

export default function SimulatorInitializer() {
  useEffect(() => {
    // We instantiate the logic here once it's rendered on the client, 
    // ensuring `window.Cesium` is available and DOM elements exist
    const initializeApp = () => {
        if ((window as any).Cesium && !(window as any).simulator) {
            const container = document.getElementById('cesiumContainer');
            if(container) {
                (window as any).simulator = new TectonicSimulator();
            } else {
                setTimeout(initializeApp, 100);
            }
        } else if (!(window as any).Cesium) {
            setTimeout(initializeApp, 100); // retry if script not loaded yet
        }
    };
    initializeApp();

    // cleanup is optional, but since this relies on Cesium viewer id tying, we might leave it.
  }, []);

  return null;
}
