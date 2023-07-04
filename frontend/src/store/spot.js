import { csrfFetch } from "./csrf";

const SET_SPOT = 'spot/setSpot';
const REMOVE_SPOT = 'spot/removeSpot';
const GET_ALL_SPOTS = 'spot/getAllSpots';


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

const loadSpots = (spots) => {
    console.log("Dispatch to getSpot => SENT!")
    return {
        type: GET_ALL_SPOTS,
        spots
    };
};

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch("/api/spots")
    console.log("RESPONSE")
    if (response.ok){
        console.log("OK")
        const data = await response.json();
        console.log("DATA", data.Spots)
        dispatch(loadSpots(data.Spots))

        return data;
    }
};

export const createSpot = ({country, address, city, state, description, title, price }) => async (dispatch) => {
    // console.log("createSpot => HIT!")
    // console.log("createSpot Variables => ", country, address, city, state, description, title, price);

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
    // console.log("Database Respsonse => ", data)
    dispatch(setSpot(data))
    // return response;
};

export const deleteSpot = () => async (dispatch) => {

    // return response;
};


// console.log("Get All Spots DATA => ", readSpot())
// const allSpots = {}

const initialState = {};

export default function spotReducer(state = initialState, action) {
    switch(action.type){
        case GET_ALL_SPOTS:{
            const newState = {};
            action.spots.forEach(spot => {
                newState[spot.id] = spot
            });
            console.log("getSpot Reducer HIT! =>", newState)
            return newState;
        }
        // case SET_SPOT:
        //     console.log("setSpot currentState => ")
        //     newState= Object.assign({}, state);
        //     newState.singleSpot = action.payload;
        //     console.log("spotReducer newState => ", newState)
        //     return newState;
        default:
            return state;
    }

}
