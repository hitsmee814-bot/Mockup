"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import { Location } from "./types"
import { useEffect, useRef } from "react"

function numberedIcon(n: number) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:28px;height:28px;border-radius:50%;
      background:#3FB8FF;color:#fff;
      display:flex;align-items:center;justify-content:center;
      font-weight:800;font-size:12px;font-family:sans-serif;
      border:2.5px solid #fff;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
    ">${n}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  })
}

function FitBounds({ locations }: { locations: Location[] }) {
  const map = useMap()
  useEffect(() => {
    if (locations.length) {
      const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]))
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 })
    }
  }, [locations, map])
  return null
}

function AutoOpenPopup() {
  const markerRef = useRef<L.Marker | null>(null)
  const map = useMap()
  useEffect(() => {
    // small delay so map tiles load first
    const t = setTimeout(() => markerRef.current?.openPopup(), 300)
    return () => clearTimeout(t)
  }, [map])
  return null
}

function MarkerWithAutoPopup({ loc, index }: { loc: Location; index: number }) {
  const markerRef = useRef<L.Marker | null>(null)
  const map = useMap()

  useEffect(() => {
    const t = setTimeout(() => markerRef.current?.openPopup(), 400 + index * 150)
    return () => clearTimeout(t)
  }, [map, index])

  return (
    <Marker
      position={[loc.lat, loc.lng]}
      icon={numberedIcon(index + 1)}
      ref={markerRef}
    >
      <Popup closeButton={false} autoPan={false}>
        <div style={{ minWidth: 140, padding: "2px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{
              width: 20, height: 20, borderRadius: "50%",
              background: "#3FB8FF", color: "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 800, flexShrink: 0,
            }}>{index + 1}</span>
            <strong style={{ fontSize: 12, color: "#1a1a2e" }}>{loc.name}</strong>
          </div>
          {loc.description && (
            <p style={{ fontSize: 11, color: "#64748b", margin: "4px 0 0 26px", lineHeight: 1.4 }}>
              {loc.description}
            </p>
          )}
        </div>
      </Popup>
    </Marker>
  )
}

interface Props {
  locations: Location[]
}

export default function LeafletMap({ locations }: Props) {
  if (!locations.length) return null

  const center: [number, number] = [
    locations.reduce((s, l) => s + l.lat, 0) / locations.length,
    locations.reduce((s, l) => s + l.lng, 0) / locations.length,
  ]

  return (
    <div style={{ height: 380, width: "100%" }}>
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 14px !important;
          box-shadow: 0 4px 20px rgba(63,184,255,0.18), 0 1px 4px rgba(0,0,0,0.08) !important;
          border: 1px solid #3FB8FF30 !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 10px 12px !important;
          font-family: inherit !important;
        }
        .leaflet-popup-tip {
          box-shadow: 0 2px 8px rgba(63,184,255,0.12) !important;
          border: 1px solid #3FB8FF20 !important;
        }
      `}</style>
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", borderRadius: 16 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds locations={locations} />
        {locations.map((loc, i) => (
          <MarkerWithAutoPopup key={loc.name} loc={loc} index={i} />
        ))}
      </MapContainer>
    </div>
  )
}
