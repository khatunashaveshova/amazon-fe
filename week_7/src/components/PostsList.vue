<template>
  <div class="card">
    <h2>Posts Liste</h2>

    <!-- Ladeanzeige -->
    <p v-if="loading">Lade Daten...</p>

    <!-- Fehleranzeige -->
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Liste der Posts -->
    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>

    <!-- Reload Button -->
    <button class="btn" @click="fetchPosts">
      Neu laden
    </button>
  </div>
</template>

<script setup>
// Import
import { ref, onMounted } from 'vue'

// Reaktive Variablen
const posts = ref([])        // Liste der Posts
const loading = ref(false)  // Ladezustand
const error = ref(null)     // Fehler

// Funktion zum Laden der Daten
async function fetchPosts() {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()

    // nur erste 5 Posts anzeigen (optional)
    posts.value = data.slice(0, 5)

  } catch (err) {
    error.value = 'Fehler beim Laden der Daten!'
  } finally {
    loading.value = false
  }
}

// Wird automatisch beim Laden der Komponente ausgeführt
onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.card {
  padding: 20px;
  margin-top: 2em;
  border: 1px solid #ccc;
  border-radius: 10px;
}

/* Post Styling */
.post {
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

/* Fehler */
.error {
  color: red;
}

/* Button */
.btn {
  margin-top: 10px;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn:hover {
  background-color: #369870;
}
</style>