<template>
    <header
        class="header h-[var(--header-height)] z-[1000] bg-[var(--white-color)] border-b fixed top-0 right-0 left-0"
    >
        <div class="w-full h-full flex items-center justify-between">
            <div class="flex items-center">
                <router-link to="/admin">
                    <div
                        class="h-[var(--header-height)] border-r flex items-center"
                        :class="{
                            'sidebar-show-text': sidebarShowText,
                            'sidebar-not-show-text': !sidebarShowText,
                        }"
                    >
                        <img src="@/assets/images/logo.webp" class="w-[60px]" alt="logo" />
                        <h1 class="text-[20px] font-medium text-[var(--blue-color)]">
                            {{ logoTitle }}
                        </h1>
                    </div>
                </router-link>
                <button class="p-0 ml-[28px] opacity-80 text-[18px]" @click="toggleSidebar">
                    <font-awesome-icon :icon="['fa', 'bars']" />
                </button>
            </div>

            <div class="mr-[28px] flex items-center gap-[40px]">
                <div class="notifications cursor-pointer relative">
                    <Dropdown>
                        <template #dropdown-btn>
                            <span
                                class="noti-number py-[2px] px-[4px] text-[10px] font-semibold bg-[var(--pink-color)] text-center rounded-full text-[var(--white-color)] absolute right-[-10px] top-[-10px]"
                            >
                                10
                            </span>
                            <span class="notifications-icon text-[20px] text-[var(--text-color)]">
                                <font-awesome-icon :icon="['far', 'bell']" />
                            </span>
                        </template>
                        <template #dropdown-content> noti </template>
                    </Dropdown>
                </div>
                <div class="emails cursor-pointer dropdown-show">
                    <Dropdown>
                        <template #dropdown-btn>
                            <span
                                class="email-number py-[2px] px-[4px] text-[10px] font-semibold bg-[var(--pink-color)] text-center rounded-full text-[var(--white-color)] absolute right-[-10px] top-[-10px]"
                            >
                                10
                            </span>
                            <span class="email-icon text-[20px] text-[var(--text-color)]">
                                <font-awesome-icon :icon="['far', 'envelope']" />
                            </span>
                        </template>
                        <template #dropdown-content> email </template>
                    </Dropdown>
                </div>
                <div class="profile dropdown-show">
                    <Dropdown :width="160">
                        <template #dropdown-btn>
                            <div class="flex items-center cursor-pointer">
                                <span class="profile-img">
                                    <img
                                        class="w-[32px] h-[32px] rounded-full"
                                        src="@/assets/images/profile.jpg"
                                        alt=""
                                    />
                                </span>
                                <h4
                                    class="span-name ml-[5px] text-[14px] font-mono text-[var(--text-color)]"
                                >
                                    John Doe
                                </h4>
                            </div>
                        </template>
                        <template #dropdown-content>
                            <ul class="profile-menu">
                                <li
                                    class="profile-list px-[12px] py-[10px] my-[2px] text-[var(--text-color)] text-[14px] font-[400] cursor-pointer"
                                    v-for="(item, index) in profileMenus"
                                    :key="index"
                                >
                                    <router-link :to="item.link" class="profile-link">
                                        <font-awesome-icon :icon="item.icon" />
                                        <span class="ml-[8px] first-letter:uppercase">{{
                                            item.name
                                        }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </template>
                    </Dropdown>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import Dropdown from "@/components/ui/dropdown/dropdown.vue";
    import auth from "@/api/auth";
import router from "../../../../router";

    defineProps({
        sidebarShowText: Boolean,
        logoTitle: String,
    });

    const emit = defineEmits(["toggleSidebar"]);
    const toggleSidebar = () => {
        emit("toggleSidebar");
    };

    const profileMenus = [
        {
            name: "Cài đặt",
            icon: ["fas", "cog"],
            link: "seting",
        },

        {
            name: "Hồ sơ cá nhân",
            icon: ["far", "user"],
            link: "profile",
        },

        {
            name: "Tin nhắn",
            icon: ["far", "envelope"],
            link: "message",
        },

        {
            name: "Đăng xuất",
            icon: ["fas", "power-off"],
            link: "/admin/logout",
        },
    ];
</script>

<style lang="scss" scoped>
    .profile-list:hover {
        background-color: var(--bg-color);
    }
</style>
