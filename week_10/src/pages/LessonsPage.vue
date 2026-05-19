<script setup>
import { onMounted, ref } from "vue";

// API-Funktion importieren
// Diese Funktion holt alle Lessons vom Backend bzw. von MirageJS
import { getLessons } from "../api/lessonsApi";

// Reactive State erstellen
// ref() macht die Werte reaktiv,
// damit Vue die UI automatisch aktualisiert

// Array für alle Lessons
const lessons = ref([]);

// Ladezustand
// true = Daten werden geladen
// false = Laden beendet
const loading = ref(false);

// Fehlermeldung speichern
const error = ref("");

// Funktion zum Laden der Lessons
async function loadLessons() {

  // Ladezustand aktivieren
  loading.value = true;

  // Alte Fehler zurücksetzen
  error.value = "";

  try {

    // API-Aufruf durchführen
    // await wartet auf die Antwort der API
    lessons.value = await getLessons();

  } catch (err) {

    // Falls ein Fehler passiert,
    // Fehlermeldung speichern
    error.value = err.message;

  } finally {

    // Wird IMMER ausgeführt
    // egal ob Erfolg oder Fehler
    loading.value = false;
  }
}

// Lifecycle Hook
// onMounted() wird ausgeführt,
// sobald die Komponente geladen wurde
onMounted(loadLessons);
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">MirageJS Demo</p>
      <h1>Vue Lessons</h1>
      <p>
        This page fetches lesson data from a fake MirageJS API.
      </p>
    </section>

    <p v-if="loading" class="status">Loading lessons...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <section class="grid">
      <RouterLink
        v-for="lesson in lessons"
        :key="lesson.id"
        :to="`/lessons/${lesson.id}`"
        class="card"
      >
        <span>{{ lesson.level }}</span>
        <h2>{{ lesson.title }}</h2>
        <p>{{ lesson.description }}</p>
        <small>{{ lesson.duration }}</small>
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
  font-family: Arial, sans-serif;
}

.hero {
  margin-bottom: 32px;
}

.eyebrow {
  color: #14b8a6;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero h1 {
  font-size: 42px;
  margin: 8px 0;
}

.hero p {
  color: #64748b;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.card {
  padding: 22px;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  background: white;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.14);
}

.card span {
  color: #14b8a6;
  font-size: 12px;
  font-weight: bold;
}

.card h2 {
  margin: 12px 0 8px;
}

.card p {
  color: #64748b;
}

.card small {
  display: inline-block;
  margin-top: 12px;
  font-weight: bold;
}

.status {
  color: #475569;
}

.error {
  color: #dc2626;
}
</style>