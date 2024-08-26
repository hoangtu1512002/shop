import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index.ts";

import "@/assets/styles/base.css";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import loadingPlugin from "./plugins/loading/loadingPlugin";
import alertPlugin from "./plugins/alert/alertPlugin";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { createI18n, useI18n } from "vue-i18n";
import vi from "./locale/vi.json";

import {
    faBars,
    faPowerOff,
    faCog,
    faHome,
    faBoxOpen,
    faChevronRight,
    faPlusCircle,
    faSearch,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
    faEnvelope,
    faBell,
    faUser,
    faDotCircle,
    faEye,
    faEdit,
    faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

const icon = [
    faBars,
    faEnvelope,
    faBell,
    faPowerOff,
    faCog,
    faUser,
    faHome,
    faBoxOpen,
    faDotCircle,
    faChevronRight,
    faPlusCircle,
    faSearch,
    faEye,
    faEdit,
    faTrashAlt,
    faArrowLeft,
];

library.add(...icon);

const i18n = createI18n({
    locale: "vi",
    messages: {
        vi: vi,
    },
});

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(Antd);
app.use(loadingPlugin);
app.use(alertPlugin);
app.use(i18n);
app.mount("#app");
