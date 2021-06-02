<template>
  <nav>
    <div class="header-nav">
      <img width="136" src="../../assets/img/utils/logo-text-black.svg" alt="masters-logo">
      <img width="32" src="../../assets/img/utils/burger-icon.svg" alt="burger-icon">
    </div>
    <MenuNavItems />
  </nav>
</template>

<style scoped>
nav {
  background-color: #FBFBFC;
  box-shadow: 0 0 0 1px rgba(0,0,0,.05);
}

.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 40px 20px 40px;
}

@media (max-width: 768px) {
  .header-nav {
    margin: 20px;
  }
}
</style>
