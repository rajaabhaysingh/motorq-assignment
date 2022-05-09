import React from "react";
import clsx from "clsx";

// components
import Header from "../../components/header";
import Map from "./Map";
import EditViewVehicle from "../vehicles/EditViewVehicle";

// styling
import {
  Button,
  makeStyles,
  Modal,
  Snackbar,
  TextField,
} from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddVehicle,
  postVehicle,
  changeFilter,
} from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    display: "flex",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "400px",
    margin: "auto",
  },
  form: {
    borderRadius: 8,
    padding: "32px",
    backgroundColor: theme.palette.background.bg,
    display: "flex",
    flexDirection: "column",
    margin: 16,
  },
  header: {
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    marginBottom: 8,
  },
  input: {
    marginTop: 12,
    flex: 1,
  },
}));

const Home = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const vehicles = useSelector((state) => state.vehicles);
  const dispatch = useDispatch();

  let initialNewVehicleState = {
    vin: "",
    customerName: "",
    driver: "",
    office: "",
    speed: "",
    latitude: "",
    longitude: "",
    ignition: false,
    licensePlate: "",
    mmy: "",
  };
  const [newVehicleState, setNewVehicleState] = React.useState(
    initialNewVehicleState
  );
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [addEditPaneOpen, setAddEditPaneOpen] = React.useState(false);
  const [isEditModeOn, setIsEditModeOn] = React.useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = React.useState("");

  // for success message
  React.useEffect(() => {
    if (vehicles.postVehicleSuccessful && !isSnackbarOpen) {
      setIsSnackbarOpen(true);
      dispatch(toggleAddVehicle(false));
    }
  }, [vehicles]);

  React.useEffect(() => {
    if (!addEditPaneOpen && selectedVehicleId) {
      setAddEditPaneOpen(true);
    }
  }, [selectedVehicleId]);

  // reset querystring on mount
  React.useEffect(() => {
    dispatch(changeFilter(""));
  }, []);

  // handleFormSubmit
  const handleFormSubmit = () => {
    const formData = {
      ...newVehicleState,
      lat: newVehicleState.latitude,
      long: newVehicleState.longitude,
    };
    dispatch(postVehicle(formData));
  };

  //   handleFormInputChange
  const handleFormInputChange = (e) => {
    setNewVehicleState({
      ...newVehicleState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={cls.root}>
      <Header helper={helper} />
      <div className={globalCls.bodyRoot}>
        <div className={clsx(globalCls.pclr_mobtb, "h-100 of_all_scr")}>
          <Map setSelectedVehicleId={setSelectedVehicleId} />
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
      <Modal
        open={helper.addProduct}
        className={cls.modal}
        onClose={() => {
          dispatch(toggleAddVehicle(false));
        }}
      >
        <form className={cls.form} onSubmit={handleFormSubmit}>
          <div className={cls.header}>Add new vehicle</div>
          <TextField
            size="small"
            className={cls.input}
            label="Customer's Name"
            variant="outlined"
            name="customerName"
            value={newVehicleState.customerName}
            onChange={handleFormInputChange}
            autoFocus
          />
          <TextField
            size="small"
            className={cls.input}
            label="Driver's Name"
            variant="outlined"
            name="driver"
            value={newVehicleState.driver}
            onChange={handleFormInputChange}
          />
          <div className="fc">
            <TextField
              size="small"
              className={cls.input}
              label="VIN"
              variant="outlined"
              name="vin"
              value={newVehicleState.vin}
              onChange={handleFormInputChange}
            />
            <TextField
              size="small"
              className={clsx(cls.input, globalCls.marL8)}
              label="MMY"
              variant="outlined"
              name="mmy"
              value={newVehicleState.mmy}
              onChange={handleFormInputChange}
            />
          </div>
          <div className="fc">
            <TextField
              size="small"
              className={cls.input}
              label="License Plate"
              variant="outlined"
              name="licensePlate"
              value={newVehicleState.licensePlate}
              onChange={handleFormInputChange}
            />
            <TextField
              size="small"
              className={clsx(cls.input, globalCls.marL8)}
              label="Speed"
              variant="outlined"
              name="speed"
              value={newVehicleState.speed}
              onChange={handleFormInputChange}
            />
          </div>
          <TextField
            size="small"
            className={cls.input}
            label="Office"
            variant="outlined"
            name="office"
            value={newVehicleState.office}
            onChange={handleFormInputChange}
          />
          <div className="fc">
            <TextField
              size="small"
              className={cls.input}
              label="Latitude"
              variant="outlined"
              name="latitude"
              value={newVehicleState.latitude}
              onChange={handleFormInputChange}
            />
            <TextField
              size="small"
              className={clsx(cls.input, globalCls.marL8)}
              label="Longitude"
              variant="outlined"
              name="longitude"
              value={newVehicleState.longitude}
              onChange={handleFormInputChange}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            className={globalCls.marT16}
            disabled={vehicles.postVehicleLoading}
          >
            {vehicles.postVehicleLoading ? "Saving" : "SUBMIT"}
          </Button>
        </form>
      </Modal>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        message="Added successfully!"
      />
    </div>
  );
};

export default Home;
