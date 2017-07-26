import React, {Component} from 'react';
import RosterList from '../containers/RosterList';

class RosterSidebar extends Component {
    
    renderRosterList = () => {
        return(
            <RosterList />
        )
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

