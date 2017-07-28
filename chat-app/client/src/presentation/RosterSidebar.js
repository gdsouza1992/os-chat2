import React, {Component} from 'react';
import RosterList from '../containers/RosterList';
// import SearchUserDropDown from '../components/SearchUserDropDown';

const _ = require('lodash');

class RosterSidebar extends Component {
    
    renderRosterList = () => {
        const {users, roster} = this.props;
        if(_.isEmpty(users) || _.isEmpty(roster)){
            return(
                <p>No Roster</p>
            )
        } else {
            return(
                <div>
                Roster:
                    <RosterList users={users} roster={roster}/>
                    
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderRosterList()}
            </div>
        );
    }
}



export default RosterSidebar

