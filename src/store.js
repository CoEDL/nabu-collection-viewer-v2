'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import {flattenDeep, orderBy} from 'lodash';
Vue.use(Vuex);

const configuration = {
    strict: process.env.NODE_ENV !== 'production',
    state: {
        items: [],
        collections: [],
        filters: [],
        selectedFilter: undefined,
    },
    mutations: {
        reset(state) {
            state = {
                items: [],
                collections: [],
                filters: [],
                selectedFilter: [],
            };
        },
        saveData(state, payload) {
            state.items = orderBy(payload.items, ['collectionId', 'itemId']);
            state.collections = orderBy(payload.collections, 'collectionId');
        },
        setFilters(state, filters) {
            state.filters = [...filters];
        },
        setSelectedFilter(state, selectedFilter) {
            state.selectedFilter = selectedFilter;
        },
    },
    getters: {
        itemsFlattened: state => {
            return flattenDeep(
                state.items.map(item => {
                    let components = [];
                    if (item.images.length) {
                        components.push({
                            ...item.images[0],
                            images: item.images,
                        });
                    }
                    return [...components, ...item.audio, ...item.video];
                })
            );
        },
        item: state => ({collectionId, itemId}) => {
            return state.items.filter(item => {
                return (
                    item.collectionId === collectionId && item.itemId === itemId
                );
            })[0];
        },
    },
};
export const store = new Vuex.Store(configuration);
