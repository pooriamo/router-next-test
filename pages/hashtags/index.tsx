import React from 'react';
import Layout from "components/Layout";
import useRequest from "../../src/utils/useRequest";
import {api} from "../../src/utils/api";
import Box from "@material-ui/core/Box";
import Link from "next/link";

const Hashtags = () => {
    const { data: hashtags } = useRequest(api('/hashtags'));

    return (
        <Layout title="All Hashtags" isLoading={!hashtags}>
            {hashtags && hashtags.map((hashtag: any) => (
                <Box mb={3} key={hashtag.id}>
                    <Link href="/hashtags/[name]" as={`/hashtags/${hashtag.name}`}><a>
                        {hashtag.name}
                    </a></Link>
                </Box>
            ))}
        </Layout>
    );
};

export default Hashtags;
