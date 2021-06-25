<template>
  <div class="position-relative">
    <input class="d-none" ref="fileInput" type="file" @change="setImage" enctype="multipart/form-data">

    <div class="drag-drop-box size-default" @click="$refs.fileInput.click()" v-cloak @drop.prevent="setImage" @dragover.prevent>
      <img v-if="imageURL" :src="imageURL" width="150" height="200" alt="author-image">

      <div v-else class="text-center p-3">
          <img src="@/assets/img/utils/ico-camera.svg" alt="camera">
          <span class="d-block mt-3">
            Arraste ou <u>selecione</u> uma imagem de capa
          </span>
      </div>
    </div>

    <div v-if="imageURL" class="actions-group size-default">
      <button type="button" class="mb-3 mr-3" @click="$refs.fileInput.click()" v-b-tooltip="'Editar'"><i class="pencil-ico"></i></button>
      <button type="button" class="mb-3" @click="imageURL = null" v-b-tooltip="'Remover'"><i class="trash-ico"></i></button>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      imageURL: null
    }
  },
  methods:{
    async setImage(e) {
      this.imageURL = window.URL.createObjectURL(e.dataTransfer.files[0]);
      await this.toBase64(e.dataTransfer.files[0]);
    },
    toBase64 (file) {
      let image;
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then(response => {
        image = response;
      }).finally(()=>{
        this.$emit('send-image', image)
      })
    },
  }
}
</script>

<style scoped>
.drag-drop-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #CDCDCE;
  border-radius: 8px;
  font: 14px "Inter Regular";
  color: #CDCDCE;
  cursor: pointer;
  z-index: 1;
}

.size-default {
  width: 150px;
  height: 200px;
}

.actions-group {
  position: absolute;
  display: none;
  justify-content: center;
  align-items: flex-end;
  background: linear-gradient(180deg, rgba(58, 62, 69, 0.0001) 0%, #212527 100%);
  border-radius: 8px;
  z-index: 2;
  top: 0;
}

div:hover > .actions-group {
  display: flex;
}

.actions-group button {
  border: none;
  border-radius: 8px;
  background: #FFFFFF;
  padding: 4px;
  width: 28px;
  height: 28px;
}

.actions-group button > i {
  height: 18px;
}

u {
  color: #89238A;
}

img {
  border-radius: 8px;
  object-fit: cover;
}


</style>
