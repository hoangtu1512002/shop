<template>
    <label class="border rounded w-[320px] flex justify-between items-center">
        <input
            type="search"
            v-model="keyword"
            class="outline-none text-[14px] font-[600] text-[var(--text-color)] py-[6px] flex-1 px-[8px] rounded-tl rounded-bl"
            placeholder="Tìm kiếm..."
        />
        <button class="px-[10px] py-[6px] rounded-tr rounded-br hover:text-[var(--blue-color)]">
            <font-awesome-icon :icon="['fas', 'search']" class="text-[14px] font-[200]" />
        </button>
    </label>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    defineProps({
        search: String,
    });

    const keyword = ref<String>("");
</script>

<style scoped></style>
