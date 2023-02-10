<template>
    <router-link :to="linkToItem()">
        <el-card>
            <template #header>
                <div class="text-xl text-center my-2">{{ item.title }}</div>
            </template>
            <div class="flex flex-col text-center">
                <div>{{ item.collectionId }} / {{ item.itemId }}</div>
                <item-information :item="item" />
            </div>
        </el-card>
    </router-link>
</template>

<script setup>
import ItemInformation from "./ItemInformation.component.vue";

const props = defineProps({
    item: Object,
});
function linkToItem() {
    return `/${props.item.collectionId}/${props.item.itemId}`;
}
</script>
