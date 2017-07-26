import React, {Component} from 'react';

const _ = require('lodash');

class MessagesList extends Component {
    
    renderMessages = () => {
        const {messages, users} = this.props;
        return _.values(messages).map((message) => {
            return(
                <li key={message.id}>
                    {message.content}
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

