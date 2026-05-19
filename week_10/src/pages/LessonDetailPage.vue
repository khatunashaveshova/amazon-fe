<script setup>
import { onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { getLessonById } from "../api/lessonsApi";

const route = useRoute();

const lesson = ref(null);
const loading = ref(false);
const error = ref("");

async function loadLesson() {
  loading.value = true;
  error.value = "";

  try {
    lesson.value = await getLessonById(route.params.id);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(loadLesson);
</script>

<template>
  <main class="page">
    <RouterLink to="/" class="back">← Back to lessons</RouterLink>

    <p v-if="loading" class="status">Loading lesson...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <section v-if="lesson" class="detail-card">
      <p class="eyebrow">{{ lesson.level }}</p>

      <h1>{{ lesson.title }}</h1>
      <p class="description">{{ lesson.description }}</p>

      <div class="meta">
        <div>
          <strong>Duration</strong>
          <span>{{ lesson.duration }}</span>
        </div>

        <div>
          <strong>Level</strong>
          <span>{{ lesson.level }}</span>
        </div>
      </div>

      <hr />

      <h2>Lesson Content</h2>
      <p>{{ lesson.content }}</p>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 24px;
  font-family: Arial, sans-serif;
}

.back {
  display: inline-block;
  margin-bottom: 24px;
  color: #14b8a6;
  text-decoration: none;
  font-weight: bold;
}

.detail-card {
  padding: 32px;
  border-radius: 18px;
  background: white;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.1);
}

.eyebrow {
  color: #14b8a6;
  font-weight: bold;
  text-transform: uppercase;
}

.detail-card h1 {
  font-size: 38px;
  margin: 8px 0 12px;
}

.description {
  color: #64748b;
  font-size: 18px;
}

.meta {
  display: flex;
  gap: 20px;
  margin: 28px 0;
}

.meta div {
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  background: #f8fafc;
}

.meta strong {
  display: block;
  margin-bottom: 6px;
}

.meta span {
  color: #475569;
}

hr {
  margin: 28px 0;
  border: none;
  border-top: 1px solid #e2e8f0;
}

.status {
  color: #475569;
}

.error {
  color: #dc2626;
}
</style>