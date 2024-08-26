import axiosClient from "./axiosClient";

const auth = {
    login: async (url: string, params: any) => {
        try {
            const response = await axiosClient.post(url, params);
            sessionStorage.setItem("token", response.token);
        } catch (error: any) {
            throw error.response.data;
        }
    },

    logout: () => {
        sessionStorage.removeItem("token");
    },
};

export default auth;
