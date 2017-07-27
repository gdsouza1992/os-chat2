import React, {Component} from 'react';

class ActiveUser extends Component {
    
    state = {
        userID : '',
    }

    handleChange = (event) => {
        this.setState({userID: event.target.value});
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.sendMessage();
        }
    }

    clearText = () => {
        this.setState({userID: ""});
    }

    setUser = () => {
        const {userID} = this.state
        if(userID){
            this.props.onSetActiveUser(this.state.userID);
        }
        return;
    }

    render() {
        return (
          <div>
            <input value={this.state.userID} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
            <button onClick={this.setUser}>SetUser</button>
          </div>
        );
    }
}



export default ActiveUser

