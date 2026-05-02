<template>
  <div class="card">
    <h2>{{ title }}</h2>

    <!-- Eingabe -->
    <input 
      v-model="message" 
      placeholder="Text eingeben" 
      class="input"
    />

    <!-- Ausgabe -->
    <p>Dein Text: {{ message }}</p>

    <!-- Computed -->
    <p>Länge: {{ messageLength }}</p>

    <!-- Button -->
    <button class="btn" @click="changeMessage">
      Text ändern
    </button>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',

  data() {
    return {
      title: 'Options API Beispiel',
      message: 'Hallo Vue!'
    }
  },

  methods: {
    changeMessage() {
      this.message = 'Nachricht wurde geändert!'
    }
  },

  computed: {
    messageLength() {
      return this.message.length
    }
  }
}
</script>

<style scoped>
.card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 320px;
  text-align: center;
}

.input {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
}

.input:focus {
  border-color: #42b883;
}

.btn {
  margin-top: 12px;
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