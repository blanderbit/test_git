import * as actionTypes from "../actions/actionTypes";

const initialState = {
    tickets: [],
    err: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_TICKETS:
            return {
                ...state,
                tickets: action.tickets
            };

        case actionTypes.GET_TICKETS_FAIL:
            return {
                ...state,
                err: action.err
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