import useSWR from 'swr';
import axios from 'axios';
import { useAuth } from "./auth";

export default function useRequest(request: any, { initialData, ...config }: any = {}) {
    const auth = useAuth();
    if (typeof request === 'string') {
        request = {
            url: request
        }
    }

    if (request && auth) {
        request.headers = {
            ...request.headers,
            'Authorization': 'Bearer ' + auth.token
        }
    }

    const { data: response, error, isValidating, mutate } = useSWR(
        request && JSON.stringify(request),
        () => axios(request || {}),
        {
            ...config,
            initialData: initialData && {
                status: 200,
                statusText: 'InitialData',
                headers: {},
                data: initialData
            }
        }
    );

    return {
        data: response && response.data,
        response,
        error,
        isValidating,
        mutate
    }
}
