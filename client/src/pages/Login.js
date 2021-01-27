import React from "react";
import { Container, Box, Grid, Typography, Paper, Button } from "@material-ui/core";
import axios from 'axios';
import FacebookLogin from "react-facebook-login";

export default function Login (props) {
    React.useEffect(() => {
        // check if User cookie exists, if yes, get user_id and request initial data
    }, []);

    const responseFacebook = async (data) => {
        // communicate with server about login and cookie request.
        loginWithFacebook(data);
    };
    
    const loginWithFacebook = (data) => {
        axios({
            method: "post",
            url: 'http://localhost:4000/api/consult/login', 
            data,
            withCredentials: true,
        }).then((res) => {
            sessionStorage.setItem("name", res.data.name);
            props.history.push("/dashboard");
        });
    };

    return (
        <Container>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="title">Please Login</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <FacebookLogin
                            appId="707453086824617"
                            callback={responseFacebook}
                            fields="name, email, picture"
                            render={renderProps => {
                                (
                                    <button onClick={renderProps.onClick}>This is my custom FB button</button>
                                )
                            }}
                            cssClass="my-facebook-button-class"
                            icon="fa-facebook"
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}