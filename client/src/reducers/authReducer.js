import isEmpty from "../validation/isEmpty";
import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  admin: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        admin: action.payload
      };
    default:
      return state;
  }
}
