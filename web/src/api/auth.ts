import axiosClient from "./axiosClient";

const auth = {
    login: async (url: string, params: any) => {
        try {
            const response = await axiosClient.post(url, params);
            sessionStorage.setItem("access_token", response.access_token);
            sessionStorage.setItem("refesh_token", response.refresh_token);
        } catch (error: any) {
            throw error.response.data;
        }
    },

    logout: () => {
        sessionStorage.removeItem("access_token");
    },
};

export default auth;
