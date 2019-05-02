import { GET_ROOMS, GET_ROOM } from "../actions/types";
//import { SEND_MESSAGE } from "../actions/types";

const initialState = {
  rooms: [],
  room: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload
      };
    case GET_ROOM:
      return {
        ...state,
        room: action.payload
      };
    default:
      return state;
  }
}
