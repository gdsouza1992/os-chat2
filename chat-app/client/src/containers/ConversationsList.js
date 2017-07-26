import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const _ = require('lodash');

class ConversationsList extends Component {
    
    renderConversations = () => {
        const {conversations} = this.props;
        return _.values(conversations).map((conversation) => {
            return(
                <li key={conversation.id}>
                    <span>{ conversation.unread }</span>
                    <Link to={`/chat/${conversation.id}`}>
                        {conversation.name}
                    </Link>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderConversations()}
            </div>
        );
    }
}

export default ConversationsList

