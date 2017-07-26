import React, {Component} from 'react';
import MessagesList from '../containers/MessagesList';
import MessageComposer from '../components/MessageComposer';
const _ = require('lodash');

class ConversationMain extends Component {

    renderMessages = () => {
        const {messages, users} = this.props;
        if(_.isEmpty(messages) || _.isEmpty(users)){
            return(
                <p>No Messages</p>
            )
        } else {
            return(
                <div>
                    Messages:
                    <MessagesList messages={messages} users={users}/>
                </div>
            )
        }
    }

    renderMessageComposer = () => {
        const {activeConversation, onSendMessage} = this.props;
        if(_.isEmpty(activeConversation)){
            return null;
        }
        return (
            <MessageComposer onSendMessage={onSendMessage} activeConversation={activeConversation}/>
        );
    }

    render() {
        return (
            <div>
                {this.renderMessages()}
                {this.renderMessageComposer()}
            </div>
        );
    }
}



export default ConversationMain

