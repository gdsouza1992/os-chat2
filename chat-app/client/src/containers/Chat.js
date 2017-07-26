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
    onShowNewMessageAction,
    incrementUnreadCountAction,
    onResetUnreadCountsAction
    } from "../actions/chatActions";


class Chat extends Component {

    constructor(){
        super();
        this.client = new Client();
        this.client.on('load-conversations', this.onLoadConversations);
        this.client.on('load-messages', this.onLoadMessages);
        this.client.on('load-roster', this.onLoadRoster);
        this.client.on('new-message', this.onNewMessage);
        this.client.on('reset-unread-counts', this.onResetUnreadCounts);
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
            const activeUser = {
                userId :1
            }

            this.client.resetUnreadCounts(activeConversation, activeUser);
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
        this.props.onLoadMessagesAction(data);
    }

    onNewMessage = (newMessage) => {
        const { activeConversation } = this.props;
        if(activeConversation.id === newMessage.conversationId){
            this.props.onShowNewMessageAction(newMessage);
        } else {
            this.props.incrementUnreadCountAction(newMessage);
        }
    }

    onSendMessage = (data) => {
        this.client.sendMessage(data);
    }

    onResetUnreadCounts = (data) => {
        this.props.onResetUnreadCountsAction(data);
    }

    render() {
        const {conversations, messages, roster, users, activeConversation} = this.props;
        return (
            <div>
                <ConversationSidebar conversations={conversations}/>
                <ConversationMain messages={messages} users={users} activeConversation={activeConversation} onSendMessage={this.onSendMessage}/>
                <RosterSidebar roster={roster} users={users}/>
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
        messages: state.messagesReducer.messages
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
        onLoadConversationsAction,
        setActiveConversationAction,
        onLoadMessagesAction,
        onLoadRosterAction,
        addToAllUsersAction,
        onShowNewMessageAction,
        incrementUnreadCountAction,
        onResetUnreadCountsAction
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
