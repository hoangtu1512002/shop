<template>
    <div>
        <div @click="showDropDown" class="dropdown-btn">
            <slot name="dropdown-btn"></slot>
        </div>
        <div
            ref="show"
            class="dropdown-content absolute top-[32px] right-0 bg-[var(--white-color)] border mt-[10px] rounded"
            :style="{ width: width + 'px', height: height + 'px' }"
        >
            <slot name="dropdown-content" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";

    defineProps({
        width: Number,
        height: Number,
    });

    const show = ref<HTMLElement | null>(null);

    const showDropDown = (e: any) => {
        const dropdown = e.currentTarget;
        const dropdownContent = dropdown.nextElementSibling as HTMLElement;

        if (dropdown.nextElementSibling.innerHTML.trim() !== "") {
            dropdownContent.classList.toggle("show");
        }
    };

    const handleClickOutside = (e: any) => {
        const dropdowns = document.querySelectorAll(".dropdown-btn");

        dropdowns.forEach((dropdown) => {
            if (dropdown?.contains(e.target) === false) {
                dropdown.nextElementSibling?.classList.remove("show");
            }
        });
    };

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
    });
</script>

<style scoped>
    .dropdown-content {
        display: none;
    }

    .dropdown-content.show {
        display: block;
    }
</style>
