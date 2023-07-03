import { csrfFetch } from "./csrf";

const SET_SPOT = 'spot/setSpot';
const REMOVE_SPOT = 'spot/removeSpot';
const GET_SPOT = 'spot/getSpot';

const state = getState();

const setSpot = (spot) => {
    console.log("Dispatch to setSpot => SENT!")
    return {
        type: SET_SPOT,
        payload: spot
    };
};

const removeSpot = () => {
    return {
        type: REMOVE_SPOT
    };
};

const getSpot = () => {
    return {
        type: GET_SPOT
    };
};

export const createSpot = ({country, address, city, state, description, title, price }) => async (dispatch) => {
    console.log("createSpot => HIT!")
    console.log("createSpot Variables => ", country, address, city, state, description, title, price);

    const response = await csrfFetch("/api/spots", {
        method: "POST",
        body: JSON.stringify({
            country,
            address,
            city,
            state,
            lat: "-33.85660618894459",
            lng: "151.21529669767847",
            description,
            name: title,
            price
        })
    })
    const data = await response.json();
    console.log("Database Respsonse => ", data)
    dispatch(setSpot(data))
    // return response;
};

export const deleteSpot = () => async (dispatch) => {

    // return response;
};

export const readSpot = () => async (dispatch) => {

    // return response;
};

const initialState = { singleSpot: null };

export default function spotReducer(state = initialState, action) {
    let newState;
    switch(action.type){
        case SET_SPOT:
            newState= Object.assign({}, state);
            newState.singleSpot = action.payload;
            console.log("spotReducer newState => ", newState)
            return newState;
        default:
            return state;
    }

}
