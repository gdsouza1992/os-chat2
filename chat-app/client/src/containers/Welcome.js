import React, {Component} from 'react';
import { Link } from 'react-router-dom';
class Welcome extends Component {

    render() {
        return (
          <div>
            welcome
            <Link to='/chat/'>Go to my chats</Link>
          </div>
        );
    }
}



export default Welcome

