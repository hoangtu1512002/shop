<template>
    <Alert :type="type" :message="message" banner closable />
</template>

<script setup lang="ts">
    import { Alert } from "ant-design-vue";

    defineProps<{
        type: "success" | "info" | "warning" | "error";
        message: string;
    }>();
</script>

<style>
    .ant-alert {
        width: auto;
        white-space: nowrap;
    }
</style>
