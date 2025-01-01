import axios from 'axios';
import {useAuthStore} from "~/store";

const getClient = function () {

    const {token} = useAuthStore();

    const bearerToken = (token.value as string);
    console.log(`Token used in API calls: ${bearerToken}`);

    const _client = axios.create({
        baseURL: 'https://api.proxynova.com',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + bearerToken
        }

    });

    _client.interceptors.response.use(async function (response) {

        // TODO: if has data, just return response.data

        // Add 1 ms delay
        await new Promise((resolve) => setTimeout(resolve, 1));
        return response;

    }, function (error) {

        let errorString = "";

        if (error.response && error.response.data) {

            if ('error' in error.response.data) {
                errorString = error.response.data.error;
            } else {
                errorString = error.response.data;
            }

        } else if (error.message) {
            errorString = error.message;
        } else {
            errorString = error.toString();
        }

        return Promise.reject(errorString);
    });

    return _client;
}


class Api {

    constructor() {
        // do nothing
    }

    get client() {
        return getClient();
    }

    async getTokenInfo(token: string) {

        const {data} = await getClient().get('/v1/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return data?.data;
    }

    async alerts() {
        const {data} = await getClient().get('/v1/reddit/alerts');
        return data;
    }

    async newAlert(params) {

        params = {...{name: '', keywords: '', subreddits: '', sort: 'new', time_range: '1d'}, ...params};

        const {data} = await getClient().post('/v1/reddit/alerts', params);
        return data;
    }

    async updateAlert(id: number, params) {
        const {data} = await getClient().patch('/v1/reddit/alerts/' + id, params);
        return data;
    }

    async deleteAlert(id: number) {
        const {data} = await getClient().delete('/v1/reddit/alerts/' + id);
        return data;
    }

    async posts(params = {}) {

        let defaultParams = {
            'sort': "",
            'time_range': "1d",
            'alert_id': 0
        };

        const queryParams = {...defaultParams, ...params};

        const {data} = await getClient().get('/v1/reddit/results', {
            params: queryParams
        });
        return data;
    }

    async stats() {
        const {data} = await getClient().get('/v1/reddit/stats');
        return data;
    }
}

export default new Api();