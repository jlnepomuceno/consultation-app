import React from "react";
import { Container, Button, Grid, Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

export default function PageNotFound () {
    return (
        <Container>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h2">PageNotFound :( </Typography>
                    <Typography variant="h5">
                        Page might not be available for you. Try logging in.
                    </Typography>
                    <Link component={RouterLink} underline="none" to="/" color="inherit">
                        <Button color="inherit">Go to Login</Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}