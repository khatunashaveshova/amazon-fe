<template>
  <Nav></Nav>

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
  </nav>

  <RouterView />

  <Footer></Footer>
</template>

<script setup>
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue';
</script>