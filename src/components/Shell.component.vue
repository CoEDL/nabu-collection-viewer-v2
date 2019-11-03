<template>
    <div>
        <navbar />
        <router-view class="style-main-content-area m-4"></router-view>
    </div>
</template>

<script>
import { loadData } from "../data-loader.service";
import { flattenDeep, includes, orderBy, debounce } from "lodash";
import Navbar from "./Navbar.component.vue";

export default {
    components: {
        Navbar
    },
    data() {
        return {};
    },
    mounted() {
        (async () => {
            try {
                let { items, collections, filters } = await loadData();
                this.$store.commit("saveData", { items, collections });
                this.$store.commit("setFilters", filters);
                if (this.$route.name === "root")
                    this.$router.push({ path: "/collections" });
            } catch (error) {
                console.log(error);
            }
        })();
    }
};
</script>

<style scoped lang="scss">
.style-main-content-area {
    margin-top: 50px;
}
</style>
