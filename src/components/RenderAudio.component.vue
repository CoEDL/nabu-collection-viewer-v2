<template>
    <div class="my-2">
        <div class="row">
            <div class="col text-center">{{audio.name}}</div>
        </div>
        <div class="row">
            <div class="col text-center style-audio-icon" @click="dialogVisible = !dialogVisible">
                <i class="fal fa-volume-up"></i>
            </div>
        </div>

        <el-dialog
            :visible.sync="dialogVisible"
            :fullscreen="true"
            :before-close="beforeClose"
            @open="play"
        >
            <div class="my-2 text-center">
                <div class="style-headline text-center style-tile-title">{{audio.title}}</div>
                <div class="row my-2">
                    <div class="col style-item-id">
                        {{audio.collectionId}} /
                        {{audio.itemId}} /
                        <item-information
                            :collectionId="audio.collectionId"
                            :itemId="audio.itemId"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">{{audio.name}}</div>
                </div>
                <div class="row my-2">
                    <div class="col style-audio-icon" @click="dialogVisible = !dialogVisible">
                        <!-- <router-link :to="{ name: 'viewAudio', params: { audio: audio }}"> -->
                        <i class="fal fa-volume-up"></i>
                        <!-- </router-link> -->
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <audio controls autoplay ref="audioElement" class="style-audio-element">
                            <source :src="item" v-for="(item, idx) of audio.item" :key="idx" />Your browser does not support the
                            <code>audio</code> element.
                        </audio>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ItemInformation from "./ItemInformation.component.vue";

export default {
    props: {
        audio: Object
    },
    components: {
        ItemInformation
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        beforeClose() {
            this.$refs["audioElement"].pause();
            this.dialogVisible = false;
        },
        play() {
            setTimeout(() => {
                this.$refs["audioElement"].play();
            }, 500);
        }
    }
};
</script>

<style lang="scss" scoped>
.style-audio-icon {
    cursor: pointer;
    font-size: 5em;
}

.style-audio-element {
    width: 90%;
}
</style>



