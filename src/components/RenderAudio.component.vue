<template>
    <div class="flex flex-col">
        <div class="text-center">{{ props.audio.name }}</div>
        <audio controls>
            <source :src="props.audio.repositoryPath" />
            Your browser does not support the <code>audio</code> element.
        </audio>
    </div>
</template>

<script setup>
const props = defineProps({
    audio: Object,
});
</script>
