import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicles } from "../../redux/actions";

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
  const globalCls = useGlobalStyles();

  const helper = useSelector((state) => state.helper);
  const vehicles = useSelector((state) => state.vehicles);
  const dispatch = useDispatch();

  // loadin categories on initial render
  React.useEffect(() => {
    dispatch(getAllVehicles(helper.queryString));
  }, [helper.queryString]);

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
