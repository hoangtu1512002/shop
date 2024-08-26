import { App, h, ref, render } from "vue";
import AlertTemplate from "./alertPluginTemplate.vue";

declare global {
    var $alert: {
        error: (message: string) => void;
        warning: (message: string) => void;
        info: (message: string) => void;
        success: (message: string) => void;
    };
}

const alertPlugin = {
    install(app: App) {
        let alertId = 1;

        const alertContainer = document.createElement("div");

        alertContainer.classList.add(
            "alert-container",
            "flex",
            "flex-col",
            "gap-[10px]",
            "fixed",
            "top-[20px]",
            "right-[20px]"
        );

        const mountAlert = (type: "error" | "warning" | "info" | "success", message: string) => {
            document.body.appendChild(alertContainer);

            const alertContent = document.createElement("div");

            alertContent.id = "alert-content-" + alertId;

            alertId++;

            const props = {
                type,
                message,
            };

            const alertApp = h(AlertTemplate, props);

            render(alertApp, alertContent);

            alertContainer.appendChild(alertContent);

            setTimeout(() => {
                alertContainer.removeChild(alertContent);
                if (alertContainer.childElementCount === 0) {
                    document.body.removeChild(alertContainer);
                    alertId = 1;
                }
            }, 3000);
        };

        const error = (message: string) => mountAlert("error", message);

        const warning = (message: string) => mountAlert("warning", message);

        const info = (message: string) => mountAlert("info", message);

        const success = (message: string) => mountAlert("success", message);

        const alert = {
            error,
            warning,
            info,
            success,
        };

        app.config.globalProperties.$alert = alert;

        globalThis.$alert = alert;
    },
};

export default alertPlugin;
