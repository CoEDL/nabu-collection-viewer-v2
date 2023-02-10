<template>
    <div class="flex flex-col">
        <div class="text-center">{{ props.video.name }}</div>
        <video controls>
            <source :src="props.video.repositoryPath" />
            Your browser does not support the <code>video</code> element.
        </video>
    </div>
</template>

<script setup>
const props = defineProps({
    video: Object,
});
</script>
