<template>
    <img :src="props.image.repositoryPath" />
</template>

<script setup>
const props = defineProps({
    image: Object,
});
</script>
