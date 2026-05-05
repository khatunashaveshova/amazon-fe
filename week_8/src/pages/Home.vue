<template>
  <div>
    <h1>User List</h1>

    <UserCard 
      v-for="user in users" 
      :key="user.id" 
      :user="user" 
    />
    
  </div>
</template>

<script setup>
import UserCard from './UserCard.vue'

const users = [
  { id: 1, name: "Alice", age: 25, isAdmin: true },
  { id: 2, name: "Bob", age: 30, isAdmin: false },
  { id: 3, name: "Charlie", age: 22, isAdmin: false }
]
</script>