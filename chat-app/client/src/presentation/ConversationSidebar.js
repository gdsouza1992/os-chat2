import React, {Component} from 'react';
import ConversationsList from '../containers/ConversationsList';

const _ = require('lodash');

class ConversationSidebar extends Component {

    renderConversations = () => {
        const {conversations} = this.props;
        if(_.isEmpty(conversations)){
            return(
                <p>No Conversations </p>
            )
        } else {
            return(
                <ConversationsList conversations={conversations}/>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderConversations()}
            </div>
        );
    }
}



export default ConversationSidebar

