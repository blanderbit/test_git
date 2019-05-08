import * as actionTypes from "../actions/actionTypes";

const initialState = {
    halls: [],
    err: null,
    isLoading: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.LOAD_HALLS_INIT:
            return {
                ...state,
                isLoading: true
            };

        case actionTypes.LOAD_HALLS_SUCCES:
            return {
                ...state,
                halls: action.halls,
                isLoading: false
            };

        case actionTypes.LOAD_HALLS_FAIL:
            return {
                ...state,
                err: action.err,
                isLoading: false
            };

        case actionTypes.ERR_CONFIRM:
            return {
                ...state,
                err: null
            };

        default:
            return state;
    }
};

export default reducer;