import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: null,
  token: null,
  userId: null,
  err: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        email: action.email,
        userId: action.userId,
        loading: false
      };

    case actionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        email: action.email,
        loading: false
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        err: action.err,
        loading: false
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };

    default:
      return state;
  }
};

export default reducer;