import React from 'react';

import RosterControls from './RosterControls';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onLoadConversationRosterAction, addUserIdToRosterIdsAction, onSetUserConversationRoleAction } from "../actions/conversationActions";
import { addUserToAllUsersAction } from "../actions/userActions";


const _ = require('lodash');

class RosterSidebar extends React.Component {

    state = {
        addedUser : ''
    }

    constructor(props){
        super(props);
        this.props.client.on('load-conversations-roster-server', this.onLoadConversationRoster);
        this.props.client.on('load-roster-updates', this.onUpdateConversationRoster);
        this.props.client.on('load-user-conversation-role', this.onSetUserConversationRole);
    }

    onLoadConversationRoster = (data) => {
        const activeUser = this.props.activeUser;
        this.props.onLoadConversationRosterAction(data)
    }


    onSetUserConversationRole = (data) => {
        this.props.onSetUserConversationRoleAction(data);
    }

    onUpdateConversationRoster = (data) => {
        //Update the roster if the current conversation 
        //is same as the one with the new added user
        if(data.conversationId === this.props.activeConversation){
            
            if(this.state.addedUser !== data.user.id){
                
                // Add the new user to list of all users
                this.props.addUserToAllUsersAction(data);
                // Add the new user id to the conversation's roster
                this.props.addUserIdToRosterIdsAction(data);
                
                this.setState({addedUser : data.user.id});
            }
            

        }
    }

    isGroupAdmin = () => {
        if(!this.props.activeConversation){
            return false;
        }

        if(!this.props.conversations){
            return false;
        }
        
        const thisConversation = this.props.conversations[this.props.activeConversation];
        if(this.props.userRole == 'admin' && thisConversation.conversation.conversationType === 'group'){
            return true;
        }

        return false;
    }

    populateRosterList(rosterUserIds){
        return _.map(rosterUserIds, (userId) => {
            const user = this.props.users[userId];
            return(
                <li key={user.id}>
                    <span>{ user.username }</span>
                    <span>{}</span>
                </li>
            )
        })
    }

    renderRoster(rosterUserIds){
        if(!_.isEmpty(rosterUserIds)){
            return this.populateRosterList(rosterUserIds);
        }
        return(
            <p>No Roster found</p>
        );
    }

    renderRosterControls(){
        
        if(this.isGroupAdmin()){
            return(
                <RosterControls {...this.props} client={this.props.client}/>
            )
        }
    }

    render() {
        return(
            <div>
                Room roster
                {this.renderRoster(this.props.rosterUserIds)}
                {this.renderRosterControls()}
            </div>

            
        );
    }
}

function mapStateToProps(state){
    return {
        rosterUserIds: state.conversations.rosterUserIds,
        users: state.users.users,
        activeConversation: state.conversations.activeConversation,
        userRole: state.conversations.userRole,
        activeUser: state.activeUser,
        conversations: state.conversations.conversationMap
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        onLoadConversationRosterAction,
        addUserToAllUsersAction,
        addUserIdToRosterIdsAction,
        onSetUserConversationRoleAction
    }, dispatch)
}

// ConversationPanel.contextTypes = {
//     store : React.PropTypes.object
// }

export default connect(mapStateToProps, mapDispatchToProps)(RosterSidebar);