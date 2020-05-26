import {
    FETCH_CHARACTERS_BEGIN,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_FAILURE,
    FILTERBY_CHARACTERS,
    SEARCHBY_NAME_CHARACTERS,
    SORT_BY_ASC,
    SORT_BY_DESC
  } from '../actions/index';
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
    showFilters: false,
    sortOrder: 'asc'
  };
  
  export default function characterReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_CHARACTERS_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_CHARACTERS_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          items: action.payload.characters
        };
  
      case FETCH_CHARACTERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };

      case FILTERBY_CHARACTERS:
        let compareParam, compareFilter;
        return {
          ...state,
          showFilters: true,
          items: state.items.map(itm => {
            if ( action.filterType === 'species') {
              compareParam = itm.species
              compareFilter = action.filterData.speciesFilter
            }
            else if (action.filterType === 'origin' ) {
              compareParam = itm.origin.name
              compareFilter = action.filterData.originFilter
            }
            else {
              compareParam = itm.gender
              compareFilter = action.filterData.genderFilter
            }

            if ( compareFilter.length ) {
              return compareFilter.includes(compareParam) ? {...itm, isHidden: false} : {...itm, isHidden: true}
            }
            else {
              return {...itm, isHidden: false}
            }
          }
          )
        };

      case SEARCHBY_NAME_CHARACTERS:
        return {
          ...state,
          items: state.items.map(itm =>
            {
            let itmName = itm.name.toLowerCase();
            return itmName.includes(action.selectedFilter.name) ? { ...itm, isHidden: false } : { ...itm, isHidden: true }
            }
          )
        };

      case SORT_BY_DESC:
        return {
          ...state,
          error: '',
          items: state.items.sort((i,j) => j.id - i.id)
        }

      case SORT_BY_ASC:
        return {
          ...state,
          error: null,
          items: state.items.sort((i,j) => i.id - j.id)
        }
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }