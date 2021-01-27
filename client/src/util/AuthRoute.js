import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

function AuthRoute ({component: Component, ...rest }) {
    const [route, setRoute] = React.useState(<div>Loading...</div>);

    React.useEffect(() => {
        init();
    }, [])

    const init = () => {
        axios(
            'http://localhost:4000/api/consult/check_cookie', 
            { withCredentials: true }
        ).then((res) => {
            setRoute(newComponent(res.data.isLoggedIn));
        });
    };

    const newComponent = (bool) => {
        return (
            <Route
                {...rest}
                render={(props) => 
                    bool ? <Redirect to="/dashboard" /> : <Component {...props}/>
                }    
            />
        )
    }

    // TODO - instead of firing another request for auth, just make a browser-side cookie?
    return route;
}

export default AuthRoute;