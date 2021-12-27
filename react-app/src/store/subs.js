import { csrfFetch } from "./csrf.js";

const GET_SUBS = 'session/GetSubs'

const GetSubs = (subs) => {
    return {
        type: GET_SUBS,
        payload: subs
    }
}

export const GetAllSubs = () => async (dispatch) => {
    const response = await csrfFetch(`/api/subs`);
    if (response.ok) {
      const data = await response.json();
      dispatch(GetSubs(data));
    }
};

export const initialState = { subs:[] }
const subReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case GET_SUBS:
            Object.values(action.payload.sub).forEach(obj => {
                let index = 1;
                newState[obj.id] = obj.name;
                index++
            })
            return  newState;
        default: return state
    }
}
export default subReducer;
