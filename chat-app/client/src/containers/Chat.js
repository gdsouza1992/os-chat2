import React, {Component} from 'react';

import ConversationSidebar from '../presentation/ConversationSidebar'
import ConversationMain from '../presentation/ConversationMain'
import RosterSidebar from '../presentation/RosterSidebar'
import NewConversation from '../components/NewConversation'
import LeaveConversation from '../components/LeaveConversation'

import ActiveUser from './ActiveUser'
import SetupChat from './SetupChat'


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
    onResetUnreadCountsAction,
    onSearchResultsAction,
    clearSearchResultsAction,
    onNewConversationCreatedAction,
    setActiveUserAction,
    removeUserFromRosterAction,
    } from "../actions/chatActions";


const _ = require('lodash');

class Chat extends Component {

    constructor(){
        super();
        this.client = new Client();
        this.client.on('load-conversations', this.onLoadConversations);
        this.client.on('load-messages', this.onLoadMessages);
        this.client.on('load-roster', this.onLoadRoster);
        this.client.on('new-message', this.onNewMessage);
        this.client.on('reset-unread-counts', this.onResetUnreadCounts);
        this.client.on('search-results', this.onSearchResults);
        this.client.on('new-conversation', this.onNewConversationCreated);
        this.client.on('leave-conversation', this.onLeaveConversationCompleted);
        this.client.on('subscribe-new-conversation', this.onSubscribeNewConversation);
    }
    
    componentWillMount() {
        this.client.connect();
    }

    componentDidUpdate(prevProps){
        if(this.props.match.url !== prevProps.match.url){
            const activeConversationId = this.props.match.params.convoId;
            const activeConversation = this.props.conversations[activeConversationId];
            this.client.getRoster(activeConversation);
            this.client.getMessages(activeConversation);
            const activeUser = {
                userId : this.props.activeUserId
            }

            this.client.resetUnreadCounts(activeConversation, activeUser);
            this.props.setActiveConversationAction(activeConversation);
        }
    }

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
        if(!_.isEmpty(activeConversation) && activeConversation.id === newMessage.conversationId){
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

    onNewConversation = (data) => {
        console.log(data);
        this.client.createNewConversation(data);

    }

    onNewConversationCreated = (data) => {
        this.props.onNewConversationCreatedAction(data);
        this.props.clearSearchResultsAction();
    }

    onSubscribeNewConversation = (data) => {
        this.client.subscribeToNewConversation(data);
    }

    onSearch = (data) => {
        this.client.search(data)
    }

    onSearchResults = (data) => {
        this.props.onSearchResultsAction(data);
    }

    onSetActiveUser = (data) => {
        this.props.setActiveUserAction(data);
    }

    onLeaveConversation = (data) => {
        this.client.leaveConversation(data)
    }

    onLeaveConversationCompleted = (data) => {
        const { activeConversation, activeUserId } = this.props;
        if(!_.isEmpty(activeConversation) && activeConversation.id === data.conversation.id){
            this.props.removeUserFromRosterAction(data);
        }

        if(!_.isEmpty(activeUserId) && activeUserId === data.user.userId){
            //Update the view for this user he left!
            //remove the conversation from his converstaions and change his active conversation ?
            console.log('Removed me')
        }
    }

    onSetupChat = (data) => {
        if(!_.isEmpty(this.props.activeUserId)){
            const data = {
                userId : this.props.activeUserId
            }
            this.client.attachUserToSocket(data);
            this.client.getConversations(data);
        }
    }



    render() {
        const {conversations, messages, roster, users, activeConversation, activeUserId, searchResults} = this.props;
        return (
            <div>
                --------------------------------------
                <ActiveUser onSetActiveUser={this.onSetActiveUser}/>
                <SetupChat onSetupChat={this.onSetupChat}/>
                --------------------------------------
                <ConversationSidebar conversations={conversations}/>
                --------------------------------------
                <ConversationMain activeUserId={activeUserId} messages={messages} users={users} activeConversation={activeConversation} onSendMessage={this.onSendMessage}/>
                --------------------------------------
                <RosterSidebar roster={roster} users={users}/>
                <LeaveConversation activeConversation={activeConversation} activeUserId={activeUserId} onLeaveConversation={this.onLeaveConversation}/>
                --------------------------------------
                <NewConversation activeUserId={activeUserId} onNewConversation={this.onNewConversation} onSearch={this.onSearch} searchResults={searchResults}/>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        conversations: state.conversationsReducer.conversations,
        activeConversation : state.conversationsReducer.activeConversation,
        activeUserId : state.usersReducer.activeUserId,
        roster: state.conversationsReducer.roster,
        users: state.usersReducer.users,
        messages: state.messagesReducer.messages,
        searchResults: state.searchReducer.searchResults
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
        onResetUnreadCountsAction,
        onSearchResultsAction,
        clearSearchResultsAction,
        onNewConversationCreatedAction,
        setActiveUserAction,
        removeUserFromRosterAction,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
