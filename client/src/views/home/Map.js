import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

// styling
import { makeStyles } from "@material-ui/core";

// redux
import { useSelector } from "react-redux";

// components
import VehicleCluster from "./VehicleCluster";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    flex: 1,
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
    height: "calc(100% - 32px)",
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const Map = ({ setSelectedVehicleId }) => {
  const cls = useStyles();
  const vehicles = useSelector((state) => state.vehicles);

  return (
    <div className={cls.root}>
      <MapContainer center={[23, 76]} zoom={6}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <VehicleCluster
          data={vehicles.getVehiclesData}
          setSelectedVehicleId={setSelectedVehicleId}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
