import axios from 'axios';

const _ = require('lodash');

class Search {

    getSearchData(data){
        const { filter, term } = data;
        const apiUrl = 'http://localhost:3002/api';
        if(typeof term === undefined){
            return {error: "No search term"};
        }

        console.log(filter);

        if(filter !== ''){
            return axios.get(apiUrl + '/search/' + filter + '/' + term);
        } else {
            return axios.get(apiUrl + '/search/' + term);
        }
    }
}

export default Search;