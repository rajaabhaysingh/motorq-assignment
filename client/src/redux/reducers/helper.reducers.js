/* eslint-disable import/no-anonymous-default-export */
import { helperConstants } from "../actions/constants";

const initialState = {
  themeName: "light",
  marginTop: false,
  queryString: "",
  addProduct: false,
  page: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case helperConstants.THEME_CHANGE_REQUEST:
      state = {
        ...state,
        themeName: action.payload.themeName,
      };
      break;

    case helperConstants.MARGIN_CHANGE_REQUEST:
      state = {
        ...state,
        marginTop: action.payload.marginTop,
      };
      break;

    case helperConstants.FILTER_CHANGE_REQUEST:
      state = {
        ...state,
        queryString: action.payload.queryString,
      };
      break;

    case helperConstants.ADD_VEHICLE_CHANGE_REQUEST:
      state = {
        ...state,
        addProduct: action.payload.value,
      };
      break;

    case helperConstants.PAGE_CHANGE_REQUEST:
      state = {
        ...state,
        page: action.payload.page,
      };
      break;

    default:
      break;
  }

  return state;
};
