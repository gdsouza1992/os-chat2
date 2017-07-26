import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { createNewConversationAction } from "../actions/conversationActions";
// import { onSearchResultsAction } from "../actions/userActions";
import Select from 'react-select';
import RosterControls from './RosterControls';


import 'react-select/dist/react-select.css';

const _ = require('lodash');
console.log("Create room form")
class CreateRoomForm extends React.Component {

    state = {
        conversationName: '',
        privacy: false,
        roomType: '',
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

     updateSelection = (value) => {
        this.setState({roomType: value});
    }

    addConversation = () =>{
        const roomName = this.state.conversationName;
        const roomPrivacy = this.state.privacy;
        const roomType = this.state.roomType.value;
        const activeUser = this.props.activeUserId;
        this.props.client.addNewConversation(roomName, roomPrivacy, roomType, activeUser);

        this.setState({ 'conversationName' : '' });
        this.setState({ 'privacy' : false });
        this.setState({ 'roomType' : '' });
    }

    showGroupControls = () => {
        const { roomType } = this.state;

        if(roomType === 'dm' || roomType === ''){
            return null;
        }

        return(
            <RosterControls {...this.props} client={this.props.client}/>
        );
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
                {this.showGroupControls()}
                <button id="AddConversationSubmit" onClick={this.addConversation}>
                    Add
                </button>
            </div>
        );
    }
}



function mapStateToProps(state){
    return {
        activeUserId: state.activeUser.activeUserId
    }
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({createNewConversationAction}, dispatch);
// }

export default connect(mapStateToProps)(CreateRoomForm);
// export default CreateRoomForm;