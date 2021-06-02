<template>
  <header>
    header
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
header {
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.05);
}

@media (max-width: 768px) {
  header {
    display: none;
  }
}
</style>
