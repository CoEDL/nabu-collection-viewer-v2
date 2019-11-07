<template>
    <div class="style-navbar px-4">
        <div :class="{ 'style-dropdown px-4': showLinks }">
            <div class="row py-2">
                <div class="col">
                    <span class="float-right inline-block md:hidden py-2">
                        <span @click="showLinks = !showLinks">
                            <i class="fas fa-bars style-hamburger"></i>
                        </span>
                    </span>
                    <span class="hidden md:inline-block float-right">
                        <content-filter v-if="menuItems.contentFilter" />
                    </span>
                    <router-link :to="{ path: '/collections'}">
                        <el-button size="mini">
                            <i class="fas fa-layer-group"></i>
                            <span class="hidden md:inline-block">Browse Collections</span>
                        </el-button>
                    </router-link>
                    <router-link :to="{ path: '/items'}">
                        <el-button size="mini">
                            <i class="fas fa-folder-open"></i>
                            <span class="hidden md:inline-block">Browse All Items</span>
                        </el-button>
                    </router-link>
                </div>
            </div>
            <span v-if="showLinks">
                <content-filter v-if="menuItems.contentFilter" />
            </span>
        </div>
    </div>
</template>

<script>
import ContentFilter from "./ContentFilter.component.vue";

export default {
    components: {
        ContentFilter
    },
    data() {
        return {
            watchers: {},
            menuItems: {
                contentFilter: true
            },
            showLinks: false
        };
    },
    mounted() {
        this.watchers.filters = this.$watch("$route.path", this.toggleFilter);
        this.toggleFilter();
    },
    beforeDestroy() {
        this.watchers.filters();
    },
    methods: {
        toggleFilter() {
            if (["/collections", "/items"].includes(this.$route.path)) {
                this.menuItems = {
                    contentFilter: true
                };
            } else {
                this.menuItems = {
                    contentFilter: false
                };
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.style-navbar {
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    z-index: 2;
    background-color: #013243;
}

.style-hamburger {
    font-size: 20px;
}

.style-dropdown {
    // margin: 15px;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 120px;
    z-index: 2;
    overflow: hidden;
    background-color: #013243;
    overflow: hidden;
}

.style-dropdown a:hover {
    color: #fff;
}
</style>

