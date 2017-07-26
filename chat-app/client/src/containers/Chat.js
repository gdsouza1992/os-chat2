import React, {Component} from 'react';

import ConversationSidebar from '../presentation/ConversationSidebar'
import ConversationMain from '../presentation/ConversationMain'
import RosterSidebar from '../presentation/RosterSidebar'

import Client from '../lib/client';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { initializeUsersStateAction } from "../actions/userActions";


class Chat extends Component {

    constructor(){
        super();
        this.client = new Client();
        // this.client.on('new-message', this.onNewMessageRecieved.bind(this));
    }
    
    componentWillMount() {
        this.client.connect();
    }

    render() {
        return (
            <div>
                <ConversationSidebar/>
                <ConversationMain/>
                <RosterSidebar/>
            </div>
        );
    }
}

// <SearchResults {...this.props} client={this.client}/>

export default Chat

// function mapStateToProps(state){
//     return {
//         users: state.users,
//     }
// }


// function mapDispatchToProps(dispatch){
//     return bindActionCreators({initializeUsersStateAction}, dispatch)
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Chat);
