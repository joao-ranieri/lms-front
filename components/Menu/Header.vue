<template>
  <header>
    <b-dropdown class="message-box" right toggle-class="message-btn btn-transparent">
      <template #button-content>
        <img height="40" width="40" src="../../assets/img/utils/ico-message.svg" alt="author">
      </template>
      <b-dropdown-item @click="">content</b-dropdown-item>
    </b-dropdown>

    <b-dropdown class="notification-box" right toggle-class="notification-btn btn-transparent">
      <template #button-content>
        <img height="40" width="40" src="../../assets/img/utils/ico-bell.svg" alt="author">
      </template>
      <b-dropdown-item @click="">Content</b-dropdown-item>
    </b-dropdown>

    <b-dropdown class="profile-box" right toggle-class="profile-btn btn-white">
      <template #button-content>
        <img height="40" width="40" src="../../assets/img/course-test/img-author.svg" alt="author">
        <span class="ml-3 text-left">
          <span class="d-block username">João Silva</span>
          <span class="d-block user-mail">joao@mail.com</span>
        </span>
      </template>
      <b-dropdown-item @click=""><span class="profile-ico"></span>Meu perfil</b-dropdown-item>
      <b-dropdown-item @click=""><span class="settings-ico"></span>Configurações</b-dropdown-item>
      <b-dropdown-item @click=""><span class="logoff-ico"></span>Sair</b-dropdown-item>
    </b-dropdown>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
header {
  height: 96px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  padding: 12px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.05);
}

.profile-box {
  margin-left: 40px;
}

.notification-box {
  margin-left: 16px;
}

.profile-box li {
  width: 100%;
}

.profile-ico {
  content: url("../../assets/img/utils/ico-profile.svg");
}

.settings-ico {
  content: url("../../assets/img/utils/ico-settings.svg");
}

.logoff-ico {
  content: url("../../assets/img/utils/ico-arrow-left.svg");
}

@media (max-width: 768px) {
  header {
    display: none;
  }
}
</style>
