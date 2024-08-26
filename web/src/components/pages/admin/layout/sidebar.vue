<template>
    <aside
        class="sidebar w-[var(--sidebar-width)] h-[100vh] z-[999] bg-[var(--white-color)] border-r overflow-scroll fixed left-0 top-[var(--header-height)] bottom-0"
        :class="{ 'sidebar-show-text': sidebarShowText, 'sidebar-not-show-text': !sidebarShowText }"
    >
        <ul class="pl-[20px] py-[20px] pr-[10px] sidebar-item">
            <li
                class="sidebar-list text-[var(--text-color)] text-[16px] font-[500] relative"
                :class="{ 'active-menu-child': isShowMenuChild(item, index) }"
                v-for="(item, index) in menus"
                :key="index"
            >
                <router-link
                    :to="item.path"
                    class="sidebar-link py-[8px] px-[10px] mb-[6px] flex items-center rounded whitespace-nowrap relative]"
                    @click="toggleMenu(index, item, $event)"
                >
                    <font-awesome-icon :icon="item.icon" class="sidebar-link-icon mr-[10px]" />
                    <span v-if="sidebarShowText" class="capitalize">{{ item.title }}</span>
                    <font-awesome-icon
                        :icon="item.show_menu_child_icon"
                        class="show-menu-child-icon text-[12px] mr-[10px] absolute right-0"
                        v-if="
                            item.show_menu_child_icon &&
                            item.child &&
                            item.child.length > 0 &&
                            sidebarShowText
                        "
                    />
                </router-link>

                <ul
                    class="sidebar-menu-child absolute w-full text-center bg-[var(--bg-color)] p-[6px] rounded"
                    :class="{
                        'is-show-menu-child': isShowMenuChild(item, index) && sidebarShowText,
                    }"
                    ref="menuChildRefs"
                >
                    <li
                        class="sidebar-menu-chile-list"
                        v-for="(child, childIndex) in item.child"
                        :key="childIndex"
                    >
                        <router-link
                            :to="child.path"
                            class="sidebar-menu-child-link py-[8px] px-[10px] mb-[6px] block rounded whitespace-nowrap hover:bg-[#52a3cc] hover:text-[var(--white-color)] capitalize"
                        >
                            <font-awesome-icon :icon="child.icon" class="mr-[10px]" />
                            {{ child.title }}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
    import { ref, onMounted, nextTick, watch } from "vue";
    import { useRoute } from "vue-router";
    import { useI18n } from "vue-i18n";

    const props = defineProps({
        logoTitle: String,
        sidebarShowText: Boolean,
    });

    const { t } = useI18n();

    const route = useRoute();
    const activeMenu = ref<number | null>(null);
    const menuChildRefs = ref([]);

    const showMenuChildIcon = ["fas", "chevron-right"];
    const menuChildIcon = ["far", "dot-circle"];

    const menus = [
        {
            title: t("menus.dashboard"),
            path: "/admin",
            icon: ["fas", "home"],
        },
        {
            title: t("menus.products"),
            path: "/admin/product",
            icon: ["fas", "box-open"],
            show_menu_child_icon: showMenuChildIcon,
            child: [
                {
                    title: t("menus.child.product_list"),
                    path: "/admin/product",
                    icon: menuChildIcon,
                },
            ],
        },
    ];

    const toggleMenu = (index: number, menu: any, event: MouseEvent) => {
        const sidebarLink = event.target?.closest("a, router-link");

        if (props.sidebarShowText === false) {
            activeMenu.value = index;
        } else if (
            sidebarLink.getAttribute("href") === menu.path &&
            menu.child &&
            menu.child.length
        ) {
            const showMenuChildIcon = sidebarLink.querySelector(".show-menu-child-icon");

            if (activeMenu.value === index) {
                activeMenu.value = null;
                showMenuChildIcon.classList.add("hide-menu-child");
            } else {
                activeMenu.value = index;
                showMenuChildIcon.classList.remove("hide-menu-child");
            }
        } else {
            activeMenu.value = null;
        }
    };

    const setActiveMenuOnLoad = () => {
        menus.forEach((menu, index) => {
            if (menu.child && menu.path === route.path) {
                activeMenu.value = index;
            }
        });
    };

    const isShowMenuChild = (menu: any, index: number) => {
        if (menu.child && menu.child.length > 0 && activeMenu.value === index) {
            if (props.sidebarShowText === true) {
                handleShowMenuChild(index);
            }
            return true;
        }
    };

    const handleShowMenuChild = (index: number) => {
        nextTick(() => {
            const height = menuChildRefs.value[index].scrollHeight;
            document.documentElement.style.setProperty("--menu-child-height", height + 18 + "px");
        });
    };

    watch(
        () => props.sidebarShowText,
        (newVal) => {
            if (newVal === false) {
                document.documentElement.style.setProperty("--menu-child-height", 0 + "px");
            } else {
                setActiveMenuOnLoad();
            }
        }
    );

    watch(
        () => route.path,
        (newVal) => {
            menus.forEach((item, index) => {
                if (item.path === newVal) {
                    activeMenu.value = index;
                }
            });
        }
    );

    onMounted(() => {
        setActiveMenuOnLoad();
        document.documentElement.style.setProperty("--menu-child-height", 0 + "px");
    });
</script>

<style scoped>
    :root {
        --menu-child-height: 0px;
    }

    .sidebar::-webkit-scrollbar {
        width: 8px;
    }

    .sidebar::-webkit-scrollbar-track {
        border-radius: 8px;
        background-color: none;
    }

    .sidebar::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: #ece8e8;
    }

    .sidebar-link {
        background-color: var(--bg-color);
        transition: all var(--time-delay) ease-in-out;
    }

    .sidebar-link:hover {
        background-color: var(--blue-color);
        color: var(--white-color);
    }

    .sidebar-link.active {
        background-color: var(--blue-color);
        color: var(--white-color);
    }

    .sidebar-link.active > .show-menu-child-icon {
        transform: rotate(90deg);
        transition: transform var(--time-delay) ease-in-out;
    }

    .sidebar-link.active > .show-menu-child-icon.hide-menu-child {
        transform: rotate(0deg);
        transition: transform var(--time-delay) ease-in-out;
    }

    .sidebar-menu-child
        > .sidebar-menu-chile-list
        > .sidebar-menu-child-link.router-link-active.active {
        background-color: #52a3cc;
        color: var(--white-color);
    }

    .sidebar-list {
        transition: all var(--time-delay) ease-in-out;
    }

    .sidebar-list.active-menu-child {
        margin-bottom: var(--menu-child-height);
    }

    .sidebar-menu-child {
        max-height: 0px;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transition: max-height var(--time-delay) ease-in-out, opacity var(--time-delay) ease-in-out,
            visibility var(--time-delay) ease-in-out;
    }

    .sidebar-menu-child.is-show-menu-child {
        max-height: var(--menu-child-height);
        opacity: 1;
        visibility: visible;
    }
</style>
