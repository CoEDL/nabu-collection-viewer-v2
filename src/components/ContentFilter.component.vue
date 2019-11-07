<template>
    <div class="inline">
        <el-select
            v-model="selectedFilter"
            placeholder="Filter by..."
            size="small"
            class="style-select"
            clearable
            filterable
            v-if="type === 'select'"
        >
            <el-option-group v-for="group in filters" :key="group.label" :label="group.label">
                <el-option
                    v-for="item in group.options"
                    :key="item.label"
                    :label="item.value.label"
                    :value="item.value"
                    :value-key="item.value.value"
                >
                    <span>{{ item.label }}</span>
                </el-option>
            </el-option-group>
        </el-select>

        <span v-if="type === 'overlay'">
            <el-button @click="dialogVisible = !dialogVisible" size="mini">
                <i class="fas fa-search"></i>
                filter items and collections
            </el-button>
        </span>
        <el-dialog
            title="Filter by..."
            :visible.sync="dialogVisible"
            :fullscreen="true"
            :modal="false"
        >
            <div class="my-4" v-if="selectedFilter">
                Current filter: {{selectedFilter.label}}
                <el-button @click="resetFilter" class="btn-block">
                    <i class="fas fa-redo" data-fa-transform="flip-h"></i>
                    remove filter
                </el-button>
            </div>
            <div
                v-for="group in filters"
                :key="group.label"
                :label="group.label"
                class="style-selections"
            >
                <div class="style-group-heading">{{group.label}}</div>
                <div v-for="item in group.options" :key="item.label">
                    <span @click="handleSelection(item.value)">{{ item.label }}</span>
                </div>
                <br />
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: "select",
            dialogVisible: false
        };
    },
    computed: {
        filters: function() {
            return this.$store.state.filters;
        },
        selectedFilter: {
            get: function() {
                return this.$store.state.selectedFilter;
            },
            set: function(value) {
                this.$store.commit("setSelectedFilter", value || undefined);
            }
        }
    },
    beforeMount() {
        window.addEventListener("resize", this.setType);
        this.setType();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setType);
    },
    methods: {
        setType() {
            this.type = window.innerWidth < 700 ? "overlay" : "select";
        },
        handleSelection(item) {
            this.$store.commit("setSelectedFilter", item || undefined);
            this.dialogVisible = false;
        },
        resetFilter() {
            console.log("reset filter");
            this.$store.commit("setSelectedFilter", undefined);
        }
    }
};
</script>

<style lang="scss" scoped>
.style-select {
    margin-top: -2px;
    width: 100%;
}
@media only screen and (min-width: 600px) {
    .style-select {
        max-width: 500px;
    }
}

.style-group-heading {
    padding: 0 0 5px 0;
    font-size: 1.2em;
    border-bottom: 1px solid #ccc;
}

.style-selections {
    cursor: pointer;
}
</style>
