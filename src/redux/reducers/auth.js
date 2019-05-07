import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: null,
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.AUTH_START:
    //   return {
    //     ...state,
    //     loading: true
    //   };

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

    // case actionTypes.AUTH_FAIL:
    //   return {
    //     ...state,
    //     error: action.error,
    //     loading: false
    //   };

    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };

    // case actionTypes.SET_AUTH_REDIRECT_PATH:
    //   return {
    //     ...state,
    //     authRedirectPath: action.path
    //   };

    default:
      return state;
  }
};

export default reducer;