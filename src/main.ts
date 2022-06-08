import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";

createApp(App).use(router).use(Antd).mount("#app");
import "ant-design-vue/dist/antd.css";
