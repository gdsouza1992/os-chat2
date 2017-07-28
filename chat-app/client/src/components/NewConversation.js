import React, {Component} from 'react';
import Select from 'react-select';
import SearchUserDropDown from './SearchUserDropDown';
import ValidationMessage from './ValidationMessage';
import 'react-select/dist/react-select.css';

const _ = require('lodash');

class NewConversation extends Component {

    state = {
        conversationName: '',
        privacy: false,
        roomType: '',
        isGroup: false,
        roomTypeOptions: [
            {
                value:'dm',
                label:'Direct Message'
            },{
                value:'group',
                label:'Group Messages'
            }
        ],
        roomMembers: [],
        validationMsg: '',
        submitSuccess: false,

    }

    handleChange = (event) => {
        this.setState({conversationName: event.target.value});
    }

    handleClick = (event) => {
        console.log(event);
        this.setState({privacy: event.target.checked});
    }

    clearText = () => {
      this.setState({conversationName: ""});
    }

    updateSelection = (roomType) => {
        this.setState({roomType: roomType});
        if(roomType.value === 'dm' || roomType.value === ''){
            this.setState({isGroup: false})
        } else {
            this.setState({isGroup: true})
        }
    }

    setRoomMembers = (members) => {
        this.setState({roomMembers:members});
    }

    validateForm = (data) => {
        const {name, type, members} = data;
        let validationMsg = '';
        if(_.isEmpty(name)){
            validationMsg += 'Room name is required\n'
        }
        if(_.isEmpty(type)){
            validationMsg += 'Room type is required\n'
        }
        if(_.isEmpty(members)){
            validationMsg += 'At least one member is required\n'
        }

        if(validationMsg !== ''){
            this.setState({validationMsg: validationMsg});
            return false;
        }

        
        return true;
    }

    addConversation = () =>{
        const user = {
            userId : this.props.activeUserId
        }
        
        // this.props.client.addNewConversation(roomName, roomPrivacy, roomType, activeUser);
        const data = {
            name: this.state.conversationName,
            privacy: this.state.privacy,
            type: this.state.roomType.value,
            user: user,
            members: this.state.roomMembers
        }

        if(this.validateForm(data)){
            this.props.onNewConversation(data)
            this.setState({'submitSuccess': true});
        }
    }

    clearFields = () => {
        this.setState({ 'conversationName' : '' });
        this.setState({ 'privacy' : false });
        this.setState({ 'roomType' : '' });
        this.setState({ 'roomMembers' : [] });
        this.setState({'submitSuccess': false});
    }



    render() {
        return(
            <div>
                Room Name:
                <input value={this.state.conversationName} onChange={this.handleChange}/>
                Private:
                <input type="checkbox" checked={this.state.privacy} onClick={this.handleClick}/>
                Type:
                
                <Select
                    name="roomTypeSelect"
                    value={this.state.roomType}
                    options={this.state.roomTypeOptions}
                    onChange={this.updateSelection}
                />
                <SearchUserDropDown setSelection={this.setRoomMembers} searchResults={this.props.searchResults} isMultiple={this.state.isGroup} onSearch={this.props.onSearch} submitSuccess={this.state.submitSuccess} clearFields={this.clearFields}/>
                <ValidationMessage validationMessage={this.state.validationMsg}/>
                <button onClick={this.addConversation}>
                    Add
                </button>
            </div>
        );
    }
}

export default NewConversation;