import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import VueSimpleAlert from "vue3-simple-alert";
import "./assets/index.css";

const app = createApp(App);

app.use(createPinia(), VueSimpleAlert);

app.mount("#app");
