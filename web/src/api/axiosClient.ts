import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://fakestoreapi.com/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    function (config) {
        $loading.show();
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = "Bearer " + token;
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
