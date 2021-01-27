import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import AuthRoute from "./util/AuthRoute";
import ProtectedRoute from "./util/ProtectedRoute";

function App() {
    return (
        <Router>
            <Switch>
                <AuthRoute exact path="/" component={Login} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                {/* <AuthRoute exact path="/login" component={Login} /> */}
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    );
}

export default App;
