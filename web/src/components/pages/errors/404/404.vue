<template>
    <div class="bg">
        <div class="text-center">
            <h1 class="text-[var(--pink-color)] text-[120px]">404</h1>
            <h2 class="text-[var(--pink-color)] text-[100px]">Page Not Found</h2>
            <router-link
                to="/admin"
                class="text-[var(--pink-color)] text-[40px] hover:text-[var(--blue-color)]"
            >
                <font-awesome-icon :icon="['fas', 'arrow-left']" /> Back
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
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
</style>
