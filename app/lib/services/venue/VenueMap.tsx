"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type VenueMapProps = {
  lat: number | null;
  lng: number | null;
  name: string;
};

export default function VenueMap({ lat, lng, name }: VenueMapProps) {
  const defaultLocation = { lat: 40.7128, lng: -74.006 };

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
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>{name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
