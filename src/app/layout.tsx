import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Simulador de Placas Tectónicas",
  description: "Explora la Tierra desde Pangea hasta el presente con datos geológicos reales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://cesium.com/downloads/cesiumjs/releases/1.112/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
        {/* Load Cesium.js before interactive to attach it to window.Cesium before React mounts the map component */}
        <Script 
          src="https://cesium.com/downloads/cesiumjs/releases/1.112/Build/Cesium/Cesium.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
