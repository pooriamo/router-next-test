import React from 'react';
import Layout from "components/Layout";
import useRequest from "../../src/utils/useRequest";
import {api} from "../../src/utils/api";
import {useRouter} from "next/router";
import Box from "@material-ui/core/Box";

const Hashtag = () => {
    const router = useRouter();
    const { data: hashtag } = useRequest(router.query.name && api(`/hashtags/${router.query.name}`));
    const { data: feed } = useRequest(router.query.name && api(`/feed/${router.query.name}`));

    return (
        <Layout title={`Hashtag: ${router.query.name}`} isLoading={!hashtag}>
            {hashtag && `${hashtag.name} with id ${hashtag.id}`}

            <h5>Feed with this hashtag:</h5>
            {typeof feed === 'undefined' ?
                'Getting feed...'
                :
                (
                    feed.length === 0 ? 'No feed associated with this hashtag'
                    :
                    feed.map((item: any) => (
                        <Box key={item.id} mb={3}>
                            <Box component="h2" mb={2}>{item.title}</Box>
                            <p>{item.content}</p>
                        </Box>
                    ))
                )
            }
        </Layout>
    );
};

export default Hashtag;
