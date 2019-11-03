'use strict';

import {groupBy, reduce, uniq, capitalize, orderBy} from 'lodash';

const speakerRolesToDisplay = [
    'participant',
    'performer',
    'signer',
    'singer',
    'speaker',
];
export async function loadData() {
    try {
        let response = await fetch(mapRepositoryRoot('/repository/index.json'));
        if (response.status !== 200) {
            throw new Error(response);
        }
        let {collections, items} = await response.json();
        items = postprocess(items);
        let filters = extractFilters(items);

        items = items.map(item => {
            item.images = item.images.map(image => {
                image.item.path = mapRepositoryRoot(image.item.path);
                image.item.thumbnail = mapRepositoryRoot(image.item.thumbnail);
                return image;
            });
            item.audio = item.audio.map(audio => {
                audio.item = audio.item.map(file => mapRepositoryRoot(file));
                return audio;
            });
            item.video = item.video.map(video => {
                video.item = video.item.map(file => mapRepositoryRoot(file));
                return video;
            });
            item.documents = item.documents.map(document => {
                document.path = mapRepositoryRoot(document.path);
                return document;
            });
            return item;
        });
        return {items, collections, filters};
    } catch (error) {
        console.log(error);
    }

    function postprocess(items) {
        let classifications;
        items = items.map(item => {
            let images = item.images.map(image => {
                return {
                    itemId: item.itemId,
                    collectionId: item.collectionId,
                    title: item.title,
                    type: 'image',
                    item: image,
                    name: image.name,
                    speakers: item.speakers.map(s => s.name),
                    ...extractClassifications(item.classifications),
                };
            });
            images = orderBy(images, 'name');
            let audio = item.audio.map(a => {
                return {
                    itemId: item.itemId,
                    collectionId: item.collectionId,
                    title: item.title,
                    type: 'audio',
                    item: a.files,
                    name: a.name,
                    speakers: item.speakers.map(s => s.name),
                    ...extractClassifications(item.classifications),
                };
            });
            let video = item.video.map(v => {
                return {
                    itemId: item.itemId,
                    collectionId: item.collectionId,
                    title: item.title,
                    type: 'video',
                    item: v.files,
                    name: v.name,
                    speakers: item.speakers.map(s => s.name),
                    ...extractClassifications(item.classifications),
                };
            });
            return {
                ...item,
                images,
                audio,
                video,
            };
        });
        return items;
    }

    function extractFilters(data) {
        let filters = {
            speakers: {},
            classifications: {},
            collectionId: {},
            itemId: {},
            title: {},
        };
        data.forEach(d => {
            if (d.speakers) {
                d.speakers.forEach(s => {
                    if (speakerRolesToDisplay.includes(s.role))
                        filters.speakers[s.name] = 1;
                });
            }
            if (d.classifications) {
                d.classifications.forEach(c => {
                    Object.keys(c).forEach(key => {
                        if (!filters.classifications[key]) {
                            filters.classifications[key] = [];
                        }
                        filters.classifications[key].push(c[key]);
                    });
                });
            }
            filters.collectionId[d.collectionId] = 1;
            filters.itemId[d.itemId] = 1;
            filters.title[d.title] = 1;
        });
        let f = [
            {
                label: 'Speakers',
                options: Object.keys(filters.speakers)
                    .sort()
                    .map(k => {
                        return {
                            label: k,
                            value: {
                                type: 'speakers',
                                value: k,
                                label: `Speaker: ${k}`,
                            },
                        };
                    }),
            },
            {
                label: 'Titles',
                options: Object.keys(filters.title)
                    .sort()
                    .map(k => {
                        return {
                            label: k,
                            value: {
                                type: 'title',
                                value: k,
                                label: `Title: ${k}`,
                            },
                        };
                    }),
            },
            {
                label: 'collections',
                options: Object.keys(filters.collectionId)
                    .sort()
                    .map(k => {
                        return {
                            label: k,
                            value: {
                                type: 'collectionId',
                                value: k,
                                label: `Collection: ${k}`,
                            },
                        };
                    }),
            },
            {
                label: 'Items',
                options: Object.keys(filters.itemId)
                    .sort()
                    .map(k => {
                        return {
                            label: k,
                            value: {
                                type: 'itemId',
                                value: k,
                                label: `Item: ${k}`,
                            },
                        };
                    }),
            },
        ];

        Object.keys(filters.classifications)
            .sort()
            .forEach(c => {
                f.push({
                    label: capitalize(c),
                    options: uniq(filters.classifications[c]).map(
                        classification => {
                            return {
                                label: classification,
                                value: {
                                    type: c,
                                    value: classification,
                                    label: `${capitalize(
                                        c
                                    )}: ${classification}`,
                                },
                            };
                        }
                    ),
                });
            });
        return f;
    }

    function extractClassifications(classifications) {
        return reduce(classifications);
    }
}

export function mapRepositoryRoot(path) {
    try {
        const root =
            process.env.NODE_ENV === 'testing'
                ? '/mobile-viewer/repository'
                : '/repository';
        return path.replace('/repository', root);
    } catch (error) {
        return path;
    }
}
