import { vehicleConstants } from "../actions/constants";

const initialState = {
  getVehiclesLoading: false,
  getVehiclesData: [],
  getVehiclesSuccessful: false,
  getVehiclesError: null,
  getMoreVehiclesLoading: false,
  getVehicleDetailsLoading: false,
  getVehicleDetailsData: {},
  getVehicleDetailsSuccessful: false,
  getVehicleDetailsError: null,
  patchVehicleLoading: false,
  patchVehicleData: {},
  patchVehicleSuccessful: false,
  patchVehicleError: null,
  postVehicleLoading: false,
  postVehicleData: {},
  postVehicleSuccessful: false,
  postVehicleError: null,
};

// updateVehiclesData
const findAndUpdateVehiclesData = (newData, oldDataArray) => {
  return oldDataArray.map((vehicle) =>
    vehicle._id === newData._id ? newData : vehicle
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case vehicleConstants.GET_VEHICLES_REQUEST:
      state = {
        ...state,
        getVehiclesLoading: true,
        getVehiclesError: null,
      };
      break;

    case vehicleConstants.GET_VEHICLES_SUCCESS:
      state = {
        ...state,
        getVehiclesData: action.payload.data,
        getVehiclesLoading: false,
        getVehiclesSuccessful: true,
        getVehiclesError: null,
      };
      break;

    case vehicleConstants.GET_VEHICLES_FAILURE:
      state = {
        ...state,
        getVehiclesData: [],
        getVehiclesLoading: false,
        getVehiclesSuccessful: false,
        getVehiclesError: action.payload.error,
      };
      break;

    case vehicleConstants.GET_VEHICLE_DETAILS_REQUEST:
      state = {
        ...state,
        getVehicleDetailsLoading: true,
        getVehicleDetailsError: null,
      };
      break;

    case vehicleConstants.GET_VEHICLE_DETAILS_SUCCESS:
      state = {
        ...state,
        getVehicleDetailsData: action.payload.data,
        getVehicleDetailsLoading: false,
        getVehicleDetailsSuccessful: true,
        getVehicleDetailsError: null,
      };
      break;

    case vehicleConstants.GET_VEHICLE_DETAILS_FAILURE:
      state = {
        ...state,
        getVehicleDetailsData: {},
        getVehicleDetailsLoading: false,
        getVehicleDetailsSuccessful: false,
        getVehicleDetailsError: action.payload.error,
      };
      break;

    // patch
    case vehicleConstants.PATCH_VEHICLE_REQUEST:
      state = {
        ...state,
        patchVehicleLoading: true,
        patchVehicleError: null,
      };
      break;

    case vehicleConstants.PATCH_VEHICLE_SUCCESS:
      state = {
        ...state,
        patchVehicleData: action.payload.data,
        getVehicleDetailsData: action.payload.data,
        getVehiclesData: findAndUpdateVehiclesData(
          action.payload.data,
          state.getVehiclesData
        ),
        patchVehicleLoading: false,
        patchVehicleSuccessful: true,
        patchVehicleError: null,
      };
      break;

    case vehicleConstants.PATCH_VEHICLE_FAILURE:
      state = {
        ...state,
        patchVehicleData: {},
        patchVehicleLoading: false,
        patchVehicleSuccessful: false,
        patchVehicleError: action.payload.error,
      };
      break;

    // GET more vehicles
    case vehicleConstants.GET_MORE_VEHICLES_REQUEST:
      state = {
        ...state,
        getMoreVehiclesLoading: true,
      };
      break;

    case vehicleConstants.GET_MORE_VEHICLES_SUCCESS:
      state = {
        ...state,
        getVehiclesData: [...state.getVehiclesData, ...action.payload.data],
        getMoreVehiclesLoading: false,
      };
      break;

    case vehicleConstants.GET_MORE_VEHICLES_FAILURE:
      // state = {
      //   ...state,
      //   getVehiclesData: [],
      //   getVehiclesLoading: false,
      //   getVehiclesSuccessful: false,
      //   getVehiclesError: action.payload.error,
      // };
      break;

    // post
    case vehicleConstants.POST_VEHICLE_REQUEST:
      state = {
        ...state,
        postVehicleLoading: true,
        postVehicleError: null,
      };
      break;

    case vehicleConstants.POST_VEHICLE_SUCCESS:
      state = {
        ...state,
        postVehicleData: action.payload.data,
        getVehiclesData: [action.payload.data, ...state.getVehiclesData],
        postVehicleLoading: false,
        postVehicleSuccessful: true,
        postVehicleError: null,
      };
      break;

    case vehicleConstants.POST_VEHICLE_FAILURE:
      state = {
        ...state,
        postVehicleData: {},
        postVehicleLoading: false,
        postVehicleSuccessful: false,
        postVehicleError: action.payload.error,
      };
      break;

    // reset
    case vehicleConstants.RESET_ALL_SUCCESS:
      state = {
        ...state,
        patchVehicleSuccessful: false,
        postVehicleSuccessful: false,
      };
      break;

    default:
      break;
  }

  return state;
};
