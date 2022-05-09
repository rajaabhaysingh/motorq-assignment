import React, { useState, useEffect, useCallback } from "react";
import L from "leaflet";
import useSupercluster from "use-supercluster";
import { Marker, useMap, Tooltip } from "react-leaflet";

// assets
import markerIcon from "../../assets/img/marker.png";

// components
import HoverCard from "../../components/hoverCard";

const icons = {};

// helper function to get cluster icon
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};

const marker = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 25],
});

const VehicleCluster = ({ data, setSelectedVehicleId }) => {
  const maxZoom = 22;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  // get map bounds
  const updateMap = () => {
    const bounds = map.getBounds();
    setBounds([
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
      bounds.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  };

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  React.useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  //   points
  const points = data.map((vehicle) => ({
    type: "Feature",
    properties: {
      cluster: false,
      data: vehicle,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(vehicle.status?.location?.long),
        parseFloat(vehicle.status?.location?.lat),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  return (
    <>
      {clusters.map((cluster, i) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;

        // the point may be either a cluster or a vehicle point
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${i}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        // we have a single point (vehicle) to render
        return (
          <Marker
            key={i}
            position={[latitude, longitude]}
            icon={marker}
            eventHandlers={{
              click: () => {
                setSelectedVehicleId(cluster.properties.data?._id);
              },
            }}
          >
            <Tooltip>
              <HoverCard cluster={cluster} />
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
};

export default VehicleCluster;
