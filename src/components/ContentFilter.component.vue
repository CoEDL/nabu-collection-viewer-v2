<template>
    <div class="flex flex-col">
        <div>Apply one or more of the filters below to limit the {{ props.type }}.</div>
        <div class="flex flex-row flex-wrap text-sm">
            <div
                v-for="(filter, idx) of filters"
                :key="idx"
                class="m-1 p-2 rounded cursor-pointer"
                :class="{
                    'bg-orange-400': data.selectedFilters[filter],
                    'bg-teal-200': !data.selectedFilters[filter],
                }"
                @click="applyFilter(filter)"
            >
                {{ filter }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { flattenDeep, compact } from "lodash";
import { useStore } from "vuex";
const $store = useStore();

const props = defineProps({
    type: { type: String, required: true },
});

let data = reactive({
    selectedFilters: $store.state.selectedFilters,
});
let filters = computed(() => {
    let filters = Object.keys($store.state.filters).map((key) => $store.state.filters[key]);
    filters = flattenDeep(filters);
    return compact(filters);
});
function applyFilter(filter) {
    if (data.selectedFilters[filter]) {
        delete data.selectedFilters[filter];
    } else {
        data.selectedFilters[filter] = true;
    }
    $store.commit("setSelectedFilters", data.selectedFilters);
}
</script>
