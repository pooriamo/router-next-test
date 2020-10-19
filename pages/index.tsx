import React from 'react';
import Layout from "components/Layout";
import useRequest from "utils/useRequest";
import {api} from "utils/api";
import Box from "@material-ui/core/Box";

const HomePage = () => {
    const { data: feed } = useRequest(api('/feed'));

    return (
        <Layout title="Home page" isLoading={typeof feed === 'undefined'}>
            {feed && feed.map((item: any) => (
                <Box key={item.id} mb={3}>
                    <Box component="h2" mb={2}>{item.title}</Box>
                    <p>{item.content}</p>
                    {item.hashtags.length === 0 ?
                        'No hashtags'
                        :
                        <p>Hashtags: {item.hashtags.map((ht: any) => ht.name).join(', ')}</p>
                    }
                </Box>
            ))}
        </Layout>
    );
};

export default HomePage;
