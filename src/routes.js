"use strict";

import ShellComponent from "./components/Shell.component.vue";
import RenderItemListComponent from "./components/RenderItemList.component.vue";
import RenderCollectionListComponent from "./components/RenderCollectionList.component.vue";
import RenderCollectionItems from "./components/RenderCollectionItems.component.vue";
import RenderItemContentComponent from "./components/RenderItemContent.component.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: "root",
            component: ShellComponent,
            children: [
                {
                    path: "items",
                    name: "viewItemList",
                    component: RenderItemListComponent,
                },
                {
                    path: "collections",
                    name: "viewCollectionList",
                    component: RenderCollectionListComponent,
                },
                {
                    path: "collections/:collectionId",
                    name: "viewCollection",
                    component: RenderCollectionItems,
                },
                {
                    path: "/:collectionId/:itemId",
                    component: RenderItemContentComponent,
                },
            ],
        },
    ],
});

export default router;
