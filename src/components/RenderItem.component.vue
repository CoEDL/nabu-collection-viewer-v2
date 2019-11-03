<template>
    <el-card class="style-card" shadow="always">
        <div class="text-xl text-center my-2" v-if="item.title">
            <a href v-on:click.prevent="filterByTitle">{{item.title}}</a>
        </div>
        <div class="flex flex-col text-center">
            <div>
                {{item.collectionId}} / {{item.itemId}} /
                <item-information :collectionId="item.collectionId" :itemId="item.itemId" />
            </div>
            <render-image :image="item" v-if="item.type === 'image'" />
            <render-audio :audio="item" v-if="item.type === 'audio'" />
            <render-video :video="item" v-if="item.type === 'video'" />
        </div>
    </el-card>
</template>

<script>
import ItemInformation from "./ItemInformation.component.vue";
import RenderImage from "./RenderImage.component.vue";
import RenderAudio from "./RenderAudio.component.vue";
import RenderVideo from "./RenderVideo.component.vue";

export default {
    props: {
        item: Object
    },
    components: {
        ItemInformation,
        RenderImage,
        RenderAudio,
        RenderVideo
    },
    data() {
        return {
            itemData: {}
        };
    },
    methods: {
        filterByTitle() {
            this.$store.commit("setSelectedFilter", {
                type: "title",
                value: this.item.title
            });
        },
        filterByCollection() {
            this.$store.commit("setSelectedFilter", {
                type: "collectionId",
                value: this.item.collectionId
            });
        },
        filterByItem() {
            this.$store.commit("setSelectedFilter", {
                type: "itemId",
                value: this.item.itemId
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.style-card {
    min-height: 250px;
}
</style>


