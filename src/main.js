import "regenerator-runtime";
import "./assets/tailwind.css";
import "element-plus/theme-chalk/index.css";
import "@fortawesome/fontawesome-free/js/all";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoReplaceSvg = "nest";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import { store } from "./store";
import ElementPlus from "element-plus";
(async () => {
    const app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(ElementPlus);
    app.mount("#app");
})();
