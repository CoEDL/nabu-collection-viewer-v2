<template>
    <div>
        <navbar class="sticky top-0 z-10" />
        <router-view class="p-4" />
    </div>
</template>

<script setup>
import Navbar from "./Navbar.component.vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const $route = useRoute();
const $router = useRouter();
const $store = useStore();

onMounted(() => {
    if ($route.path === "/") $router.push({ path: "/collections" });
    if ($route.name === "root") $router.push({ path: "/collections" });
    $store.dispatch("loadData");
});
</script>
