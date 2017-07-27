import React, {Component} from 'react';

class SetupChat extends Component {

    setupChat = () => {
        this.props.onSetupChat();
        return;
    }

    render() {
        return (
          <div>
            <button onClick={this.setupChat}>SetupChat</button>
          </div>
        );
    }
}



export default SetupChat

