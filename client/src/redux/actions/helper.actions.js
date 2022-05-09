import { helperConstants } from "./constants";

// themeAction
export const themeAction = (themeName) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.THEME_CHANGE_REQUEST,
      payload: {
        themeName,
      },
    });
  };
};

// changeMargin
export const changeMargin = (marginTop) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.MARGIN_CHANGE_REQUEST,
      payload: {
        marginTop,
      },
    });
  };
};

// changeFilter
export const changeFilter = (queryString) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.FILTER_CHANGE_REQUEST,
      payload: {
        queryString,
      },
    });
  };
};

// changePage
export const changePage = (page) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.PAGE_CHANGE_REQUEST,
      payload: {
        page,
      },
    });
  };
};

// toggleAddVehicle
export const toggleAddVehicle = (value) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.ADD_VEHICLE_CHANGE_REQUEST,
      payload: {
        value,
      },
    });
  };
};
