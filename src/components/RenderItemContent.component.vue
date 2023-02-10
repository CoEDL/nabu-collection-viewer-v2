<template>
    <div v-if="item && item.itemId">
        <div class="flex flex-col space-y-2 text-center">
            <div class="text-xl">{{ item.title }}</div>
            <div>{{ item.collectionId }} / {{ item.itemId }}</div>
        </div>
        <el-tabs v-model="data.activeTab">
            <el-tab-pane label="Images" name="images" v-if="item.images.length">
                <div class="grid grid-cols-1 gap-2">
                    <div v-for="(image, idx) of item.images" :key="item" :name="image.name">
                        <RenderImage :image="image" class="md:mx-auto" />
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Audio" name="audio" v-if="item.audio.length">
                <div class="flex flex-col space-y-10" v-if="data.activeTab === 'audio'">
                    <RenderAudio
                        v-for="(audio, idx) of item.audio"
                        :key="idx"
                        :audio="audio"
                    ></RenderAudio>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Video" name="video" v-if="item.video.length">
                <div class="flex flex-col space-y-10" v-if="data.activeTab === 'video'">
                    <RenderVideo
                        v-for="(video, idx) of item.video"
                        :key="idx"
                        :video="video"
                    ></RenderVideo>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import RenderImage from "./RenderImage.component.vue";
import RenderAudio from "./RenderAudio.component.vue";
import RenderVideo from "./RenderVideo.component.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, reactive } from "vue";
const $route = useRoute();
const $store = useStore();

let data = reactive({
    activeTab: "images",
});
let item = computed(() => {
    let item = $store.state.items.filter(
        (item) =>
            item.collectionId === $route.params.collectionId && item.itemId === $route.params.itemId
    )[0];
    if (item?.images?.length) {
        data.activeTab = "images";
    } else if (item?.audio?.length) {
        data.activeTab = "audio";
    } else if (item?.video?.length) {
        data.activeTab = "video";
    }
    return item;
});
</script>
