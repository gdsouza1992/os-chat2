import React, {Component} from 'react';
import Select from 'react-select';
import SearchUserDropDown from './SearchUserDropDown';
import 'react-select/dist/react-select.css';

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
        ]

    }

    handleChange = (event) => {
        this.setState({conversationName: event.target.value});
    }

    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        
      }
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

    addConversation = () =>{
        const roomName = this.state.conversationName;
        const roomPrivacy = this.state.privacy;
        const roomType = this.state.roomType.value;
        const activeUser = this.props.activeUserId;
        
        // this.props.client.addNewConversation(roomName, roomPrivacy, roomType, activeUser);

        this.setState({ 'conversationName' : '' });
        this.setState({ 'privacy' : false });
        this.setState({ 'roomType' : '' });
    }

    showGroupControls = () => {
        const { roomType } = this.state;

        if(roomType === 'dm' || roomType === ''){
            return null;
        }

    }



    render() {
        return(
            <div>
                Room Name:
                <input id="conversationName" value={this.state.conversationName} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                Private:
                <input id="conversationPrivacy" type="checkbox" checked={this.state.privacy} onClick={this.handleClick}/>
                Type:
                
                <Select
                    name="roomTypeSelect"
                    value={this.state.roomType}
                    options={this.state.roomTypeOptions}
                    onChange={this.updateSelection}
                />
                <SearchUserDropDown searchResults={this.props.searchResults} isMultiple={this.state.isGroup} onSearch={this.props.onSearch}/>
                <button id="AddConversationSubmit" onClick={this.addConversation}>
                    Add
                </button>
            </div>
        );
    }
}

export default NewConversation;