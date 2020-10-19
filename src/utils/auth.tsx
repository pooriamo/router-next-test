import React, { useState, createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { api } from "./api";

type useAuthType = {
    logIn: Function,
    token: string,
    setToken: Function,
    handleSetToken: Function,
    isLoggedIn: boolean,
    logOut: Function
}

export const AuthContext = createContext({} as useAuthType);

export const AuthContextWrapper = ({ children }: any) => {
    const TOKEN_NAME = 'id_token';
    const existingTokens = Cookies.get(TOKEN_NAME);
    const [token, setToken] = useState(existingTokens);

    React.useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }, [token]);

    const handleSetToken = (data: any) => {
        Cookies.set(TOKEN_NAME, data, { expires: 30 });
        setToken(data);
    };

    const isLoggedIn = !!token;

    const logIn = (data: any) => {
        return axios({
            url: api('/login'),
            method: 'POST',
            data
        }).then(res => {
            handleSetToken(res.data.access_token);
            return true;
        }).catch(e => {
            return false;
        })
    };

    const logOut = () => {
        return axios({
            url: api('/logout'),
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            Cookies.remove(TOKEN_NAME);
            setToken(null);
        })
    };

    return (
        <AuthContext.Provider value={{ logIn, token, setToken: handleSetToken, isLoggedIn, logOut } as unknown as useAuthType}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth(): useAuthType {
    return useContext(AuthContext) as unknown as useAuthType;
}
