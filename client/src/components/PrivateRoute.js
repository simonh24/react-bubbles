import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = window.localStorage.getItem("token");
    return (
        <Route {...rest} render={() => {
            if (token) {
                return <Component {...rest} />
            } else {
                return <Redirect to="/" />
            }
        }} />
    )
}

export default PrivateRoute;