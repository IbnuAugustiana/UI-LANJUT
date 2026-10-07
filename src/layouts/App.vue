<script setup>
import Navbar from '../components/app/Navbar.vue'
import Breadcrumb from '../components/app/Breadcrumb.vue'
</script>

<template>
  <Navbar />
  <Breadcrumb />
  <main class="app-main"><RouterView /></main>
</template>

<style scoped>
.app-main {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

@media (max-width: 768px) {
  .app-main {
    padding: 0 1rem 2rem;
  }
}
</style>
