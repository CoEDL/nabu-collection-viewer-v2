<template>
    <router-link :to="linkToCollection()">
        <el-card>
            <template #header>
                <div class="text-xl">{{ collection.collectionId }} : {{ collection.title }}</div>
            </template>
            <div class="p-2">{{ collection.description }}</div>
        </el-card>
    </router-link>
</template>

<script setup>
const props = defineProps({
    collection: {
        type: Object,
        required: true,
    },
});
function linkToCollection() {
    return `/collections/${props.collection.collectionId}`;
}
</script>
