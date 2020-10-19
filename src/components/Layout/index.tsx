import React from 'react';
import Box from "@material-ui/core/Box";
import Navbar from "../Navbar";
import Head from "next/head";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import theme from "theme";

type LayoutProps = {
    children: React.ReactNode,
    title?: string,
    isLoading?: boolean
}

const useStyles = makeStyles({
    paper: {
        padding: theme.spacing(2)
    }
}, { flip: false });

const Layout = ({ children, title, isLoading }: LayoutProps) => {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>{ title }</title>
            </Head>

            <Box display="flex" justifyContent="center" flexDirection="column" maxWidth="600px" margin="auto">
                <Box my={2}>
                    <Navbar />
                </Box>

                <Paper elevation={3} className={classes.paper}>
                    {isLoading ? 'Loading...' : children}
                </Paper>
            </Box>
        </>
    );
};

Layout.defaultProps = {
    isLoading: false
};

export default Layout;
