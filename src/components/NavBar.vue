<script setup lang="ts">
const navItems = [
  { name: '课程', path: '/' },
  { name: '导师', path: '/teachers' },
  { name: '我的', path: '/user' },
]
</script>

<template>
  <nav class="navbar">
    <div class="logo">课程评价系统</div>
    <div class="nav-items">
      <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item">
        {{ item.name }}
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-weight: bold;
  font-size: 1.2em;
}

.nav-items {
  display: flex;
  gap: 24px;
}

.nav-item {
  text-decoration: none;
  color: #4b5563;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #f3f4f6;
}

.router-link-active {
  color: #3b82f6;
  font-weight: 500;
}
</style>
