import axios, { AxiosResponse } from 'axios';

const http = axios.create({
    timeout: 30000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        "Access-Control-Allow-Headers": "*"
    },
    proxy: {
        host: 'localhost',
        port: 5001
    }
});

export default http;