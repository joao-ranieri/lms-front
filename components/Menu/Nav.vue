<template>
  <nav>
    <div class="header-nav">
      <img width="136" src="../../assets/img/utils/logo-text-black.svg" alt="masters-logo">
      <a href="#" @click="retract"><img width="32" src="../../assets/img/utils/burger-icon-gray.svg" alt="burger-icon"></a>
    </div>
    <div class="itens">
      <MenuNavItems />
    </div>
    <div :class="['footer-nav', !expanded && 'footer-small']">
      <img width="24" v-if="expanded" src="../../assets/img/theme-icons/sun-icon-gray.svg" alt="masters-logo">
      <MenuToggleTheme />
      <img width="24" v-if="expanded" src="../../assets/img/theme-icons/moon-icon-gray.svg" alt="masters-logo">
    </div>
  </nav>
</template>

<script>

export default {
  computed: {
    expanded() {
      return this.$store.state.expanded;
    },
  },
  methods: {
    retract() {
      this.$store.commit('setExpanded', !this.$store.state.expanded)
    }
  }
}
</script>

<style scoped>
nav {
  position: relative;
  background-color: #FBFBFC;
  box-shadow: 0 0 0 1px rgba(0,0,0,.05);
  max-height: 100vh;
}

.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 40px 20px 40px;
}

.itens {
  height: calc(100vh - 172px);
  overflow: auto;
}

.footer-nav {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 72px;
  border-top: 1px solid #F1F1F2;
  padding: 0 40px;
}

.footer-nav.footer-small {
  justify-content: center;
  padding: 0;
}

.footer-nav > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Reduced Menu Settings */
.reduced-menu .header-nav {
  justify-content: center;
}

.reduced-menu .header-nav > img {
  display: none;
}

@media (max-width: 768px) {
  .header-nav {
    margin: 20px;
  }
}
</style>
