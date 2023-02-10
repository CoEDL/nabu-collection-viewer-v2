<template>
    <div>
        <div class="flex flex-col space-y-2 text-left">
            <div class="underline">Description</div>
            <div class="ml-4">{{ props.item.description }}</div>
            <div class="underline">Date</div>
            <div class="ml-4">{{ props.item.date }}</div>
            <div class="underline">People</div>
            <div class="flex flex-col space-y-2">
                <div v-for="(person, idx) of props.item.people" :key="idx">
                    <div class="ml-4 p-1">{{ person.name }} ({{ person.role }})</div>
                </div>
            </div>
            <div class="underline">Languages</div>
            <div class="flex flex-col space-y-2">
                <div v-for="(language, idx) of props.item.languages" :key="idx">
                    <div class="ml-4 p-1">{{ language }}</div>
                </div>
            </div>
            <div class="underline">Categories</div>
            <div class="flex flex-row">
                <div v-for="(category, idx) of props.item.categories" :key="idx">
                    {{ category }}
                </div>
            </div>
            <div class="underline">Citation</div>
            <div class="ml-4">{{ props.item.citation }}</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});
</script>
