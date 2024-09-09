"use client";

import { useEffect, useState } from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";

type Props = {
  location: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    lat?: number | null;
    lng?: number | null;
  };
};

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "0.5rem",
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
};

const libraries: Libraries = ["marker"];

type Coordinates = {
  lat: number;
  lng: number;
};

export const LocationMap = ({ location }: Props) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

  if (!API_KEY || !MAP_ID) {
    throw new Error(
      "Please define the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY and NEXT_PUBLIC_GOOGLE_MAP_ID environment variables inside .env"
    );
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const [mapCenter, setMapCenter] = useState<Coordinates | null>(null);
  const [geocodeError, setGeocodeError] = useState<string | null>(null); // State to handle geocode errors

  const isValidCoordinate = (
    coord: number | null | undefined
  ): coord is number => coord !== null && coord !== undefined && coord !== 0;

  useEffect(() => {
    if (!isLoaded) return;

    if (isValidCoordinate(location.lat) && isValidCoordinate(location.lng)) {
      setMapCenter({ lat: location.lat, lng: location.lng });
      setGeocodeError(null); // Clear any previous errors
    } else if (location.address || location.city || location.country) {
      const fullAddress = `${location.address || ""}, ${location.city || ""}, ${
        location.zip || ""
      }, ${location.country || ""}`;
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          setMapCenter(results[0].geometry.location.toJSON());
          setGeocodeError(null); // Clear any errors on success
        } else {
          console.error("Geocoding failed:", status);
          setGeocodeError("Geocoding failed: No valid location found.");
        }
      });
    } else {
      setGeocodeError("No location information provided.");
    }
  }, [
    isLoaded,
    location.lat,
    location.lng,
    location.address,
    location.city,
    location.zip,
    location.country,
  ]);

  useEffect(() => {
    const initializeMap = async () => {
      if (mapCenter && isLoaded) {
        const map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: mapCenter,
            zoom: 10,
            mapId: MAP_ID,
          }
        );

        const { AdvancedMarkerElement } = (await (
          google.maps as any
        ).importLibrary("marker")) as any;

        new AdvancedMarkerElement({
          map: map,
          position: mapCenter,
          title: location.address,
        });
      }
    };

    initializeMap();
  }, [mapCenter, isLoaded, location.address, MAP_ID]);

  if (!isLoaded) return <div>Loading map...</div>;

  if (geocodeError) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
        <p>{geocodeError}</p>
      </div>
    );
  }

  if (!mapCenter) return null;

  return <div id="map" style={containerStyle}></div>;
};
