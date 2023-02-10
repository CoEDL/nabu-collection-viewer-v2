"use strict";

import { createStore } from "vuex";
import { flattenDeep, orderBy } from "lodash";
import { loadData } from "./components/data-loader.service";

function resetState() {
    return {
        items: [],
        collections: [],
        filters: {},
        selectedFilters: {},
        backup: {
            items: [],
            collections: [],
        },
    };
}
const mutations = {
    reset(state) {
        state = resetState();
    },
    saveData(state, payload) {
        state.collections = orderBy(payload.collections, "collectionId");
        state.backup.collections = orderBy(payload.collections, "collectionId");

        state.items = orderBy(payload.items, ["collectionId", "itemId"]);
        state.backup.items = orderBy(payload.items, ["collectionId", "itemId"]);
    },
    setFilters(state, filters) {
        state.filters = { ...filters };
    },
    setSelectedFilters(state, selectedFilters) {
        state.selectedFilters = { ...selectedFilters };
    },
};
const getters = {};
const actions = {
    async loadData({ commit }) {
        let { items, collections, filters } = await loadData();
        commit("saveData", { items, collections });
        commit("setFilters", filters);
    },
};

export const store = new createStore({
    state: resetState(),
    mutations,
    getters,
    actions,
    modules: {},
});
