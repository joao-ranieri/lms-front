<template>
  <div class="side-progress" :class="{'side-center': currentPosition > 1}">
    <div v-if="currentPosition === 1">
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

    <div class="card-side" v-if="currentPosition > 1">
      <div class="title-card">
        <img :src="require('../../assets/img/dashbord/'+itemsNavigator.icon+'-purple.svg')" />
        <span>{{itemsNavigator.title}}</span>
      </div>
      <div class="content-card">
        <ul v-for="(item, index) in itemsNavigator.steps" :key="index">
          <li @click="itemsNavigatorSelected = index"
            :class="[{'checked': itemsNavigatorSelected > index}, {'active': itemsNavigatorSelected === index}]">
            {{item.stepsTitle}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itensProgress: {type: Array},
    currentStep: {type: Number},
    itemsNavigator: {type: Object},
    currentPosition: {type: Number},
  },
  data() {
    return {
      itemsNavigatorSelected: 0,
    }
  }
}
</script>

<style scoped>
.side-progress {
  width: 220px;
  padding: 24px;
  overflow-y: scroll;
  background: #FBFBFB;
}

.side-progress.side-center {
  width: 354px;
  display: flex;
  justify-content: center;
  align-items: center;
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

/* card */
.side-progress .card-side {
  width: 100%;
  min-height: 256px;
  background: #FFFFFF;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;
  font-style: normal;
  font-weight: bolder;
  font-size: 14px;
  line-height: 20px;
  color: #89238A;
}

.side-progress .card-side .title-card {
  display: flex;
  align-items: center;
  font-style: normal;
  margin-bottom: 10px;
}

.side-progress .card-side .title-card span {
  padding-left: 12px;
}

.side-progress .card-side li{
  padding: 0 10px;
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
