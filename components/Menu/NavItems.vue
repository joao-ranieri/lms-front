<template>
  <div class="menu-items">
    <div v-for="item in menuItems" :key="item.text" class="item">
      <div class="item-icon">
        <img :src="require('../../assets/img/dashbord/'+item.icon+'.svg')" :alt="item.icon">
      </div>
      <span>{{item.text}}</span>
      <div v-if="item.submenu" class="submenu">
        <div v-for="submenu in item.submenu" :key="submenu">
          {{submenu}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const items = [
  {text: 'Cursos', icon: 'folder-gray'},
  {text: 'Alunos', icon: 'profile-gray'},
  {text: 'Marketing', icon: 'live-gray', submenu: ['item 1', 'item 2']},
  {text: 'Comunicação', icon: 'chat-gray', submenu: ['item 3', 'item 4']}
]
export default {
  data() {
    return {
      menuItems: items
    }
  }
}
</script>

<style scoped>
.menu-items {
  padding: 0 40px;
}

.item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 56px;
  padding: 15px 0;
  border-bottom: 1px solid #F1F1F2;
  color: #525359;
  cursor: pointer;
}

.item:hover span,
.item:hover .item-icon {
  filter: brightness(1);
}

.item span {
  font-size: 14px;
  font-family: "Inter Bold";
  line-height: 20px;
  padding-top: 5px;
  filter: brightness(1.5);
  transition: 0.2s;
}

.item-icon {
  width: 24px;
  height: 24px;
  margin-right: 18px;
  filter: brightness(1.5);
  transition: 0.2s;
}

.submenu {
  width: 100%;
  margin-top: 18px;
  margin-left: 42px;
}
</style>
