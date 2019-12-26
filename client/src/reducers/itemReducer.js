import {
  GET_ITEMS,
  LIST_LOADING,
  DELETE_ITEM,
  CLEAR_ITEMS,
  UPDATE_STATUS,
  CHANGE_FILTER
} from "../actions/types";

const initialState = {
  loading: false,
  filter: "all",
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case UPDATE_STATUS:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload ? { ...item, active: !item.active } : item
        ),
        loading: false
      };

    case LIST_LOADING:
      return {
        ...state,
        loading: true
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: action.payload
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}
