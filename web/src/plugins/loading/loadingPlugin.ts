import { App, createApp, ref, h } from "vue";
import LoadingTemplate from "./loadingTemplate.vue";

declare global {
    var $loading: {
        show: () => void;
        hide: () => void;
        visible: boolean;
    };
}

const loadingPlugin = {
    install(app: App) {
        const loadingVisible = ref(false);

        const show = () => {
            loadingVisible.value = true;
        };

        const hide = () => {
            loadingVisible.value = false;
        };

        const loadingApp = createApp({
            setup() {
                return { visible: loadingVisible };
            },
            render() {
                return this.visible ? h(LoadingTemplate) : null;
            },
        });

        const loadingInstance = loadingApp.mount(document.createElement("div"));

        document.body.appendChild(loadingInstance.$el);

        const loading = {
            show,
            hide,
            visible: loadingVisible.value,
        };

        app.config.globalProperties.$loading = loading;

        globalThis.$loading = loading;
    },
};

export default loadingPlugin;
