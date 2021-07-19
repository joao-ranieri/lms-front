<template>
  <div>
    <div class="d-flex justify-content-between">
      <div class="box-multimedia" @click="addItem('text')">
        <img class="fonts-ico">
        <span class="d-block">Texto</span>
      </div>

      <div class="box-multimedia" @click="addItem('video')">
        <img class="video-ico">
        <span class="d-block">Vídeo</span>
      </div>

      <div class="box-multimedia" @click="addItem('file')">
        <img class="file-ico">
        <span class="d-block">Arquivo</span>
      </div>

      <div class="box-multimedia" @click="addItem('audio')">
        <img class="mic-ico">
        <span class="d-block">Áudio</span>
      </div>

      <div class="box-multimedia" @click="addItem('incorporate')">
        <img class="incorporate-ico">
        <span class="d-block">Incorporar</span>
      </div>

      <div class="box-multimedia" @click="addItem('task')">
        <img class="task-ico">
        <span class="d-block">Atividade</span>
      </div>
    </div>

    <div id="content-media">
      <draggable v-model="items" draggable=".item" @change="printlist">
        <FormMidia class="drag-drop item" v-for="(item, index) in items" :type="item.type" :key="index" :index="index" @remove-item="removeItem" @update-item="updateElement"/>
      </draggable>
    </div>

  </div>

</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    addItem(type){
      let item = {};

      if (type === 'video'){
        item = {link: null, hasDRM: false};
      }
      else if (type === 'text') {
        item = {text: null};
      }
      else if (type === 'file') {
        item = {name: null, content: null, canDownload: true};
      }
      else if (type === 'audio') {
        item = {content: null, canDownload: false};
      }
      else if (type === 'incorporate') {
        item = {text: null};
      }

      item.id = new Date().getTime();
      item.type = type;

      this.items.push(item);
    },
    updateElement(element){
      console.log(element)
      let index = this.items.findIndex(({id}) => {
        return id === element.item.id;
      });

      if(index >= 0) {
        this.items[index] = {...element.item}
        this.$emit('add-multimedia', {collection: this.items});
      }
    },
    removeItem(params){
      this.items.splice(params.index, 1);
      this.$emit('add-multimedia', {collection: this.items});
    },
    printlist(){
      console.log(this.items)
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
