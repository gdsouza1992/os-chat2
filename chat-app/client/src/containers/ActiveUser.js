import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ActiveUser extends React.Component {

    render(){
      return (
            <div>Active user: {this.props.activeUser.activeUserId}</div>
        )
      }
}

function mapStateToProps(state){
    return {
        activeUser: state.activeUser
    }
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({fetchMessagesAction : fetchMessagesAction}, dispatch)
// }

// ConversationPanel.contextTypes = {
//     store : React.PropTypes.object
// }

export default connect(mapStateToProps)(ActiveUser);