<template>
    <div>
        <div class="flex flex-col space-y-4">
            <div v-for="(item, idx) of items" :key="idx" class="">
                <RenderItemComponent :item="item" />
            </div>
        </div>
    </div>
</template>

<script setup>
import RenderItemComponent from "./RenderItem.component.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const $route = useRoute();
const $store = useStore();

let items = computed(() => {
    return $store.state.items.filter((i) => i.collectionId === $route.params.collectionId);
});
</script>
