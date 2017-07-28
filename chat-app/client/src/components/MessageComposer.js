import React, {Component} from 'react';

class MessageComposer extends Component {
    
    state = {
        message : '',
    }

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.sendMessage();
        }
    }

    clearText = () => {
        this.setState({message: ""});
    }

    sendMessage = () => {
        const message = this.state.message; 
        const conversationId = this.props.activeConversation;

        if(message !== ''){
            const data = {
                message: message,
                conversation: conversationId,
                user: {
                    userId : this.props.activeUserId
                }
            }
            this.props.onSendMessage(data);
            this.clearText();
        } else {
            console.log('empty message');
        }
    }

    render() {
        return (
          <div>
            <input value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
            <button onClick={this.sendMessage}>Send</button>
          </div>
        );
    }
}



export default MessageComposer

