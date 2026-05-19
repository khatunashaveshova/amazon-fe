import { createServer, Model } from "miragejs";

// Funktion zum Erstellen des MirageJS-Servers
export function makeLessonServer() {
  return createServer({
    
    // Datenmodelle definieren
    // Hier erstellen wir ein "lesson"-Modell
    models: {
      lesson: Model,
    },

    // Seed-Daten
    // Diese Daten werden beim Start automatisch erzeugt
    seeds(server) {

      // Erste Lesson erstellen
      server.create("lesson", {
        title: "Introduction to MirageJS",
        description: "Learn MirageJS basics",
        duration: "20 min",
        level: "Beginner",
        content: "MirageJS creates fake APIs inside the browser.",
      });

      // Zweite Lesson erstellen
      server.create("lesson", {
        title: "Vue Router Dynamic Pages",
        description: "Learn detail pages",
        duration: "30 min",
        level: "Intermediate",
        content: "Dynamic pages use route params like /lessons/2.",
      });
    },

    // API-Routen definieren
    routes() {

      // Namespace für alle API-Endpunkte
      // Dadurch beginnen alle Routen automatisch mit /api
      //
      // Beispiel:
      // this.get("/lessons")
      // wird zu:
      // /api/lessons
      this.namespace = "api";

      // GET ALL LESSONS
      //
      // Route:
      // GET /api/lessons
      //
      // Gibt alle Lessons zurück
      this.get("/lessons", (schema) => {

        // Alle Lessons aus der Mirage-Datenbank abrufen
        return schema.lessons.all();
      });

      // GET LESSON BY ID
      //
      // Route:
      // GET /api/lessons/1
      // GET /api/lessons/2
      //
      // :id ist ein dynamischer Parameter
      this.get("/lessons/:id", (schema, request) => {

        // ID aus der URL lesen
        const id = request.params.id;

        // Passende Lesson anhand der ID finden
        return schema.lessons.find(id);
      });
    },
  });
}