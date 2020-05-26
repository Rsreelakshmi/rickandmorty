import {
    FETCH_SPECIES_FILTER,
    FETCH_GENDER_FILTER,
    FETCH_ORIGIN_FILTER
  } from '../actions/index';
  
  const initialState = {
    genderFilter: {},
    speciesFilter: {},
    originFilter: {}
  };
  
  export default function characterReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_SPECIES_FILTER:
        // fetches species filter data

        return {
          ...state,
          speciesFilter: action.payload.speciesFilter
        };
  
      case FETCH_GENDER_FILTER:
        // fetches gender filter data

        return {
          ...state,
          genderFilter: action.payload.genderFilter
        };
  
      case FETCH_ORIGIN_FILTER:
        // fetches origin filter data
        return {
          ...state,
          originFilter: action.payload.originFilter
        };
      
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }