import React from 'react';
import Chat from './Chat';
import WelcomePage from './WelcomePage';
import { Route, Switch, Link } from 'react-router-dom'

class App extends React.Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={WelcomePage}/>
                    <Route exact path="/chat/:convoId" component={Chat}/>
                    <Route exact path="/chat" component={Chat}/>
                </Switch>
                <Link to = "/" > HOME </Link>
            </div>
        );
    }
}
export default App;