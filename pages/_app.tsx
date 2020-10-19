import React from "react";
import Head from 'next/head';
import { AppProps } from "next/app";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "theme";
import CssBaseline from '@material-ui/core/CssBaseline';
import {AuthContextWrapper} from "../src/utils/auth";

function MyApp({ Component, pageProps }: AppProps) {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
                <meta charSet="utf-8" />
                <title>Get feed</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthContextWrapper>
                    <Component {...pageProps} />
                </AuthContextWrapper>
            </ThemeProvider>
        </>
    )
}

export default MyApp
