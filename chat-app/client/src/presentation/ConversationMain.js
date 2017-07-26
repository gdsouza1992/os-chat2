import React, {Component} from 'react';
import MessagesList from '../containers/MessagesList';
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

    render() {
        return (
            <div>
                {this.renderMessages()}
            </div>
        );
    }
}



export default ConversationMain

