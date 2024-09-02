"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type VenueMapProps = {
  lat: number | null;
  lng: number | null;
  name: string;
};

export default function VenueMap({ lat, lng, name }: VenueMapProps) {
  // Define a default location (e.g., New York City) if lat/lng is not provided or set to 0
  const defaultLocation = { lat: 40.7128, lng: -74.006 }; // New York City coordinates

  const centerLat = lat && lat !== 0 ? lat : defaultLocation.lat;
  const centerLng = lng && lng !== 0 ? lng : defaultLocation.lng;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {lat && lng && lat !== 0 && lng !== 0 && (
        <Marker position={[lat, lng]}>
          <Popup>{name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
