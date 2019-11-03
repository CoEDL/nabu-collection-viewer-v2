<template>
    <div class="remove-padding m-2">
        <div v-for="(chunk, idx) of chunks" :key="idx">
            <div class="flex flex-row items-center">
                <div v-for="collection of chunk" :key="collection.collectionId" class="flex-1 m-1">
                    <render-collection-component :collection="collection" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { chunk } from "lodash";
import Navbar from "./Navbar.component.vue";
import RenderCollectionComponent from "./RenderCollection.component.vue";

export default {
    components: {
        Navbar,
        RenderCollectionComponent
    },
    data() {
        return {
            nChunks: 1
        };
    },
    computed: {
        chunks: function() {
            if (window.innerWidth > 400 && window.innerWidth <= 1024) {
                this.nChunks = 2;
            } else if (window.innerWidth > 1024) {
                this.nChunks = 3;
            }
            return chunk(this.$store.state.collections, this.nChunks);
        }
    }
};
</script>

<style lang="scss" scoped>
.remove-padding {
    padding: 0;
}
</style>


