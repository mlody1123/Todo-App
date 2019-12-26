import axios from "axios";
import {
  GET_ERRORS,
  GET_ITEMS,
  LIST_LOADING,
  DELETE_ITEM,
  CLEAR_ITEMS,
  UPDATE_STATUS,
  CHANGE_FILTER
} from "./types";

//TODO: Clear list in store after logout

export const addItem = itemData => dispatch => {
  axios.post("/api/todo/add", itemData).then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );
};

export const getItems = () => dispatch => {
  dispatch(setListLoading());
  axios
    .get("/api/todo")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteItem = idItem => dispatch => {
  axios
    .delete(`/api/todo/${idItem}`)
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const changeStatus = idItem => async dispatch => {
  try {
    // dispatch(setListLoading());

    const res = await axios.post(`/api/todo/active/${idItem}`);
    dispatch({ type: UPDATE_STATUS, payload: idItem });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const clearItems = () => {
  return {
    type: CLEAR_ITEMS,
    payload: null
  };
};

export const changeFilter = sort => {
  return {
    type: CHANGE_FILTER,
    payload: sort
  };
};

export const setListLoading = () => {
  return {
    type: LIST_LOADING
  };
};
