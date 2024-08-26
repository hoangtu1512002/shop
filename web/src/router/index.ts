import { createRouter, createWebHistory } from "vue-router";

import admin from "./admin";
import front from "./front";
import errors from "./errors";

const routes = [...admin, ...front, ...errors];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: "active",
});

router.beforeEach((to, _from, next) => {
    const isAdminRoute = to.fullPath.includes("/admin");
    if (isAdminRoute && to.meta.requiresAuth && isLoggedIn() === false) {
        $loading.show();
        next({
            path: "/admin/login",
            query: { redirect: to.fullPath },
        });
    } else {
        $loading.show();
        next();
    }
});

router.afterEach((to) => {
    $loading.hide();
    document.title = to.meta.title as string;
});

const isLoggedIn = () => {
    const token = sessionStorage.getItem("token");
    return token !== null;
};

export default router;
