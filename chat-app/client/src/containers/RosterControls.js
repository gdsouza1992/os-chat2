import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onLoadConverationRosterAction } from "../actions/conversationActions";
import { onSearchResultsAction } from "../actions/userActions";
import Select from 'react-select';


import 'react-select/dist/react-select.css';


const _ = require('lodash');

class RosterControls extends React.Component {

    state = {
            renderSearchData : false,
            isLoadingExternally : false,
            searchOptions : [],
            selectedText : '',
            selectedOption : {},
            selectionMessage: ''
        }

    constructor(props){
        super(props);
        this.props.client.on('load-suggestions-search', this.onLoadSearchResults);
    }

    componentWillReceiveProps(newProps){
        if(newProps.searchType === 'user' && this.state.renderSearchData){
            this.setState({renderSearchData : false});
            const rosterUserIds = this.props.rosterUserIds;
            const searchData = newProps.searchData.filter((user) => {
                return !(rosterUserIds.indexOf(user.id.toString()) > -1);
            });


            const searchOptions = searchData.map((user) => {
                return {value : user.id, label : user.username};
            })



            this.setState({searchOptions: searchOptions});
            this.setState({isLoadingExternally : false})
        }
    }


    onLoadSearchResults = (data) => {
        this.setState({isLoadingExternally : true})
        this.setState({renderSearchData : true})
        this.props.onSearchResultsAction(data);
    }

    updateSelection = (value) => {
        this.setState({selectedOption: value})
        this.setState({selectedText : value})
    }



    loadData = (inputValue) => {
        // Strip all non-number characters from the input
        if(inputValue.length > 0){
            this.props.client.search(inputValue, 'user');
        }
        this.setState({selectionMessage: ''});
        return;
    }

    addUser = () => {
        const selectedUser = this.state.selectedOption;

        if(selectedUser.value === undefined){
            this.setState({selectionMessage: 'Invalid user Selected!'});
        } else {
            const userId = selectedUser.value;
            const conversationId = this.props.activeConversation
            this.props.client.addUserToGroup(userId, conversationId);
            this.setState({selectionMessage: `Added ${selectedUser.label} to conversation`});

            //Reset the state variables
            this.setState({selectedText: ''});
            this.setState({selectedOption : {}});
            this.setState({searchOptions : []});
        }


    }

    render() {
        return(
            <div>
                <Select
                    name="form-field-name"
                    value={this.state.selectedText}
                    options={this.state.searchOptions}
                    isLoading={this.state.isLoadingExternally}
                    onInputChange={this.loadData}
                    onChange={this.updateSelection}
                />
                <p>{this.state.selectionMessage}</p>
                <button id="AddUserSubmit" onClick={this.addUser}>
                    Add
                </button>

            </div>
        );
    }
}

// export default RosterControls

function mapStateToProps(state){
    return {
        searchData: state.users.searchResults,
        searchType : state.users.searchType,
        rosterUserIds: state.conversations.rosterUserIds,
        activeConversation: state.conversations.activeConversation,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({onSearchResultsAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RosterControls);