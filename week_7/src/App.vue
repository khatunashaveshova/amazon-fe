<script setup>
import HelloWorld from './components/HelloWorld.vue'
import OptionApi from './components/OptionApi.vue';
import PostsList from './components/PostsList.vue';
</script>

<template>
  <main class="wrapper">
    <HelloWorld msg="You did it!" />
    <OptionApi />
  </main>
  <PostsList />

</template>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    gap: 2em;
  }
  .wrapper div {
    width: 40%;
  }
</style>