import React, {useEffect, useState} from 'react';
import { useAuth } from "utils/auth";
import Router from "next/router";

const Logout = () => {
    const auth = useAuth();

    useEffect(() => {
        auth
            .logOut()
            .then(() => {
                Router.push('/')
            })
    }, []);

    return null
};

export default Logout;
