import axios from "axios";

import {
  GET_EVENT_LOG,
  GET_ROOM_HISTORY,
  HISTORY_LOADING,
  GET_ADMIN_ROOMS,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// Get eventlog
export const getEventLog = () => dispatch => {
  dispatch(setHistoryLoading());
  axios
    .get("/api/eventlog")
    .then(res =>
      dispatch({
        type: GET_EVENT_LOG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENT_LOG,
        payload: null
      })
    );
};

// Get history
export const getRoomHistory = () => dispatch => {
  dispatch(setHistoryLoading());
  axios
    .get("/api/history")
    .then(res =>
      dispatch({
        type: GET_ROOM_HISTORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ROOM_HISTORY,
        payload: null
      })
    );
};

// Get current profile
export const getAdminRooms = () => dispatch => {
  axios
    .get("/api/room")
    .then(res =>
      dispatch({
        type: GET_ADMIN_ROOMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ADMIN_ROOMS,
        payload: null
      })
    );
};

// Add Room
export const addRoom = (roomData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/add-room", roomData)
    .then(res => history.push("/api/room"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Loading
export const setHistoryLoading = () => {
  return {
    type: HISTORY_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
