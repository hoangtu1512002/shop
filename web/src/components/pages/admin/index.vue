<template>
    <div class="wrapper">
        <Header
            @toggleSidebar="toggleSidebar"
            :logoTitle="logoTitle"
            :sidebarShowText="sidebarShowText"
        />
        <Sidebar :logoTitle="logoTitle" :sidebarShowText="sidebarShowText" />
        <div
            class="content bg-[var(--bg-color)] h-[100vh] z-[998] mt-[var(--header-height)]"
            :class="{
                'ml-[var(--sidebar-width)]': sidebarShowText,
                'ml-[var(--sidebar-not-show-text)]': !sidebarShowText,
            }"
        >
            <div class="p-[22px]">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    import Header from "./layout/header.vue";
    import Sidebar from "./layout/sidebar.vue";

    var logoTitle = ref("Adminator");
    var sidebarShowText = ref(true);

    const toggleSidebar = () => {
        sidebarShowText.value = !sidebarShowText.value;

        if (sidebarShowText.value === true) {
            setTimeout(() => {
                logoTitle.value = "Adminator";
            }, 300);
        } else {
            logoTitle.value = "";
        }
    };
</script>

<style scoped>
    .content {
        transition: all var(--time-delay) ease-in-out;
    }
</style>
