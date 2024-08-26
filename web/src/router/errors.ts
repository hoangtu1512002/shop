import { RouteRecordRaw } from "vue-router";

const errors: Array<RouteRecordRaw> = [
    {
        path: "/:catchAll(.*)",
        component: () => import("@/views/errors/404/index.vue"),
        meta: {
            title: "Not found",
        },
    },
];

export default errors;
