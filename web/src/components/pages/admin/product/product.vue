<template>
    <div class="product">
        <div class="product-head flex justify-between items-center p-[6px]">
            <div class="product-head-left">
                <h1 class="text-[var(--text-color)] text-[18px] font-[600] mb-[6px] capitalize">
                    {{ $t("page_title.title", { field: t("text.product") }) }}
                </h1>
                <h4 class="text-[var(--sub-text-color)] text-[16px] font-[400]">
                    {{ $t("page_title.sub_title", { field: t("text.product") }) }}
                </h4>
            </div>
            <div class="product head-right mr-[10px]">
                <router-link
                    to="/admin/product"
                    class="btn-created capitalize bg-[var(--blue-color)] text-white py-[8px] px-[12px] rounded text-[14px] font-[600] hover:bg-[var(--text-color)] duration-300"
                >
                    <font-awesome-icon :icon="['fas', 'plus-circle']" />
                    {{ $t("button.add", { field: $t("text.product") }) }}
                </router-link>
            </div>
        </div>

        <div class="product-list p-[6px] mt-[10px] bg-white border">
            <div class="product-list-head card p-[20px] border-b">
                <div class="card-header">
                    <div class="product-list-seach">
                        <InputSearch />
                    </div>

                    <div class="product-list-sort"></div>
                </div>
            </div>

            <div class="product-list-content card-body p-[20px] mt-[20px]">
                <a-table
                    :locale="customLocale"
                    :columns="columns"
                    :data-source="data"
                    :row-selection="selection"
                    :pagination="{pageSize: 10}"
                    row-key="id"
                    bordered
                    size="small"
                >
                    <template #bodyCell="{ column, record  }">
                        <template v-if="column.key === 'status'">
                            <a-tag :color="record.status === 1 ? 'success' : 'error'">
                                {{ record.status === 1 ? $t("text.effect") : $t("text.invalid") }}
                            </a-tag>
                        </template>

                        <template v-else-if="column.key === 'action'">
                           <div class="flex gap-[4px]">
                                <Button :icon="['far', 'eye']" variant="primary"/>
                                <Button :icon="['far', 'edit']" variant="text"/>
                                <Button :icon="['far', 'trash-alt']" variant="danger"/>
                           </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useI18n } from "vue-i18n";

    import Button from "@/components/ui/button/button.vue";
    import InputSearch from "@/components/ui/input/inputSearch.vue";

    const { t } = useI18n();

    interface DataItem {
        id: number;
        product: string;
        code: string;
        total: number;
        price: number;
        status: number;
        category: string;
        branch: string;
    }

    const customLocale = {
        emptyText: t("text.empty_data"),
    };

    const columns = [
        {
            title: t("table.table", { field: t("text.product") }),
            dataIndex: "product",
            key: "product",
        },

        {
            title: t("table.code", { field: t("text.product") }),
            dataIndex: "code",
            key: "code",
        },

        {
            title: t("table.total"),
            dataIndex: "total",
            key: "total",
        },

        {
            title: t("table.price"),
            dataIndex: "price",
            key: "price",
        },

        {
            title: t("table.status"),
            dataIndex: "status",
            key: "status",
        },

        {
            title: t("table.category", { field: t("text.product") }),
            dataIndex: "category",
            key: "category",
        },

        {
            title: t("table.branch"),
            dataIndex: "branch",
            key: "branch",
        },

        {
            title: t("table.action"),
            key: "action",
            width: "8%"
        },
    ];

    const data: DataItem[] = [
        {
            id: 1,
            product: "sản phẩm 1",
            code: "code-1",
            total: 10,
            price: 1000,
            status: 1,
            category: "Pc",
            branch: "lenovo",
        },

        {
            id: 2,
            product: "sản phẩm 1",
            code: "code-1",
            total: 10,
            price: 1000,
            status: 1,
            category: "Pc",
            branch: "lenovo",
        },

        {
            id: 3,
            product: "sản phẩm 1",
            code: "code-1",
            total: 10,
            price: 1000,
            status: 1,
            category: "Pc",
            branch: "lenovo",
        },
    ];

    const selection = ref({
        checkStrictly: false,
    });
</script>

<style scoped></style>
