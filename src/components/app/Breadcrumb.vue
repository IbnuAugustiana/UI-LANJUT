<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const crumbs = computed(() => route.path.split('/').filter(Boolean))
</script>

<template>
  <div v-if="crumbs.length > 0" class="breadcrumb">
    <RouterLink to="/">Home</RouterLink>
    <template v-for="crumb in crumbs" :key="crumb"><span class="separator">/</span><span class="current">{{ crumb }}</span></template>
  </div>
</template>

<style scoped>
.breadcrumb{display:flex;gap:.65rem;align-items:center;max-width:1120px;margin:0 auto;padding:1.25rem 2rem 0;color:#77738e;font-size:.88rem}.breadcrumb a{color:#6845ff;text-decoration:none;font-weight:600}.separator{color:#b1aec1}.current{text-transform:capitalize}@media(max-width:600px){.breadcrumb{padding:1rem 1.25rem 0}}
</style>

<style scoped>
.breadcrumb {
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}
.breadcrumb ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  align-items: center;
  gap: 0.5rem;
}
.breadcrumb a {
  text-decoration: none;
  color: var(--primary, #6644ff);
  font-weight: 500;
}
.breadcrumb a:hover {
  text-decoration: underline;
}
.separator {
  color: #888;
  margin: 0 0.5rem;
}
.active-crumb {
  color: #333;
  font-weight: 600;
}
@media (prefers-color-scheme: dark) {
  .active-crumb {
    color: #ccc;
  }
}
</style>