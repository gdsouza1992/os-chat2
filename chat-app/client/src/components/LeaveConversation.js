import React, {Component} from 'react';
const _ = require('lodash');

class LeaveConversation extends Component {

    state ={
        activeUserId : ''
    }

    handleClick = () => {
        const { activeConversation, activeUserId} = this.props;
        const data = {
            conversation:activeConversation,
            user : {
                userId : activeUserId
            }
        }
        this.props.onLeaveConversation(data)
    }


    renderLeaveButton = () => {
        const {activeConversation, activeUserId, roster} = this.props;
        if(_.isEmpty(activeConversation) || _.isEmpty(activeUserId)){
            return null;
        }

        if(!_.isEmpty(roster)){
            
        }


        const leaveGroupText = `Leave ${activeConversation.name}`
        return (
            <div>
                <button onClick={this.handleClick}>{leaveGroupText}</button>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderLeaveButton()}
            </div>
        );
    }
}

export default LeaveConversation;
