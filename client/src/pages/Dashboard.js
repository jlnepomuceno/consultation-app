import React from "react";
import { Container, Button, Grid, Typography, Paper } from "@material-ui/core";
import axios from "axios";

export default function Dashboard (props) {

    const logout = () => {
        axios.get("http://localhost:4000/api/consult/logout/removeCookie", { withCredentials: true }).then((response) => {
            props.history.push('/');
        });
        // remove cookie from browser
    };

    return (
        <Container>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="title">You are logged in {sessionStorage.getItem("name")}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={logout}>Log-out</Button>
                </Grid>
            </Grid>
        </Container>
    )
}