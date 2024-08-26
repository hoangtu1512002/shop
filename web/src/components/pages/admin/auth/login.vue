<template>
    <div class="bg">
        <div class="admin-login-form">
            <a-form
                :model="formState"
                :rules="rules"
                ref="formRef"
                layout="vertical"
                autocomplete="off"
                class="admin-login-form-content rounded p-[10px]"
                @finish="handleFinish"
            >
                <h1 class="text-[20px] pt-[10px] mb-[40px] text-center text-white">
                    {{ $t("form.login") }}
                </h1>

                <a-form-item :label="$t('field.username')" name="username" :label-col="labelCol">
                    <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item :label="$t('field.password')" name="password" :label-col="labelCol">
                    <a-input-password
                        v-model:value="formState.password"
                        autocomplete="new-password"
                    />
                </a-form-item>

                <a-form-item class="pt-[20px]">
                    <a-button class="btn btn-admin-login p-0" html-type="submit">
                        {{ $t("form.login") }}
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, reactive } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import type { Rule } from "ant-design-vue/es/form";
    import type { FormInstance } from "ant-design-vue";
    import { useI18n } from "vue-i18n";
    import { auth } from "@/api";

    interface FormState {
        username: string;
        password: string;
    }

    const route = useRoute();
    const router = useRouter();

    const { t } = useI18n();

    const formRef = ref<FormInstance>();

    const formState = reactive<FormState>({
        username: "",
        password: "",
    });

    const labelCol = { style: { fontWeight: 600 } };

    const validateUsername = async (rule: Rule, value: string) => {
        if (!value) {
            return notiError("validate.required", rule.field);
        }
    };

    const validatePass = async (rule: Rule, value: string) => {
        if (!value) {
            return notiError("validate.required", rule.field);
        }
    };

    const rules: Record<string, Rule[]> = {
        username: [{ validator: validateUsername, trigger: "change" }],
        password: [{ validator: validatePass, trigger: "change" }],
    };

    const handleFinish = async (values: FormState) => {
        try {
            const redirect = route.query.redirect ? route.query.redirect : "/admin";

            await auth.login("auth/login", JSON.stringify(values));

            router.push(redirect as string);
        } catch (error: any) {
            $alert.error(error);
        }
    };

    const notiError = (trans: string, field: string) => {
        return Promise.reject($alert.error(t(trans, { field: t("field." + field) })));
    };
</script>

<style>
    .bg {
        width: 100vw;
        height: 100vh;
        background-color: #313131;
        background-image: radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0);
        background-size: 30px 30px;
        background-position: -5px -5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .admin-login-form {
        background-color: rgba(255, 255, 255, 0.4);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
        width: 340px;
    }

    .admin-login-form-content {
        background-color: transparent;
    }

    .ant-form-item > .ant-form-item-row > .ant-form-item-label > label {
        color: #fff;
    }

    .ant-input {
        font-size: 14px;
        font-weight: 600;
    }

    .ant-input-affix-wrapper.ant-input-password:focus {
        border-color: var(--blue-color);
        box-shadow: none;
    }

    .ant-input:focus {
        border-color: var(--blue-color);
        box-shadow: none;
    }

    .ant-input-affix-wrapper.ant-input-password:hover {
        border-color: var(--blue-color);
        box-shadow: none;
    }

    .ant-input:hover {
        border-color: var(--blue-color);
        box-shadow: none;
    }

    :where(.css-dev-only-do-not-override-19iuou).ant-input-affix-wrapper:focus,
    :where(.css-dev-only-do-not-override-19iuou).ant-input-affix-wrapper-focused {
        border-color: var(--blue-color);
        box-shadow: none;
    }

    .btn.btn.btn-admin-login {
        width: 100%;
        font-weight: 600;
        padding: 4px 20px;
        color: var(--white-color);
        border-color: var(--border-color);
        background-color: var(--sub-text-color);
        transition: all var(--time-delay) ease-in-out;
    }

    .btn.btn.btn-admin-login:hover {
        background-color: var(--blue-color);
    }

    .btn.btn.btn-admin-login span::first-letter {
        text-transform: uppercase;
    }
</style>
