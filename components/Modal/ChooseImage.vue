<template>
  <div>
    <b-modal id="choose-image" title="Nova imagem de perfil" centered no-close-on-esc no-close-on-backdrop size="lg">
      <span class="d-block mb-3">Tamanho sugerido: 250px de altura 250px de largura</span>
      <input style="display: none" ref="fileInput" type="file" @change="getImg" enctype="multipart/form-data">
      <b-button @click="$refs.fileInput.click()" class="btn-rounded-purple">Escolher imagem</b-button>
      <div class="crop-image mt-3">
        <cropper ref="cropper" class="cropper" :src="url"/>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {Cropper} from 'vue-advanced-cropper'

export default {
  components: {
    Cropper
  },
  data() {
    return {
      file: null,
      url: null
    }
  },
  methods: {
    getImg(e) {
      this.file = e.target.files[0];

      this.url = window.URL.createObjectURL(this.file);
    },
    change({coordinates, canvas}) {
      console.log(coordinates, canvas)
    }
  }
}
</script>

<style>
.crop-image {
  position: relative;
  display: block;
  width: 100%;
  max-height: 500px;
  background-color: #89238A;
}

</style>
