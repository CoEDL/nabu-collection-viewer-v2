<template>
    <span>
        <el-button
            type="text"
            @click="dialogVisible = !dialogVisible"
            size="small"
            class="style-information-button"
        >
            info
            <i class="fas fa-caret-down"></i>
        </el-button>
        <el-dialog :visible.sync="dialogVisible" :fullscreen="true" :modal="false">
            <span class="style-item-information">
                <div class="row py-2">
                    <div class="col-12 col-md col-lg col-xl style-information-title">Title</div>
                    <div class="col-12 col-md-10 col-lg-10 col-xl-10">{{item.title}}</div>
                </div>
                <div class="row py-2">
                    <div class="col-12 col-md col-lg col-xl style-information-title">Date</div>
                    <div class="col-12 col-md-10 col-lg-10 col-xl-10">{{item.date}}</div>
                </div>
                <div class="row py-2">
                    <div class="col-12 col-md col-lg col-xl style-information-title">Metadata</div>
                    <div
                        class="col-12 col-md-10 col-lg-10 col-xl-10"
                    >{{item.collectionId}} / {{item.itemId}}</div>
                </div>
                <div class="row py-2" v-if="speakers.length">
                    <div class="col-12 col-md col-lg col-xl style-information-title">Speakers</div>
                    <div class="col-12 col-md-10 col-lg-10 col-xl-10">
                        <div v-for="(speaker, idx) of speakers" :key="idx">{{speaker}}</div>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-12 col-md col-lg col-xl style-information-title">Description</div>
                    <div class="col-12 col-md-10 col-lg-10 col-xl-10">{{item.description}}</div>
                </div>
                <div class="row py-2">
                    <div class="col-12 col-md col-lg col-xl style-information-title">Citation</div>
                    <div class="col-12 col-md-10 col-lg-10 col-xl-10">{{item.citation}}</div>
                </div>
            </span>
        </el-dialog>
    </span>
</template>

<script>
import { compact } from "lodash";

export default {
    props: {
        itemId: String,
        collectionId: String
    },
    computed: {
        item: function() {
            return this.$store.getters.item({
                collectionId: this.collectionId,
                itemId: this.itemId
            });
        },
        speakers: function() {
            let people = this.item.people.map(person => {
                if (this.speakerRolesToDisplay.includes(person.role))
                    return person.name;
            });
            return compact(people);
        }
    },
    data() {
        return {
            speakerRolesToDisplay: [
                "participant",
                "performer",
                "signer",
                "singer",
                "speaker"
            ],
            dialogVisible: false
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
@import "assets/variables.scss";

.style-information-button {
    color: $background-color-dark;
}

.style-item-information {
    text-align: left;
    font-size: 20px;
    letter-spacing: 1px;
    color: $background-color-dark;
}

.style-information-title {
    font-weight: 500;
    font-size: 24px;
}
</style>

