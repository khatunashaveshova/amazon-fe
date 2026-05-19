import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { makeServer } from "./server";
import { makeLessonServer } from "./server/index_2";

if (import.meta.env.DEV) {
  makeLessonServer();
  // makeServer();
}

createApp(App)
  .use(router)
  .mount("#app");

  if (import.meta.env.DEV) {

  // makeServer();
}