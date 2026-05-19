import { createServer } from "miragejs";

export function makeServer() {
  createServer({
    routes() {
      this.namespace = "api";

      this.get("/lessons", () => {
        return {
          lessons: [
            { id: 1, title: "Mocking an API with MirageJS" },
            { id: 2, title: "Creating fake API routes" },
            { id: 3, title: "Fetching mock data in Vue" },
          ],
        };
      });
    },
  });
}