import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Notify from "../Notify";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    let history = useHistory();
    useEffect(() => setToken(window.localStorage.getItem("token")), [token]);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (token) {
                    return <Component {...rest} {...props} />;
                } else {
                    Notify("Access Denied! ⛔", "warning");
                    history.push("/");
                }
            }}
        />
    );
};

export default ProtectedRoute;
