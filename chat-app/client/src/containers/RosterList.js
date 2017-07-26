import React, {Component} from 'react';

class RosterList extends Component {
    
    renderRoster = () => {
        const {roster, users} = this.props;
        return roster.map((id) => {
            return(
                <li key={id}>
                    {users[id].username}
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderRoster()}
            </div>
        );
    }
}



export default RosterList

