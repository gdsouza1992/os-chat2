import React, {Component} from 'react';

import ConversationSidebar from '../presentation/ConversationSidebar'
import ConversationMain from '../presentation/ConversationMain'
import RosterSidebar from '../presentation/RosterSidebar'

import Client from '../lib/client';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
    onLoadConversationsAction,
    onLoadMessagesAction,
    setActiveConversationAction,
    onLoadRosterAction,
    addToAllUsersAction,
    } from "../actions/chatActions";


class Chat extends Component {

    constructor(){
        super();
        this.client = new Client();
        this.client.on('load-conversations', this.onLoadConversations);
        this.client.on('load-messages', this.onLoadMessages);
        this.client.on('load-roster', this.onLoadRoster);
    }
    
    componentWillMount() {
        this.client.connect();
        const data = {
            userId :1
        }
        this.client.getConversations(data);
    }

    componentDidUpdate(prevProps){
        if(this.props.match.url !== prevProps.match.url){
            const activeConversationId = this.props.match.params.convoId;
            const activeConversation = this.props.conversations[activeConversationId];
            this.client.getRoster(activeConversation);
            this.client.getMessages(activeConversation);
            this.props.setActiveConversationAction(activeConversation);
        }
    }

    // componentWillReceiveProps(newProps){
    //     // const conversationId = newProps.match.params['convoId'];

    //     // if(conversationId === undefined){
    //     //     return;
    //     // }

    //     // //First time a chat is opened 
    //     // if(!this.state.loadedMessages){
    //     //     this.fetchConversationComponents(conversationId);
    //     // }

    //     // //Every time a conversation is changed 
    //     // if(conversationId !== this.state.currentConversationId){
    //     //     this.fetchConversationComponents(conversationId);
    //     // }
    // }

    onLoadConversations = (data) => {
        this.props.onLoadConversationsAction(data)
    }

    onLoadRoster = (data) => {
        this.props.addToAllUsersAction(data);
        this.props.onLoadRosterAction(data);
    }

    onLoadMessages = (data) => {
        this.props.onLoadMessagesAction(data)
    }

    render() {
        return (
            <div>
                <ConversationSidebar conversations={this.props.conversations}/>
                <ConversationMain/>
                <RosterSidebar roster={this.props.roster} users={this.props.users}/>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        conversations: state.conversationsReducer.conversations,
        activeConversation : state.conversationsReducer.activeConversation,
        roster: state.conversationsReducer.roster,
        users: state.usersReducer.users,
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
        onLoadConversationsAction,
        setActiveConversationAction,
        onLoadMessagesAction,
        onLoadRosterAction,
        addToAllUsersAction
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
