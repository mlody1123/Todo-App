import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import itemReducer from "./itemReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  item: itemReducer
});
