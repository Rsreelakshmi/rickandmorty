export const FETCH_CHARACTERS_BEGIN   = 'FETCH_CHARACTERS_BEGIN';
export const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE';
export const FETCH_SPECIES_FILTER   = 'FETCH_SPECIES_FILTER';
export const FETCH_GENDER_FILTER = 'FETCH_GENDER_FILTER';
export const FETCH_ORIGIN_FILTER = 'FETCH_ORIGIN_FILTER';
export const FILTERBY_CHARACTERS = 'FILTERBY_CHARACTERS';
export const SEARCHBY_NAME_CHARACTERS = 'SEARCHBY_NAME_CHARACTERS';
export const SORT_BY_ASC = 'SORT_BY_ASC';
export const SORT_BY_DESC = 'SORT_BY_DESC';


export const fetchCharactersBegin = () => ({
  type: FETCH_CHARACTERS_BEGIN
});

export const fetchCharactersSuccess = characters => ({
  type: FETCH_CHARACTERS_SUCCESS,
  payload: { characters }
});

export const fetchCharactersFailure = error => ({
  type: FETCH_CHARACTERS_FAILURE,
  payload: { error }
});

export const sortByAsc = (value) => ({
  type: SORT_BY_ASC,
  value
});

export const sortByDesc = (value) => ({
  type: SORT_BY_DESC,
  value
});

export const filterBy = ( filterData, filterType) => ({
  type: FILTERBY_CHARACTERS,
  filterData,
  filterType
});

export const searchByName = selectedFilter => ({
  type: SEARCHBY_NAME_CHARACTERS,
  selectedFilter
});

export const fetchSpeciesFilter = speciesFilter => ({
  type: FETCH_SPECIES_FILTER,
  payload: { speciesFilter }
});

export const fetchGenderFilter = genderFilter => ({
  type: FETCH_GENDER_FILTER,
  payload: { genderFilter }
});

export const fetchOriginFilter = originFilter => ({
  type: FETCH_ORIGIN_FILTER,
  payload: { originFilter }
});

export const fetchCharacters = () => {
  return dispatch => {
    dispatch(fetchCharactersBegin());
    return fetch(`https://rickandmortyapi.com/api/character`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        let characterResults = json.results.map(result => {
          result.isHidden = false;
          return result;
        })
        dispatch(fetchCharactersSuccess(characterResults));
        return characterResults;
      })
      .catch(error => dispatch(fetchCharactersFailure(error)));
  };
}

export const fetchFilterData = () => {
  return dispatch => {
    return fetch(`https://rickandmortyapi.com/api/character`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCharactersSuccess(json.results));
        const speciesFilter = [...new Set(getFilterData(json.results, 'species'))];
        const originFilter = [...new Set(getFilterData(json.results, 'origin'))];
        const genderFilter = [...new Set(getFilterData(json.results, ''))];
        dispatch(fetchSpeciesFilter(speciesFilter));
        dispatch(fetchGenderFilter(genderFilter));
        dispatch(fetchOriginFilter(originFilter));
        return {genderFilter, originFilter, speciesFilter};
      })
      .catch(error => dispatch(fetchCharactersFailure(error)));
  };
}

export const getFilterObject = (filterArr, filterType) => {
  return filterArr.map((filter) => {
    return {
      name: filter,
      filterType: filterType,
      checked: false
    }
  })
};

const getFilterData = (result, flag) => {
  if( flag === 'species') {
    return result.map(res => {return res.species});
  }
  else if( flag === 'origin') {
    return result.map(res => {return res.origin.name});
  }
  else {
    return result.map(res => {return res.gender});
  }
}

// Handle HTTP errors since fetch won't.
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}