import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api'

const instance = axios.create({
    baseURL:baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const axiosPrivateInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})


export default instance;