<template>
    <div>
        <div v-for="(chunk, idx) of chunks" :key="idx">
            <div class="flex flex-row items-center">
                <div v-for="(item, idx) of chunk" :key="idx" class="flex-1 m-1">
                    <render-item-component :item="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { chunk } from "lodash";
import RenderItemComponent from "./RenderItem.component.vue";

export default {
    components: {
        RenderItemComponent
    },
    data() {
        return {
            nChunks: 1
        };
    },
    computed: {
        chunks: function() {
            let items = this.$store.getters.itemsFlattened.filter(
                item => item.collectionId === this.$route.params.collectionId
            );
            if (window.innerWidth > 400 && window.innerWidth <= 1024) {
                this.nChunks = 2;
            } else if (window.innerWidth > 1024) {
                this.nChunks = 3;
            }
            return chunk(items, this.nChunks);
        }
    },
    mounted() {}
};
</script>


<style lang="scss" scoped>
</style>