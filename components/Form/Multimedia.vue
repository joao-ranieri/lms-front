<template>
  <div class="box-multimedia d-inline-flex">
    <img :class="exhibition[type].imageClass">
    <span class="d-block" v-text="exhibition[type].label"></span>
  </div>
</template>

<script>
export default {
  props:{
    type: {type: String}
  },
  data(){
    return {
      exhibition:{
        text: {label: "Texto", imageClass: "fonts-ico"},
        video: {label: "Vídeo", imageClass: "video-ico"},
        file: {label: "Arquivo", imageClass: "file-ico"},
        audio: {label: "Áudio", imageClass: "mic-ico"},
        incorporate: {label: "Incorporar", imageClass: "incorporate-ico"},
        task: {label: "Atividade", imageClass: "task-ico"},
      }
    }
  }
}
</script>

<style scoped>
  .box-multimedia {
    background: #FFFFFF;
    position: relative;
    border: 1px solid #F2F2F2;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 98.5px;
    height: 110px;
    color: #828287;
    cursor: pointer;
  }

  .box-multimedia:hover {
    border-color: #89238A;
    color: #89238A;
  }

  .box-multimedia img {
    width: 20px;
    height: 16.25px;
    margin: 0 auto 8px;
  }
</style>
