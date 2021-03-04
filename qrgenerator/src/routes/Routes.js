// React
import React from 'react';
// React router
import { Switch, Route } from 'react-router-dom';
// View
import LoginForm from './../views/LoginForm';
import Dashboard from './../views/Dashboard';
import AuthChecker from './../utils/AuthChecker'

function Routes({ loggedIn }) {
    return (
        <Switch>
            <Route exact path="/" >
                <LoginForm />
            </Route>
            <AuthChecker>
                <Route exact path="/dashboard">
                    <Dashboard loggedIn={loggedIn} />
                </Route>
            </AuthChecker>
            <Route exact path="/notfound">
                <h1>NOT FOUND</h1>
            </Route>
        </Switch>

    )
}

export default Routes

