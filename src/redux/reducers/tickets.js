import * as actionTypes from "../actions/actionTypes";

// const initialState = []

const reducer = (state = [], action) => {
    switch (action.type) {

        case actionTypes.GET_TICKETS:
            return action.tickets;

        default:
            return state;
    }
};

export default reducer;