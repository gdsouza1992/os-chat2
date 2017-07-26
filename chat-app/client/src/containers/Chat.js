import React, {Component} from 'react';
import ConversationSidebar from './ConversationSidebar';
import MessagesContainer from './MessagesContainer';
import ActiveConversation from './ActiveConversation';
import ActiveUser from './ActiveUser';
import MessageEditor from './MessageEditor';
import RosterSidebar from './RosterSidebar';
import RosterControls from './RosterControls';
import CreateRoomForm from './CreateRoomForm';
// import SearchResults from './SearchResults';

import Client from '../lib/client';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initializeUsersStateAction } from "../actions/userActions";


class Chat extends Component {

    constructor(){
        super();
        this.client = new Client();
        // this.client.on('new-message', this.onNewMessageRecieved.bind(this));
    }
    
    componentWillMount() {
        this.props.initializeUsersStateAction()
        this.client.connect();
    }

    render() {
        return (
            <div>
                <ConversationSidebar {...this.props} client={this.client}/>
                <MessagesContainer {...this.props} client={this.client}/>
                <ActiveConversation {...this.props} />
                <ActiveUser {...this.props} />
                <MessageEditor {...this.props} client={this.client}/>
                <RosterSidebar {...this.props} client={this.client}/>
                <CreateRoomForm {...this.props} client={this.client}/>
            </div>
        );
    }
}

// <SearchResults {...this.props} client={this.client}/>

function mapStateToProps(state){
    return {
        users: state.users,
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({initializeUsersStateAction}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
