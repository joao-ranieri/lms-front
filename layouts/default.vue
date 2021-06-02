<template>
  <div class="container-layout">
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

</script>

<style scoped>
.container-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (min-width: 768px) {
  .container-layout {
    display: grid;
    grid-template-columns: 256px 1fr;
    grid-template-rows: 1fr auto;
  }
}

main {
  flex: 1;
  padding: 20px;
}
</style>
