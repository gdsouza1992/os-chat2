import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLoadConversationsClientAction, setActiveConversationAction, resetUnreadCountAction } from "../actions/conversationActions";

const _ = require('lodash');

class ConversationSidebar extends React.Component {

    state = {
        currentConversationId : '',
        currentUserId : '',
        unreadConversations : [],
        loadedMessages: false,
        previousConversationId: ''
    }

    constructor(props){
        super(props);
        this.props.client.on('load-conversations-client-success', this.onLoadConversationsClientSucess);
        this.props.client.on('load-conversation-unread-counts', this.onResetUpdateCounts);
    }

    componentDidMount() {
        const userId = this.props.activeUser.activeUserId;
        this.props.client.fetchConversations(userId);
        console.log("Called this")
    }

    componentWillReceiveProps(newProps){
        const conversationId = newProps.match.params['convoId'];

        if(conversationId === undefined){
            return;
        }

        //First time a chat is opened 
        if(!this.state.loadedMessages){
            this.fetchConversationComponents(conversationId);
        }

        //Every time a conversation is changed 
        if(conversationId !== this.state.currentConversationId){
            this.fetchConversationComponents(conversationId);
        }
    }

    fetchConversationComponents(conversationId){
        console.log("Did somethin")
        this.setState({loadedMessages: false})
        const activeUserId = this.props.activeUser.activeUserId;
        this.setState({currentConversationId : conversationId});
        this.props.setActiveConversationAction(conversationId);

        if(_.isEmpty(this.props.users) || (this.state.previousConversationId !== conversationId)){
            console.log('Get role called')
            if(activeUserId){
                this.props.client.fetchUserRoleForConversation(conversationId, activeUserId);
            }
            this.props.client.fetchRoster(conversationId);
        }

        if(!_.isEmpty(this.props.users)){
            this.props.client.fetchMessages(activeUserId, conversationId);
            this.props.client.resetUnreadCounts(activeUserId, conversationId);
            this.setState({loadedMessages: true})
        }

        this.setState({previousConversationId: conversationId});
    }

    onLoadConversationsClientSucess = (data) => {
        this.props.onLoadConversationsClientAction(data);
    }

    onResetUpdateCounts = (data) => {
        if(!_.isEmpty(this.props.rooms)){
            this.props.resetUnreadCountAction(data);
        }
    }

    populateConversationList(rooms){
        return _.map(rooms, (room) => {
            return(
                <li key={room.conversationId}>
                    <span>{ room.unread }</span>
                     <Link to={`/chat/${room.conversationId}`}>{room.conversation.conversationType} - {room.conversation.name}</Link>
                </li>
            )
        })
    }

    createConversationList(){
        if(!_.isEmpty(this.props.rooms)){
            return(
                <ul>
                    {this.populateConversationList(this.props.rooms)}
                </ul>
            );
        } else {
            return(<p>No conversations found</p>)
        }
    }

    render(){
      return (
            <div>
                {this.createConversationList()}
            </div>
        )
      }
}

function mapStateToProps(state){
    return {
        rooms: state.conversations.conversationMap,
        activeUser: state.activeUser,
        users: state.users.users
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({onLoadConversationsClientAction, setActiveConversationAction, resetUnreadCountAction}, dispatch)
}

// ConversationPanel.contextTypes = {
//     store : React.PropTypes.object
// }

export default connect(mapStateToProps, mapDispatchToProps)(ConversationSidebar);

 // onClick={() => this.props.setActiveConversationAction(room.conversationId)}>