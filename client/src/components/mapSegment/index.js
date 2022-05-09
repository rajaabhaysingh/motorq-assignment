import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";

// assets
import markerIcon from "../../assets/img/marker.png";

const marker = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 25],
});

const MapSegment = ({ lat, long }) => {
  return (
    <MapContainer center={[lat, long]} zoom={5}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, long]} icon={marker} />
    </MapContainer>
  );
};

export default MapSegment;
