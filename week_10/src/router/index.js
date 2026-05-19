import { createRouter, createWebHistory } from "vue-router";

// Seiten-Komponenten importieren
// Diese Komponenten werden später über die URL geladen
import LessonsPage from "../pages/LessonsPage.vue";
import LessonDetailPage from "../pages/LessonDetailPage.vue";

// Hier definieren wir alle Routen der Anwendung
const routes = [
  {
    // Startseite der Anwendung
    path: "/",

    // Name der Route
    // Hilfreich für Navigation per Name
    name: "lessons",

    // Welche Komponente angezeigt werden soll
    component: LessonsPage,
  },

  {
    // Dynamische Route
    // :id bedeutet, dass ein Parameter übergeben wird
    // Beispiel:
    // /lessons/1
    // /lessons/2
    path: "/lessons/:id",

    // Name der Detailseite
    name: "lesson-detail",

    // Komponente für die Detailseite
    component: LessonDetailPage,

    // Route-Parameter automatisch als Props weitergeben
    // Dadurch kann die Komponente direkt auf die ID zugreifen
    props: true,
  },
];

// Router erstellen
export const router = createRouter({
  // Browser-History-Modus
  // Dadurch entstehen saubere URLs ohne #
  history: createWebHistory(),

  // Routen registrieren
  routes,
});