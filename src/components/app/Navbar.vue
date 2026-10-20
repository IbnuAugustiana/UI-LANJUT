<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)
const route = useRoute()
const menus = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  {
    name: 'Browse',
    path: '/browse',
    children: [
      {
        name: 'Event List',
        path: '/browse/events',
        children: [{ name: 'Event Detail (Sample)', path: '/browse/events/1' }],
      },
      { name: 'Category', path: '/browse/category' },
    ],
  },
  { name: 'Contact', path: '/contact' },
  { name: 'Organizer Dashboard', path: '/dashboard' },
]
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <RouterLink to="/" class="logo">
        <svg class="logo-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 2 10 10-10 10L2 12 12 2Z" />
          <path d="m12 7 5 5-5 5-5-5 5-5Z" />
        </svg>
        <span>Gatherly</span>
      </RouterLink>
      <ul class="nav-menu">
        <li v-for="menu in menus" :key="menu.name" class="nav-item">
          <RouterLink
            :to="menu.path"
            class="nav-link"
            :class="{
              active:
                route.path === menu.path || (menu.path !== '/' && route.path.startsWith(menu.path)),
            }"
          >
            {{ menu.name }}
            <svg
              v-if="menu.children"
              class="dropdown-indicator"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m7 10 5 5 5-5" />
            </svg>
          </RouterLink>
          <ul v-if="menu.children" class="dropdown-menu">
            <li v-for="child in menu.children" :key="child.name" class="dropdown-item">
              <RouterLink :to="child.path" class="dropdown-link"
                >{{ child.name }}<span v-if="child.children">›</span></RouterLink
              >
              <ul v-if="child.children" class="submenu">
                <li v-for="subchild in child.children" :key="subchild.name">
                  <RouterLink :to="subchild.path" class="dropdown-link">{{
                    subchild.name
                  }}</RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <div class="nav-right">
        <div class="lang-selector"><span class="language-icon">EN</span><span>EN</span></div>
        <button class="hamburger-btn" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  background: #1d194d;
  box-shadow: 0 5px 20px rgb(23 18 67 / 22%);
  transition:
    background 0.25s,
    box-shadow 0.25s;
}
.navbar.scrolled {
  background: rgb(29 25 77 / 92%);
  backdrop-filter: blur(14px);
  box-shadow: 0 8px 30px rgb(23 18 67 / 32%);
}
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1240px;
  min-height: 76px;
  margin: auto;
  padding: 0.75rem 2rem;
}
.logo,
.nav-link {
  color: #fff;
  text-decoration: none;
}
.logo {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  font-weight: 750;
  letter-spacing: -0.025em;
}
.logo-icon {
  width: 29px;
  height: 29px;
  fill: none;
  stroke: #fff;
  stroke-width: 1.7;
}
.logo-icon path:last-child {
  fill: #7b5cff;
  stroke: none;
}
.nav-menu {
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav-item {
  position: relative;
  padding: 0.65rem 0;
}
.nav-link {
  display: flex;
  gap: 0.38rem;
  align-items: center;
  padding: 0.65rem 1rem;
  border-radius: 10px;
  font-weight: 550;
  transition:
    background 0.2s,
    transform 0.2s;
}
.nav-link.active {
  background: #6845ff;
  box-shadow: 0 8px 16px rgb(0 0 0 / 16%);
}
.nav-link:hover {
  background: rgb(255 255 255 / 11%);
  transform: translateY(-1px);
}
.dropdown-indicator {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.dropdown-menu,
.submenu {
  display: none;
  position: absolute;
  z-index: 2;
  min-width: 210px;
  margin: 0;
  padding: 0.45rem;
  list-style: none;
  background: #fff;
  border: 1px solid #e6e3f4;
  border-radius: 12px;
  box-shadow: 0 16px 32px rgb(24 18 71 / 18%);
}
.dropdown-menu {
  top: 100%;
  left: 0;
}
.submenu {
  top: 0;
  left: calc(100% + 0.4rem);
  min-width: 220px;
}
.nav-item:hover .dropdown-menu,
.dropdown-item:hover .submenu {
  display: block;
}
.dropdown-link {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 0.8rem;
  border-radius: 8px;
  color: #3d385c;
  text-decoration: none;
  font-size: 0.92rem;
}
.dropdown-link:hover {
  background: #f0edff;
  color: #5d3df5;
}
.nav-right,
.lang-selector {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #fff;
}
.lang-selector {
  font-size: 0.9rem;
}
.language-icon {
  display: grid;
  width: 21px;
  height: 21px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 65%);
  border-radius: 50%;
  font-size: 0.5rem;
}
.hamburger-btn {
  display: grid;
  gap: 4px;
  width: 42px;
  height: 42px;
  place-content: center;
  padding: 0;
  background: rgb(255 255 255 / 7%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 11px;
}
.hamburger-btn span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: #fff;
  border-radius: 10px;
}
@media (max-width: 768px) {
  .navbar-container {
    min-height: 66px;
    padding: 0.65rem 1.25rem;
  }
  .nav-menu,
  .lang-selector {
    display: none;
  }
}
</style>

<style scoped>
/* NAVBAR FULL-WIDTH menyatu dengan bagian atas layar */
.navbar {
  width: 100%;
  background: var(--nav-bg, #1c1948);
  border-bottom: 1px solid var(--nav-border, #333);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.85rem 2rem;
}

.navbar.scrolled {
  background: rgba(28, 25, 72, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-white, #fff);
  padding-right: 2rem;
  transition: transform 0.3s ease;
}
.logo:hover {
  transform: translateY(-2px);
}
.logo-icon {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.logo:hover .logo-icon {
  transform: rotate(15deg) scale(1.1);
}
.logo-text {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1rem 0; /* Memberi ruang hover */
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-white, #fff);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-link.active {
  background-color: var(--primary, #6644ff);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 68, 255, 0.3);
}

.nav-link.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 68, 255, 0.5);
}

.nav-link:not(.active):hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.dropdown-indicator {
  transition: transform 0.3s ease;
}

.nav-item:hover .dropdown-indicator {
  transform: rotate(180deg);
}

/* ====================================
   DROPDOWN & SUBMENU STYLES
   Inspired by user reference image
   ==================================== */
.dropdown-menu {
  display: none; /* diubah jadi block saat hover */
  position: absolute;
  top: 100%;
  left: 0;

  background-color: #dbd8db; /* warna abu seperti referensi */
  min-width: 200px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

/* Tampilkan dropdown level 1 saat nav-item di-hover */
.nav-item:hover .dropdown-menu {
  display: block;
  animation: fadeIn 0.2s ease-out;
}

.dropdown-item {
  position: relative; /* relative untuk submenu absolut */
}

.dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: #333; /* text gelap */
  font-size: 0.95rem;
  transition:
    background-color 0.2s,
    color 0.2s;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-link:hover {
  background-color: #c4c4c4; /* efek hover lebih gelap sedikit */
  color: #000;
}

/* Hilangkan border bawah pada item terakhir */
.dropdown-item:last-child .dropdown-link {
  border-bottom: none;
}

/* Submenu (Level 2) */
.submenu {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  background-color: #dbd8db;
  min-width: 220px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

/* Tampilkan submenu level 2 saat dropdown-item di-hover */
.dropdown-item:hover .submenu {
  display: block;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Submenu pada parent (jika left:100% terlalu mentok layar)
   Kita bisa membiarkannya default left 100%.
*/

/* ====================================
   RIGHT SECTION
   ==================================== */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.lang-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-white, #fff);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.lang-selector:hover {
  background: rgba(255, 255, 255, 0.1);
}

.lang-selector:hover .chevron {
  transform: translateY(2px);
}

.chevron {
  transition: transform 0.3s ease;
  margin-top: 2px;
}

.hamburger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: var(--text-white, #fff);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hamburger-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

@media (max-width: 900px) {
  .nav-menu {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .lang-selector {
    display: none;
  }
}
</style>
