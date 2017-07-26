import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onLoadMessagesClientAction, onLoadNewMessagesClientAction } from "../actions/messageActions";
// import { setActiveConversationAction } from "../actions/conversationActions";


const _ = require('lodash');

class MessagesContainer extends React.Component {

    constructor(props){
        super(props);
        this.props.client.on('load-messages-client-success', this.onLoadMessagesClientSucess);
        this.props.client.on('load-new-messages-client-success', this.onLoadNewMessagesClientSucess);
    }

    onLoadMessagesClientSucess = (data) => {
        this.props.onLoadMessagesClientAction(data)
    }

    onLoadNewMessagesClientSucess = (data) => {
        const activeConversation = this.props.activeConversation;
        const activeUserId = this.props.activeUserId;
        this.props.onLoadNewMessagesClientAction(data, activeConversation, activeUserId)
    }

    state = {
        currentConversationId : '',

    }


    renderNoMessages(){
        return(<p>No conversation Messages to show</p>);
    }

    renderPopulatedMessageList(messages, users){
        return messages.messages.map((message) => {

            //System message
            if(message.userId === 0){
                return (
                    <li key={message.id}>{message.content}</li>
                );
            }

            //User message
            return(
                <li key={message.id}>{this.props.users[message.userId].username} : {message.content}</li>
            );
        });

    }



    handleIncommingMessages(){
        const messages = this.props.messages;
        const users = this.props.users;
        if(!_.isEmpty(messages)){
            return this.renderPopulatedMessageList(messages, users);
        }
        return this.renderNoMessages();
    }

    render(){
      return (
            <ul>
                {this.handleIncommingMessages()}
            </ul>
        )
      }
}

function mapStateToProps(state){
    return {
        messages: state.messages,
        activeConversation: state.conversations.activeConversation,
        newMessageData: state.newMessage,
        activeUserId: state.activeUser.activeUserId,
        users: state.users.users
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({onLoadMessagesClientAction, onLoadNewMessagesClientAction}, dispatch)
}

// ConversationPanel.contextTypes = {
//     store : React.PropTypes.object
// }

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);