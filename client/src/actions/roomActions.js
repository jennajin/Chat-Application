import axios from "axios";

import { GET_ROOMS, GET_ROOM } from "./types";

// Get Rooms
export const getRooms = () => dispatch => {
  axios
    .get("/room")
    .then(res =>
      dispatch({
        type: GET_ROOMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ROOMS,
        payload: null
      })
    );
};

// Get Room
export const getRoom = id => dispatch => {
  axios
    .get(`/room/${id}`)
    .then(res =>
      dispatch({
        type: GET_ROOM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ROOM,
        payload: null
      })
    );
};
