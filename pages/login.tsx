import React, {useEffect, useState} from 'react';
import Layout from "../src/components/Layout";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useAuth } from "../src/utils/auth";
import Router from "next/router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errored, setErrored] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        if (auth.isLoggedIn) {
            Router.push('/')
        }
    }, []);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setErrored(false);

        const res = await auth.logIn({ email, password });

        if (res) {
            Router.push('/');
        } else {
            setErrored(true);
        }
    };

    const handleEmail = (e: any) => setEmail(e.target.value);

    const handlePassword = (e: any) => setPassword(e.target.value);

    return (
        <Layout title="login">
            <form onSubmit={handleLogin}>
                <Box mx="auto" my={5} display="table">
                    {errored && (
                        <Box color="red" mb={2}>
                            Credentials error
                        </Box>
                    )}
                    <Box mb={2}>
                        <TextField
                            placeholder="gholi@example.com"
                            label="Email"
                            value={email}
                            onChange={handleEmail}
                            error={true}
                        />
                    </Box>
                    <Box mb={3}>
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </Box>

                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </Box>
            </form>
        </Layout>
    );
};

export default Login;
