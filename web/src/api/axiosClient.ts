import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    function (config) {
        $loading.show();
        const access_token = sessionStorage.getItem("access_token");
        if (access_token) {
            config.headers.Authorization = "Bearer " + access_token;
        }
        return config;
    },

    function (error) {
        $loading.hide();
        throw error;
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        $loading.hide();
        if (response && response.data) {
            return response.data;
        }
        return response;
    },

    function (error) {
        $loading.hide();
        throw error;
    }
);

export default axiosClient;
