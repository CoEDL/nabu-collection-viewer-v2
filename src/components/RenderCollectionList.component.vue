<template>
    <div class="flex flex-col space-y-4">
        <ContentFilterComponent type="collections" />
        <div v-for="collection of collections" :key="collection.collectionId">
            <render-collection-component :collection="collection" />
        </div>
    </div>
</template>

<script setup>
import RenderCollectionComponent from "./RenderCollection.component.vue";
import ContentFilterComponent from "./ContentFilter.component.vue";
import { intersection } from "lodash";
import { computed } from "vue";
import { useStore } from "vuex";
const $store = useStore();

let collections = computed(() => {
    let filters = Object.keys($store.state.selectedFilters);
    if (!filters.length) return $store.state.collections;
    let collections = $store.state.collections.filter((collection) => {
        let hasFilter = [
            intersection(filters, collection.classifications).length ? true : false,
            intersection(filters, collection.categories).length ? true : false,
            intersection(filters, collection.people).length ? true : false,
            intersection(filters, collection.languages).length ? true : false,
        ];
        return hasFilter.includes(true);
    });
    return collections;
});
</script>
