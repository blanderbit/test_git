import * as actionTypes from "../actions/actionTypes";

const initialState = [
    {
        title: '',
        description: '',

    }
]

const reducer = (state = { initialState }, action) => {

    switch (action.type) {

        case actionTypes.LOAD_HALLS:
            console.log(action.halls);

            return action.halls;

        default:
            return state;
    }
};

export default reducer;