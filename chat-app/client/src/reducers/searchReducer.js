const _ = require('lodash');

export default function(state = {}, action) {
    let data;
    let searchResults;

  switch (action.type) {

    case "ON_SEARCH_RESULTS":
        const results = _.keyBy(action.payload.results, result => result.id)
        const searchFilter = action.payload.filter;
        
        searchResults = {
            results,
            searchFilter
        }
        data = Object.assign({}, state, {'searchResults': searchResults});
        return data;

    case "CLEAR_SEARCH_RESULTS":
        data = Object.assign({}, state, {'searchResults': []});
        return data;

    default:
      return state;
  }
} 

