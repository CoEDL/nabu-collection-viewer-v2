"use strict";

import { compact, groupBy, reduce, uniq, uniqBy, capitalize, orderBy } from "lodash";

const speakerRolesToDisplay = ["participant", "performer", "signer", "singer", "speaker"];
export async function loadData() {
    try {
        let response = await fetch(mapRepositoryRoot("/repository/index.json"));
        if (response.status !== 200) {
            throw new Error(response);
        }
        let { collections, items } = await response.json();
        let { filters } = extractFilters({ collections, items });

        return { items, collections, filters };
    } catch (error) {
        console.log(error);
    }

    function extractFilters({ collections, items }) {
        let filters = {
            classifications: [],
            categories: [],
            people: [],
            languages: [],
        };

        items.forEach((item) => {
            item.classifications.forEach((c) => filters.classifications.push(c.value));
            filters.categories.push(...item.categories);
            item.people.forEach((person) => filters.people.push(person.name));
            filters.languages.push(...item.languages);
        });

        collections.forEach((collection) => {
            collection.classifications.forEach((c) => filters.classifications.push(c.value));
            filters.categories.push(...collection.categories);
            collection.people.forEach((person) => filters.people.push(person.name));
            filters.languages.push(...collection.languages);
        });

        filters.classifications = uniq(filters.classifications);
        filters.categories = uniq(filters.categories);
        filters.people = uniq(filters.people);
        filters.languages = uniq(filters.languages);
        return { filters };
    }
}

export function mapRepositoryRoot(path) {
    try {
        const root =
            process.env.NODE_ENV === "testing" ? "/mobile-viewer/repository" : "/repository";
        return path.replace("/repository", root);
    } catch (error) {
        return path;
    }
}
