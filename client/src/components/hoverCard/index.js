import React from "react";
import clsx from "clsx";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// icons
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    display: "flex",
    flexDirection: "column",
    minWidth: "200px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    background: theme.palette.background.paper,
  },
}));

const HoverCard = ({ cluster }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  //   extracting vehicle data
  const { data } = cluster.properties;

  return (
    <div className={cls.root}>
      <div className={cls.cardHeader}>
        <div className="fcol">
          <div className={clsx(globalCls.txtMdPri, "fwb")}>
            {data.customerName}
          </div>
          <div className={globalCls.txtSmSec}>{data.licensePlate}</div>
        </div>
        {data.status?.ignition ? (
          <LocalFireDepartmentIcon color="warning" />
        ) : (
          <DirectionsCarIcon color="disabled" />
        )}
      </div>
      <div className="fbw pad-8">
        <div className="fcol">
          <div className={globalCls.txtSmSec}>VIN</div>
          <div className={globalCls.txtMdPriCol}>{data.vin}</div>
        </div>
        <div className="fcol">
          <div className={globalCls.txtSmSec}>Speed</div>
          <div className={globalCls.txtMdPri}>{data.status?.speed} km/h</div>
        </div>
      </div>
      <div className="pad-8">
        <span className={clsx(globalCls.txtSmSec)}>Driver:</span>
        <span className={clsx(globalCls.txtSmPri, "mar_l-8")}>
          {data.driver}
        </span>
      </div>
    </div>
  );
};

export default HoverCard;
