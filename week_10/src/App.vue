<script setup>
import { ref, onMounted } from "vue";

// Reactive Variable für die Lessons
// ref([]) erstellt ein reaktives Array
// Vue aktualisiert automatisch die UI,
// sobald sich die Daten ändern
const lessons = ref([]);

// Reactive Variable für den Ladezustand
// false = nichts wird geladen
// true = Daten werden geladen
const loading = ref(false);

// Asynchrone Funktion zum Laden der Daten
async function fetchLessons() {

  // Ladezustand aktivieren
  loading.value = true;

  // API-Aufruf durchführen
  // fetch() sendet eine HTTP-GET-Anfrage
  // an unseren MirageJS-Endpunkt
  const response = await fetch("/api/lessons");

  // JSON-Daten aus der Antwort lesen
  const data = await response.json();

  // Die geladenen Lessons im State speichern
  // Dadurch wird die Oberfläche automatisch aktualisiert
  lessons.value = data.lessons;

  // Ladezustand deaktivieren
  loading.value = false;
}

// Lifecycle Hook
// onMounted() wird ausgeführt,
// sobald die Komponente fertig geladen wurde
onMounted(() => {

  // Lessons direkt beim Laden abrufen
  fetchLessons();
});
</script>

<template>
  <main class="page">
    <h1>MirageJS Mock API Demo</h1>

    <p>
      Vue is fetching data from <strong>/api/lessons</strong>,
      but the backend is fake.
    </p>

    <p v-if="loading">Loading...</p>

    <section class="cards">
      <article v-for="lesson in lessons" :key="lesson.id" class="card">
        <span>LESSON</span>
        <h2>{{ lesson.title }}</h2>
      </article>
    </section>
  </main>

  <router-view />
</template>

<style scoped>
.page {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

.cards {
  display: grid;
  gap: 14px;
  margin-top: 24px;
}

.card {
  padding: 16px;
  border-left: 4px solid #14b8a6;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}

.card span {
  color: #14b8a6;
  font-size: 12px;
  font-weight: bold;
}

.card h2 {
  font-size: 18px;
  margin-top: 8px;
}
</style>