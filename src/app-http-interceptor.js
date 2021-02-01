import axios from 'axios';

async function initHttpInterceptor(getToken) {
    // Add a request interceptor
    const token = await getToken();

    axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    });
}

export default initHttpInterceptor;