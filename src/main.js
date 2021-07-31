import "element-plus/lib/theme-chalk/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
