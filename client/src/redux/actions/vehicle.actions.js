import axiosIntance from "../../helpers/axios";
import { helperConstants, vehicleConstants } from "./constants";

// getAllVehicles
export const getAllVehicles = (queryString) => {
  return async (dispatch) => {
    dispatch({
      type: vehicleConstants.GET_VEHICLES_REQUEST,
    });

    await axiosIntance
      .get(`/vehicles?${queryString}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;

          console.log("res", res);

          dispatch({
            type: vehicleConstants.GET_VEHICLES_SUCCESS,
            payload: { data: data.data },
          });
        } else {
          dispatch({
            type: vehicleConstants.GET_VEHICLES_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: vehicleConstants.GET_VEHICLES_FAILURE,
          payload: {
            error: err,
          },
        });
      });
  };
};

// getMoreVehicles
export const getMoreVehicles = (queryString) => {
  return async (dispatch) => {
    dispatch({
      type: vehicleConstants.GET_MORE_VEHICLES_REQUEST,
    });

    await axiosIntance
      .get(`/vehicles?${queryString}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;

          console.log("res", res);

          dispatch({
            type: vehicleConstants.GET_MORE_VEHICLES_SUCCESS,
            payload: { data: data.data },
          });
        } else {
          dispatch({
            type: vehicleConstants.GET_MORE_VEHICLES_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: vehicleConstants.GET_MORE_VEHICLES_FAILURE,
          payload: {
            error: err,
          },
        });
      });
  };
};

// getVehicleDetails
export const getVehicleDetails = (vehicleId) => {
  return async (dispatch) => {
    dispatch({
      type: vehicleConstants.GET_VEHICLE_DETAILS_REQUEST,
    });

    await axiosIntance
      .get(`/vehicles/${vehicleId}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;

          console.log("res", res);

          dispatch({
            type: vehicleConstants.GET_VEHICLE_DETAILS_SUCCESS,
            payload: { data: data.data },
          });
        } else {
          dispatch({
            type: vehicleConstants.GET_VEHICLE_DETAILS_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: vehicleConstants.GET_VEHICLE_DETAILS_FAILURE,
          payload: {
            error: err,
          },
        });
      });
  };
};

// patchVehicleDetails
export const patchVehicleDetails = (vehicleId, data) => {
  return async (dispatch) => {
    dispatch({
      type: vehicleConstants.PATCH_VEHICLE_REQUEST,
    });

    await axiosIntance
      .patch(`/vehicles/${vehicleId}`, data)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;

          console.log("res", res);

          dispatch({
            type: vehicleConstants.PATCH_VEHICLE_SUCCESS,
            payload: { data: data.data },
          });
        } else {
          dispatch({
            type: vehicleConstants.PATCH_VEHICLE_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: vehicleConstants.PATCH_VEHICLE_FAILURE,
          payload: {
            error: err,
          },
        });
      });
  };
};

// postVehicle
export const postVehicle = (data) => {
  return async (dispatch) => {
    dispatch({
      type: vehicleConstants.POST_VEHICLE_REQUEST,
    });

    await axiosIntance
      .post(`/vehicles`, data)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res;

          console.log("res", res);

          dispatch({
            type: vehicleConstants.POST_VEHICLE_SUCCESS,
            payload: { data: data.data },
          });
        } else {
          dispatch({
            type: vehicleConstants.POST_VEHICLE_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: vehicleConstants.POST_VEHICLE_FAILURE,
          payload: {
            error: err,
          },
        });
      });
  };
};

// resetSuccess
export const resetSuccess = () => {
  return async (dispatch) => {
    dispatch({
      type: vehicleConstants.RESET_ALL_SUCCESS,
    });
  };
};
