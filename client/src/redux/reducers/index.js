import { combineReducers } from "redux";
import helperReducer from "./helper.reducers";
import vehicleReducer from "./vehicle.reducers";

const rootReducer = combineReducers({
  helper: helperReducer,
  vehicles: vehicleReducer,
});

export default rootReducer;
