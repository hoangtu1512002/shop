<template>
    <button
        type="button"
        class="py-[4px] px-[10px] border rounded"
        :class="buttonClass(variant)"
        @click="handleClick"
    >
        <font-awesome-icon :icon="icon" v-if="icon" />
        <slot />
    </button>
</template>

<script setup lang="ts">
    import { useRouter } from "vue-router";

    const router = useRouter();

    const props = defineProps({
        icon: Array,
        path: {
            type: String,
            default: "",
        },
        variant: {
            type: String,
            default: "text",
        },
    });

    const buttonClass = (variant: string) => {
        const variants = {
            text: "text-[var(--text-color)] hover:text-[var(--white-color)] hover:bg-[var(--text-color)] hover:border-[var(--text-color)]",
            primary:
                "text-[var(--blue-color)] hover:text-[var(--white-color)] hover:bg-[var(--blue-color)] hover:border-[var(--blue-color)]",
            danger: "text-[var(--pink-color)] hover:text-[var(--white-color)] hover:bg-[var(--pink-color)] hover:border-[var(--pink-color)]",
        };
        return variants[variant as "text" | "primary" | "danger"];
    };

    const handleClick = () => {
        if (props.path !== "") {
            router.push(props.path);
        }
    };
</script>

<style scoped></style>
