import React, {useEffect, useState} from 'react';
import useStyles from "./styles";
import Link from "next/link";
import {Box} from "@material-ui/core";
import { useAuth } from "utils/auth";

const makeLink = (title: string, href: string, as?: string, scope?: 'guest' | 'auth') => ({ title, href, as, scope });

const links = [
    makeLink('Home', '/'),
    makeLink('Hashtags', '/hashtags'),
    makeLink('Login', '/login', undefined, 'guest'),
    makeLink('Create Feed', '/create-feed', undefined, 'auth'),
    makeLink('Logout', '/logout', undefined, 'auth'),
];

const Navbar = () => {
    const classes = useStyles();
    const auth = useAuth();
    const [filteredLinks, setFilteredLinks] = useState<any[]>([]);

    useEffect(() => {
        setFilteredLinks(auth.isLoggedIn ?
            links.filter(link => link.scope !== 'guest')
            :
            links.filter(link => link.scope !== 'auth')
        );
    }, [auth.isLoggedIn]);

    return (
        <Box display="flex">
            {filteredLinks
                .map((link: any) => (
                    <Box key={link.title} mr={2}>
                        <Link href={link.href} as={link.as}>
                            <a className={classes.link}> {link.title} </a>
                        </Link>
                    </Box>
                ))
            }
        </Box>
    );
};

export default Navbar;
