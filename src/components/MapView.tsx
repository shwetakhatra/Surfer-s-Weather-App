import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";

const RADIUS_METERS = 5000;

const ChangeView = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

interface City {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

interface MapViewProps {
  city?: City | null;
}

const MapView: React.FC<MapViewProps> = ({ city }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (city) {
      setPosition([city.latitude, city.longitude]);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    } else {
      console.warn("Geolocation not supported");
    }
  }, [city]);

  if (!position) return <div>Loading map...</div>;

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
    >
      <ChangeView center={position} zoom={6} />
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
      <Circle
        center={position}
        radius={RADIUS_METERS}
        pathOptions={{ fillColor: "blue", fillOpacity: 0.2, color: "blue" }}
      />
    </MapContainer>
  );
};

export default MapView;
