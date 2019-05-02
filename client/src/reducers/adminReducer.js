import {
  GET_EVENT_LOG,
  GET_ROOM_HISTORY,
  HISTORY_LOADING,
  GET_ADMIN_ROOMS,
  ADD_ROOM
} from "../actions/types";

const initialState = {
  eventLog: [],
  roomHistory: [],
  admin_rooms: [],
  admin_room: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HISTORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EVENT_LOG:
      return {
        ...state,
        eventLog: action.payload,
        loading: false
      };
    case GET_ROOM_HISTORY:
      return {
        ...state,
        roomHistory: action.payload,
        loading: false
      };
    case GET_ADMIN_ROOMS:
      return {
        ...state,
        admin_rooms: action.payload
      };
    case ADD_ROOM:
      return {
        ...state,
        admin_rooms: [action.payload, ...state.admin_rooms]
      };
    default:
      return state;
  }
}
