import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

// styling
import {
  makeStyles,
  IconButton,
  Button,
  Divider,
  Snackbar,
} from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// components
import Loader from "../../components/loader";
import MapSegment from "../../components/mapSegment";

// icons
import { Close, Edit } from "@material-ui/icons";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getVehicleDetails,
  patchVehicleDetails,
  resetSuccess,
} from "../../redux/actions";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    width: 300,
    margin: "16px 16px 16px 0",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      margin: "16px",
      width: "calc(100% - 32px)",
    },
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 99999,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.divider,
    },
  },
  img: {
    height: 120,
    width: "100%",
  },
  label: {
    width: 100,
  },
  headerText: {
    margin: "16px 0 8px 20px",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  mapWrapper: {
    height: 300,
    width: "100%",
  },
  footer: {
    justifySelf: "flex-end",
    width: "100%",
  },
}));

const EditViewVehicle = ({
  setAddEditPaneOpen,
  selectedVehicleId,
  isEditModeOn,
  setIsEditModeOn,
}) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const vehicles = useSelector((state) => state.vehicles);
  const dispatch = useDispatch();

  const initialEditState = {
    customerName: vehicles.getVehicleDetailsData?.customerName
      ? vehicles.getVehicleDetailsData.customerName
      : "",
    driver: vehicles.getVehicleDetailsData?.driver
      ? vehicles.getVehicleDetailsData.driver
      : "",
    office: vehicles.getVehicleDetailsData?.office
      ? vehicles.getVehicleDetailsData.office
      : "",
    licensePlate: vehicles.getVehicleDetailsData?.licensePlate
      ? vehicles.getVehicleDetailsData.licensePlate
      : "",
  };

  const [editModeData, setEditModeData] = React.useState(initialEditState);
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

  // keep loading new data on each row select
  React.useEffect(() => {
    dispatch(getVehicleDetails(selectedVehicleId));
    reinitInitialState();
  }, [selectedVehicleId]);

  // for success message
  React.useEffect(() => {
    if (vehicles.patchVehicleSuccessful && !isSnackbarOpen) {
      setIsSnackbarOpen(true);
      setIsEditModeOn(false);
    }

    // resolved snackbar popping up bug
    if (vehicles.patchVehicleSuccessful || vehicles.postVehicleSuccessful) {
      setTimeout(() => {
        dispatch(resetSuccess());
      }, 500);
    }
  }, [vehicles]);

  //   reinitInitialState
  const reinitInitialState = () => {
    setEditModeData(initialEditState);
  };

  //   handleInputChange
  const handleInputChange = (e) => {
    setEditModeData({
      ...editModeData,
      [e.target.name]: e.target.value,
    });
  };

  //   handleOnUpdate
  const handleOnUpdate = () => {
    dispatch(patchVehicleDetails(selectedVehicleId, editModeData));
  };

  // handleCancelUpdate
  const handleCancelUpdate = () => {
    setEditModeData(initialEditState);
    setIsEditModeOn(false);
  };

  return (
    <div className={cls.root}>
      {vehicles.getVehicleDetailsLoading ? (
        <Loader />
      ) : vehicles.getVehicleDetailsSuccessful ? (
        <>
          <IconButton
            size="small"
            aria-label="close details"
            className={cls.closeBtn}
            onClick={() => {
              setAddEditPaneOpen(false);
            }}
          >
            <Close color="action" />
          </IconButton>

          <div className={cls.mapWrapper}>
            <MapSegment
              lat={vehicles.getVehicleDetailsData?.status?.location?.lat ?? 0}
              long={vehicles.getVehicleDetailsData?.status?.location?.long ?? 0}
            />
          </div>
          <div className={cls.headerText}>Car details</div>
          <div className="pad-16">
            <div className="f mar-4">
              <span className={clsx(cls.label, globalCls.txtSmSec)}>VIN</span>
              <span className={globalCls.txtSmPri}>
                {vehicles.getVehicleDetailsData?.vin}
              </span>
            </div>
            <div className="f mar-4">
              <span className={clsx(cls.label, globalCls.txtSmSec)}>MMY</span>
              <span className={globalCls.txtSmPri}>
                {vehicles.getVehicleDetailsData?.mmy}
              </span>
            </div>
            <div className="f mar-4">
              <span className={clsx(cls.label, globalCls.txtSmSec)}>
                Customer
              </span>
              <span className={globalCls.txtSmPri}>
                {isEditModeOn ? (
                  <input
                    type="text"
                    name="customerName"
                    onChange={handleInputChange}
                    value={editModeData.customerName}
                  />
                ) : (
                  vehicles.getVehicleDetailsData?.customerName
                )}
              </span>
            </div>
            <div className="f mar-4">
              <span className={clsx(cls.label, globalCls.txtSmSec)}>
                Office
              </span>
              <span className={globalCls.txtSmPri}>
                {isEditModeOn ? (
                  <input
                    type="text"
                    name="office"
                    onChange={handleInputChange}
                    value={editModeData.office}
                  />
                ) : (
                  vehicles.getVehicleDetailsData?.office
                )}
              </span>
            </div>
            <div className="f mar-4">
              <span className={clsx(cls.label, globalCls.txtSmSec)}>
                Driver
              </span>
              <span className={globalCls.txtSmPri}>
                {isEditModeOn ? (
                  <input
                    type="text"
                    name="driver"
                    onChange={handleInputChange}
                    value={editModeData.driver}
                  />
                ) : (
                  vehicles.getVehicleDetailsData?.driver
                )}
              </span>
            </div>
            <div className="f mar-4">
              <span className={clsx(cls.label, globalCls.txtSmSec)}>
                License
              </span>
              <span className={globalCls.txtSmPri}>
                {isEditModeOn ? (
                  <input
                    type="text"
                    name="licensePlate"
                    onChange={handleInputChange}
                    value={editModeData.licensePlate}
                  />
                ) : (
                  vehicles.getVehicleDetailsData?.licensePlate
                )}
              </span>
            </div>

            <div className="f mar-4 mar_t-12">
              <span className={clsx(cls.label, globalCls.txtSmSec)}>
                Status
              </span>
              <div className="fcol">
                <div>
                  {vehicles.getVehicleDetailsData?.status?.ignition ? (
                    <div className="fc">
                      <span className={clsx(cls.label, globalCls.txtSmSec)}>
                        Ignition ON
                      </span>
                      <LocalFireDepartmentIcon color="warning" />
                    </div>
                  ) : (
                    <div className="fc">
                      <span className={clsx(cls.label, globalCls.txtSmSec)}>
                        Ignition OFF
                      </span>
                      <DirectionsCarIcon color="disabled" />
                    </div>
                  )}
                </div>
                <span className={globalCls.txtSmPri}>
                  <span className={clsx(cls.label, globalCls.txtSmSec)}>
                    Speed:
                  </span>
                  {vehicles.getVehicleDetailsData?.status?.speed > 120 ? (
                    <span className={clsx(globalCls.txtErr, "fwb mar_l-4")}>
                      {vehicles.getVehicleDetailsData?.status?.speed}
                    </span>
                  ) : vehicles.getVehicleDetailsData?.status?.speed > 80 ? (
                    <span className={clsx(globalCls.txtWarn, "fwb mar_l-4")}>
                      {vehicles.getVehicleDetailsData?.status?.speed}
                    </span>
                  ) : (
                    <span className={clsx(globalCls.txtSucc, "fwb mar_l-4")}>
                      {vehicles.getVehicleDetailsData?.status?.speed}
                    </span>
                  )}{" "}
                  km/h
                </span>
              </div>
            </div>
          </div>
          <div className="f1" />
          <div className={cls.footer}>
            <Divider className="w-100" />
            {isEditModeOn && (
              <div className="fend w-100 pad-16">
                <Button
                  size="small"
                  onClick={handleCancelUpdate}
                  variant="text"
                  disabled={vehicles.patchVehicleLoading}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  onClick={handleOnUpdate}
                  color="primary"
                  variant="outlined"
                  style={{ marginLeft: 16 }}
                  disabled={vehicles.patchVehicleLoading}
                >
                  {vehicles.patchVehicleLoading ? "Saving" : "Update"}
                </Button>
              </div>
            )}
            {!isEditModeOn && (
              <div className="pad-16 w-100">
                <Button
                  className="w-100"
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    setIsEditModeOn(true);
                    reinitInitialState();
                  }}
                >
                  UPDATE DETAILS
                </Button>
              </div>
            )}
          </div>
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={() => setIsSnackbarOpen(false)}
            message="Updated successfully!"
          />
        </>
      ) : (
        <Alert className="f1" severity="error">
          <AlertTitle>SOME ERROR OCCURED</AlertTitle>
          Please refresh this page after sometime.
        </Alert>
      )}
    </div>
  );
};

export default EditViewVehicle;
