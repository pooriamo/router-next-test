import React, {useEffect, useState} from 'react';
import Layout from "components/Layout";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useAuth } from "utils/auth";
import Router from "next/router";
import { useForm } from "react-hook-form";
import useRequest from "utils/useRequest";
import {api} from "utils/api";
import axios from 'axios';

const CreateFeed = () => {
    const auth = useAuth();
    const { register, handleSubmit, errors } = useForm();
    const { data: hashtags } = useRequest(api('/hashtags'));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!auth.isLoggedIn) {
            Router.push('/login')
        }
    }, []);

    const onSubmit = async (data: any) => {
        setIsLoading(false);

        try {
            await axios({
                method: 'POST',
                url: api('/feed'),
                data
            });

            await Router.push('/');
        } catch (e) {
            setIsLoading(false);
        }
    };

    return (
        <Layout title="login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mx="auto" my={5} display="table">
                    <Box mb={2}>
                        <TextField
                            label="Title"
                            name="title"
                            inputRef={register({ required: true })}
                            error={errors.title}
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            multiline
                            label="Content"
                            name="content"
                            inputRef={register({ required: true })}
                        />
                    </Box>

                    {hashtags && <Box mb={2}>
                        <TextField
                            name="hashtag"
                            inputProps={{
                                list: "hashtags"
                            }}
                            inputRef={register}
                        />

                        <datalist id="hashtags">
                            {hashtags.map((hashtag: any) => <option value={hashtag.name} key={hashtag.id} />)}
                        </datalist>
                    </Box>}

                    <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                        Create Feed
                    </Button>
                </Box>
            </form>
        </Layout>
    );
};

export default CreateFeed;
