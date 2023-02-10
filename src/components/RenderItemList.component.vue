<template>
    <div class="flex flex-col space-y-4">
        <ContentFilterComponent type="items" />
        <div v-for="item of items" :key="item.itemId">
            <render-item-component :item="item" />
        </div>
    </div>
</template>

<script setup>
import RenderItemComponent from "./RenderItem.component.vue";
import ContentFilterComponent from "./ContentFilter.component.vue";
import { intersection } from "lodash";
import { computed } from "vue";
import { useStore } from "vuex";
const $store = useStore();

let items = computed(() => {
    let filters = Object.keys($store.state.selectedFilters);
    if (!filters.length) return $store.state.items;
    let items = $store.state.items.filter((item) => {
        let hasFilter = [
            intersection(filters, item.classifications).length ? true : false,
            intersection(filters, item.categories).length ? true : false,
            intersection(
                filters,
                item.people.map((p) => p.name)
            ).length
                ? true
                : false,
            intersection(filters, item.languages).length ? true : false,
        ];
        return hasFilter.includes(true);
    });
    return items;
});
</script>
