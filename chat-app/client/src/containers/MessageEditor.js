import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendMessageClientAction } from "../actions/messageActions";

class MessageEditor extends Component {
    
    state = {
      message : '',
    }

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleKeyPress = (event) => {
        console.log("I FIRED")
      if(event.key === 'Enter'){
        this.sendMessage();
      }
    }

    clearText = () => {
      this.setState({message: ""});
    }

    sendMessage = () => {
        const message = this.state.message; 
        const userId = this.props.activeUser.activeUserId;
        const conversationId = this.props.activeConversation;

        if( !conversationId ){
            console.log('Please select a conversation first');
            return;
        }

        if(message !== '' && userId ){
            this.props.client.sendMessage(userId, conversationId, message);
            this.clearText();
        } else {
            console.log('empty message');
        }
    }

    render() {
        return (
          <div className="MessageEditor">
            <input id="MessageEditorText" value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
            <button id="MessageEditorSubmit" onClick={this.sendMessage}>Send</button>
          </div>
        );
    }
}

function mapStateToProps(state){
    return {
        activeUser: state.activeUser,
        activeConversation: state.conversations.activeConversation 
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({sendMessageClientAction}, dispatch)
}

// ConversationPanel.contextTypes = {
//     store : React.PropTypes.object
// }

export default connect(mapStateToProps, mapDispatchToProps)(MessageEditor);

