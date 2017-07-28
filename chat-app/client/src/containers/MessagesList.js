import React, {Component} from 'react';

const _ = require('lodash');
const utils = require('../lib/utils');

class MessagesList extends Component {
    
    renderMessages = () => {
        const {messages, users} = this.props;
        return _.values(messages).map((message) => {
            return(
                <li key={message.id}>
                    {users[message.userId].username} : {message.content} - {utils.formatDateToString(message.createdAt)}
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderMessages()}
            </div>
        );
    }
}



export default MessagesList

