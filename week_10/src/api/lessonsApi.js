const API_URL = "/api/lessons";

export async function getLessons() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch lessons");
  }

  const data = await response.json();
  return data.lessons;
}

export async function getLessonById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch lesson");
  }

  const data = await response.json();
  return data.lesson;
}