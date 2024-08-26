import { RouteRecordRaw } from "vue-router";

const front: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("@/views/front/index.vue"),
        children: [
            {
                path: "",
                component: () => import("@/views/front/home/index.vue"),
                meta: {
                    title: "Home",
                },
            },

            {
                path: "home",
                component: () => import("@/views/front/home/index.vue"),
                meta: {
                    title: "Home",
                },
            },
        ],
    },
];

export default front;
