import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';


const _ = require('lodash');

class SearchUserDropDown extends React.Component {

    state = {
        searchOptions: []
    }

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(newProps){
        
    }


    onLoadSearchResults = (data) => {
        
    }

    updateSelection = (value) => {

    }

    handleSelectChange = (value) => {
        this.setState({value});
    }

    transformSearchResults = (data) => {
        if(_.isEmpty(data) || _.isEmpty(data.results)){
            return []
        }
        const searchOptions = _.values(data.results).map((result) => {
            return({
                value:result.id,
                label:result.username
            })
        });
        return searchOptions;
    }



    loadData = (inputValue) => {
        // Strip all non-number characters from the input
        if(inputValue.length > 0){
            const data = {
                filter: 'user',
                term: inputValue
            }
            this.props.onSearch(data);
        }
        return;
    }

    addUser = () => {

    }

    render() {
        return(
            <div>
                <Select
                    multi={this.props.isMultiple}
                    name="form-field-name"
                    value={this.state.value}
                    options={this.transformSearchResults(this.props.searchResults)}
                    onInputChange={this.loadData}
                    onChange={this.handleSelectChange}
                />
            </div>
        );
    }
}

export default SearchUserDropDown
