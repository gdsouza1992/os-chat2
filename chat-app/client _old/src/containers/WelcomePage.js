import React from 'react';
// import Chat from './Chat';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setActiveUserAction } from "../actions/userActions";
import { bindActionCreators } from 'redux';

class WelcomePage extends React.Component {
    state = {
      userId : '',
    }

    handleChange = (event) => {
      this.setState({userId: event.target.value});
    }

    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        this.loginUser();
      }
    }

    clearText = () => {
      this.setState({userId: ""});
    }

    loginUser = () => {
        const userId = this.state.userId;
        this.props.setActiveUserAction(userId)
    }


    render() {
        return(
            <div>
                <p>Welcome to the Home Page!</p>
                <input value={this.state.userId} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                <button onClick={this.loginUser}>Login</button>
                <Link to='/chat/'>Go to my chats</Link>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        activeUserId: state.activeUserId
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({setActiveUserAction}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
