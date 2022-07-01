import './App.css';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Pages
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Bchgraph from "./pages/bchgraph/bchgraph";

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => authUser ? (<Component {...props} />) : (<Redirect to={{ pathname: '/user/auth', state: { from: props.location } }} />)}
        />
    );
}

class App extends Component {
    render() {
        const { authenticateUser } = this.props;
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <AuthRoute path="/" authUser={authenticateUser} exact component={(props) => <Bchgraph {...props} setIsFromInput={(value) => { this.setState({ isFromInput: value }) }} />} />
                        <Route path="/user/auth" render={props => authenticateUser ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />) : (<Login {...props} />)} />
                        <Route path="/user/signup" render={props => authenticateUser ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />) : (<Signup {...props} />)} />
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ authUser }) => {
    const { user: authenticateUser } = authUser;
    return { authenticateUser };
};
const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(App);