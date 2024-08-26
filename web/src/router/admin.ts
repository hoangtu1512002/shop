import { RouteRecordRaw } from "vue-router";
import { auth } from "@/api";

const admin: Array<RouteRecordRaw> = [
    {
        path: "/admin",
        component: () => import("@/views/admin/index.vue"),
        children: [
            {
                path: "",
                component: () => import("@/views/admin/dashboard/index.vue"),
                meta: {
                    title: "Dashboard",
                },
            },

            {
                path: "product",
                component: () => import("@/views/admin/product/index.vue"),
                meta: {
                    title: "Admin Product",
                },
            },
        ],
        meta: {
            requiresAuth: true,
        },
    },

    {
        path: "/admin/login",
        component: () => import("@/views/admin/auth/login.vue"),
        meta: {
            title: "Admin Login",
        },
    },

    {
        path: "/admin/logout",
        component: () => null,
        beforeEnter: (_to, _from, next) => {
            auth.logout();
            next({
                path: "/admin/login",
            });
        },
    },
];

export default admin;
