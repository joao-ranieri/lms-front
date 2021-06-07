<template>
  <div :class="['container-layout',{'reduced-menu': !expanded}]">
    <MenuNav />
    <section>
      <MenuHeader />
      <main>
        <Nuxt />
      </main>
    </section>
  </div>
</template>

<script>

export default {
  computed: {
    expanded() {
      return this.$store.state.expanded;
    }
  }
}
</script>

<style scoped>
main {
  flex: 1;
  padding: 40px 66px;
  height: calc(100vh - 96px);
  overflow-y: auto;
}

.container-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container-layout.reduced-menu {
  grid-template-columns: 87px 1fr;
}

@media (min-width: 768px) {
  .container-layout {
    display: grid;
    grid-template-columns: 256px 1fr;
    grid-template-rows: 1fr auto;
  }
}

</style>
