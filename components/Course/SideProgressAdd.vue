<template>
  <div class="side-progress">
    <div v-for="(item, index) in itensProgress" :key="index">
      <div @click="$emit('change-step', index)"
        :class="['title-item', {'active': currentStep === index+1}]">
        <span>{{index + 1}}</span>
        <span>{{ item.title }}</span>
      </div>
      <ul v-for="(subItem, indexSub) in item.subItems" :key="indexSub">
        <li @click="$emit('change-position', {indexItem: index, indexSub: indexSub})"
          :class="[{'checked': (currentStep === index+1 && currentPosition > indexSub+1) || currentStep > index+1},
            {'active': currentStep === index+1 && currentPosition === indexSub+1}]">
          {{subItem.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itensProgress: {type: Array},
    currentStep: {type: Number},
    currentPosition: {type: Number},
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
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.side-progress .title-item:hover {
  background: #F2F2F2;
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
  margin: 3px 0;
  list-style: none;
  color: #828287;
  font-size: 12px;
}

.side-progress ul li {
  display: flex;
  align-items: center;
  min-height: 40px;
  margin: 0;
  padding: 8px 0 8px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.side-progress ul li:hover {
  background: #F2F2F2;
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

.side-progress ul li.checked::before {
  content: url("../../assets/img/utils/check-grey.svg");
  width: 10px;
  height: 10px;
  border: none;
}
</style>
