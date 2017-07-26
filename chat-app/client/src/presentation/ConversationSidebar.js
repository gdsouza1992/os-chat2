import React, {Component} from 'react';
import ConversationList from '../containers/ConversationList';

class ConversationSidebar extends Component {

    renderConversations = () => {
        return(
            <ConversationList/>
        )
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

