<template>
  <div class="card">
    <h3>{{ user.name }}</h3>
    <p>Age: {{ user.age }}</p>
    <p v-if="user.isAdmin">Admin</p>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>