import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ActiveConversation extends React.Component {

    render(){
      return (
            <div>Active conversations: {this.props.activeConversation}</div>
        )
      }
}

function mapStateToProps(state){
    return {
        activeConversation: state.conversations.activeConversation 
    }
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({fetchMessagesAction : fetchMessagesAction}, dispatch)
// }

// ConversationPanel.contextTypes = {
//     store : React.PropTypes.object
// }

export default connect(mapStateToProps)(ActiveConversation);