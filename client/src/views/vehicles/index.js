import React from "react";
import clsx from "clsx";

// components
import Header from "../../components/header";
import VehicleTable from "./VehicleTable";
import EditViewVehicle from "./EditViewVehicle";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// assets

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  changeFilter,
  changePage,
  getAllVehicles,
  getMoreVehicles,
} from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const Vehicles = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const vehicles = useSelector((state) => state.vehicles);
  const dispatch = useDispatch();

  const [addEditPaneOpen, setAddEditPaneOpen] = React.useState(false);
  const [isEditModeOn, setIsEditModeOn] = React.useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = React.useState(""); // for pagination

  // loading vehicles renders
  React.useEffect(() => {
    dispatch(getAllVehicles(helper.queryString));
    if (addEditPaneOpen) {
      setAddEditPaneOpen(false);
    }
  }, [helper.queryString]);

  // handlePageChange
  const handlePageChange = () => {
    let params = new URLSearchParams(helper.queryString);
    params.append("page", helper.page + 1);

    dispatch(getMoreVehicles(params.toString(), helper.page + 1));
    dispatch(changePage(helper.page + 1));
  };

  return (
    <div className={cls.root}>
      <Header helper={helper} />
      <div className={globalCls.bodyRoot}>
        <div className={clsx(globalCls.pclr_mobtb, "h-100 of_all_scr")}>
          <VehicleTable
            vehicleState={vehicles}
            setAddEditPaneOpen={setAddEditPaneOpen}
            setSelectedVehicleId={setSelectedVehicleId}
            setIsEditModeOn={setIsEditModeOn}
            handlePageChange={handlePageChange}
          />
          {addEditPaneOpen && (
            <EditViewVehicle
              setAddEditPaneOpen={setAddEditPaneOpen}
              selectedVehicleId={selectedVehicleId}
              isEditModeOn={isEditModeOn}
              setIsEditModeOn={setIsEditModeOn}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
