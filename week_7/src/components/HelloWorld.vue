<template>
  <!-- Template = HTML + Vue Syntax -->
  <div class="card">
    
    <!-- Titel wird aus dem Script angezeigt -->
    <h2>{{ title }}</h2>

    <!-- Anzeige der aktuellen Nachricht -->
    <p>{{ message }}</p>

    <!-- 
      v-model = Two-way Data Binding
      → verbindet Input mit der Variable "message"
      → Änderung im Input ändert direkt den Wert
    -->
    <input 
      v-model="message" 
      placeholder="Text eingeben" 
      class="input" 
    />

    <!-- 
      @click = Event Listener
      → ruft die Funktion changeMessage() auf
    -->
    <button class="btn" @click="changeMessage">
      Klick mich
    </button>

  </div>
</template>

<script setup>
// Composition API (moderne Schreibweise)

import { ref } from 'vue' 
// ref = macht eine Variable reaktiv

// einfache Variable (nicht reaktiv notwendig)
const title = 'Meine Vue Komponente'

// reaktive Variable
// → Wert wird automatisch im UI aktualisiert
const message = ref('Hallo Vue!')

// Funktion zum Ändern der Nachricht
function changeMessage() {
  // bei ref immer .value verwenden!
  message.value = 'Nachricht geändert!'
}
</script>

<style scoped>
/* scoped = Styles gelten nur für diese Komponente */

/* Input Styling */
.input {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
}

/* Fokus Effekt beim Klicken ins Input */
.input:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

/* Placeholder (grauer Text im Input) */
.input::placeholder {
  color: #999;
}

/* Container Styling */
.card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 320px;
  text-align: center;

  /* Flexbox für bessere Anordnung */
  display: flex;
  flex-direction: column;
}

/* Button Styling */
.btn {
  margin-top: 12px;
  padding: 10px 16px;
  background-color: #42b883; /* Vue Grün */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  /* Animation */
  transition: all 0.2s ease;
}

/* Hover Effekt */
.btn:hover {
  background-color: #369870;
  transform: translateY(-2px);
}

/* Klick Effekt */
.btn:active {
  transform: translateY(0);
  background-color: #2f7d5f;
}
</style>