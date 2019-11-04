<template>
    <div>
        <div class="my-2">
            <div class="text-sm">Filter items:</div>
            <div class="flex flex-row flex-wrap">
                <el-button
                    @click="filterItems = []"
                    size="mini"
                    type="text"
                    :disabled="!filterItems.length"
                >
                    <i class="fas fa-ban"></i>&nbsp;reset filters
                </el-button>

                <el-tag
                    v-for="(item, idx) of collectionItemIds"
                    :key="idx"
                    class="cursor-pointer m-1"
                    :size="item.size"
                    :type="item.type"
                    @click="toggleItem(item)"
                >{{item.itemId}}</el-tag>
            </div>
        </div>
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
import { chunk, uniq, without } from "lodash";
import RenderItemComponent from "./RenderItem.component.vue";

export default {
    components: {
        RenderItemComponent
    },
    data() {
        return {
            nChunks: 1,
            filterItems: []
        };
    },
    computed: {
        items: function() {
            return this.$store.getters.itemsFlattened.filter(
                item =>
                    item.collectionId === this.$route.params.collectionId &&
                    !this.filterItems.includes(item.itemId)
            );
        },
        itemFilters: function() {
            return this.$store.getters.itemsFlattened.filter(
                item => item.collectionId === this.$route.params.collectionId
            );
        },
        chunks: function() {
            if (window.innerWidth > 400 && window.innerWidth <= 1024) {
                this.nChunks = 2;
            } else if (window.innerWidth > 1024) {
                this.nChunks = 3;
            }
            return chunk(this.items, this.nChunks);
        },
        collectionItemIds: function() {
            const itemIds = uniq(
                this.itemFilters.map(item => item.itemId)
            ).sort();
            return itemIds.map(itemId => {
                return {
                    itemId: itemId,
                    type: this.filterItems.includes(itemId)
                        ? "warning"
                        : "success",
                    size: window.innerWidth < 768 ? "mini" : "medium"
                };
            });
        }
    },
    methods: {
        toggleItem(item) {
            this.filterItems = this.filterItems.includes(item.itemId)
                ? without(this.filterItems, item.itemId)
                : [...this.filterItems, item.itemId];
        }
    }
};
</script>


<style lang="scss" scoped>
</style>