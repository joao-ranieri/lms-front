<template>
  <div class="side-progress">
    <div v-for="(item, index) in itensProgress" :key="index">
      <div class="title-item">
        <span>{{index + 1}}</span>
        <span>{{ item.title }}</span>
      </div>
      <ul v-for="(subItem, index) in item.subItems" :key="index">
        <li>{{subItem.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itensProgress: {type: Array}
  },
}
</script>

<style scoped>
.side-progress {
  width: 220px;
  padding: 24px;
  overflow-y: scroll;
  background: #FBFBFB;
}

.side-progress .title-item {
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: bolder;
  font-size: 14px;
  line-height: 20px;
  color: #828287;
  margin-bottom: 25px;
}

.side-progress .title-item span:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #A7A7AB;
  color: #fff;
  border-radius: 50%;
  margin-right: 8px;
}

.side-progress ul {
  padding: 0;
  list-style: none;
  color: #828287;
  font-size: 12px;
}

.side-progress ul li {
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-bottom: 25px;
}

.side-progress ul li::before {
  content: '';
  width: 8px;
  height: 8px;
  border: 1px solid #A7A7AB;
  box-sizing: border-box;
  border-radius: 50%;
  margin-right: 16px;
}

/* active */
.side-progress .title-item.active,
.side-progress ul li.active {
  color: #89238A;
}

.side-progress .title-item.active span:nth-child(1) {
  background: #89238A;
}

.side-progress ul li.active::before {
  border: none;
  background: #89238A;
}
</style>
