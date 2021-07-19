<template>
  <div class="content-box mt-3">
    <div class="resume-box w-100 d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <span class="three-points mr-2"></span>
        <span :class="types[type].classIco"></span>
        <h6 class="d-inline-block mb-0 ml-2" v-text="types[type].label"></h6>
      </div>
      <div class="d-flex align-items-center">
        <span @click="$emit('remove-item', {index: index})" class="cursor-pointer trash-ico mr-4"></span>
        <a href="#" @click="showModule = !showModule"><img src="../../assets/img/utils/ico-arrow-dropdown.svg"></a>
      </div>
    </div>
    <div class="expanded-box pb-3" v-show="showModule">
      <div style="margin-top: 28px; gap: 16px" class="d-flex w-100 justify-content-between pl-3 pr-3">
        <div class="w-100" v-if="type === 'text' || type === 'incorporate'">
          <label class="d-block">
            {{ type === 'incorporate' ? 'Insira o código que deseja incorporar' : 'Texto' }}
          </label>
          <b-form-textarea v-model="modelObject.text" rows="6"
                           :placeholder='type === "incorporate" ? "<embed type=\"image/jpg\" src=\"pic_trulli.jpg\" width=\"300\" height=\"200\"" : "Insira o texto que fará parte da sua aula"'>
          </b-form-textarea>

          <a href="https://rockcontent.com/br/blog/embed-code-o-que-e/" target="_blank" v-if="type === 'incorporate'"
             class="mt-3 d-block purple-link">Não sabe o que são links incorporados?</a>
        </div>

        <div class="w-100" v-else-if="type === 'audio' || type === 'file'">
          <div class="file-select">
            <div class="audio-play" v-if="audio">
              <audio controls class="w-100">
                <source :src="audio" type="audio/mpeg">
              </audio>
            </div>

            <div v-else-if="file">
              <label class="d-block mt-3">Título do módulo</label>
              <div class="d-flex w-100">
                <b-form-group class="mb-0 w-100">
                  <b-form-input v-model="modelObject.name" class="input-border" type="text" @change="updateAttr"
                                placeholder="Insira o título do seu módulo"/>
                </b-form-group>
                <button class="btn btn-transparent cursor-pointer"><i class="black-eye-ico"></i></button>
              </div>
            </div>

            <div v-else class="drop-area" @click="$refs.fileInput.click()" v-cloak @drop.prevent="loadFile"
                 @dragover.prevent>
              <input class="d-none" ref="fileInput" type="file" enctype="multipart/form-data" @change="loadFile"
                     :accept="type === 'audio' ? 'audio/*' : '*/*'">
              <div class="w-100 text-center">
                <img height="auto" width="48px" :class="{'mic-ico': type === 'audio', 'file-ico': type === 'file'}">
                <div class="mt-2">Arraste ou <u>selecione</u> um arquivo {{ type === 'audio' ? "de aúdio" : "" }}</div>
              </div>
            </div>

          </div>

          <div class="mt-3">
            <b-form-checkbox class="checkbox-style" v-model="modelObject.canDownload" :value="true" @change="updateAttr">Permitir download
            </b-form-checkbox>
          </div>
        </div>

        <div class="w-100" v-else-if="type === 'video'">
          <label class="d-block">Insira o link para vídeo do Youtube ou Vimeo</label>
          <b-form-group>
            <b-form-input v-model="modelObject.link" class="input-border" type="text" @change="updateAttr"
                          placeholder="www.youtube.com"/>
          </b-form-group>
          <div class="mt-3">
            <b-form-checkbox class="checkbox-style" v-model="modelObject.hasDRM" :value="true" @change="updateAttr">
              Incluir DRM nesse vídeo. <i class="help-circle-ico ml-2" v-b-tooltip.hover="{customClass: 'tooltip-box' }" :title="drmMessage" ></i>
            </b-form-checkbox>

            <b-tooltip target="my-button" custom-class="my-tooltip-class">Tooltip Title</b-tooltip>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {type: String},
    index: {type: Number},
    dataObject: {type: Object}
  },
  data() {
    return {
      types: {
        text: {classIco: 'fonts-purple-ico', label: 'Texto'},
        audio: {classIco: 'mic-purple-ico', label: 'Áudio'},
        video: {classIco: 'video-purple-ico', label: 'Vídeo'},
        file: {classIco: 'file-purple-ico', label: 'Arquivo'},
        incorporate: {classIco: 'incorporate-purple-ico', label: 'Incorporar'},
        task: {classIco: 'task-purple-ico', label: 'Atividade'}
      },
      drmMessage: 'O DRM (Gerenciamento dos Direitos Digitais) protege o seu conteúdo ao acrescentar imagens em posições variadas do vídeo, dificultando o plágio.',
      hasDownload: false,
      showModule: false,
      modelObject: {},
      audio: null,
      file: null,
      show: false,
    }
  },
  methods: {
    loadFile(e) {
      const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      const url = window.URL.createObjectURL(file);

      if (this.type === 'audio') {
        this.audio = url;
      }
      else if (this.type === 'file') {
        this.file = url;
      }

      this.toBase64(file).then(response => {
        this.modelObject.content = response;
      }).finally(() => {
        this.$emit('update-item', {collection: this.type, item: {...this.modelObject}});
      })
    },
    updateAttr() {
      this.$emit('update-item', {collection: this.type, item: {...this.modelObject}})
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      })
    },
  }
}
</script>

<style scoped>
.content-box {
  display: block;
  background: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
}

.resume-box {
  padding: 20px 21.5px;
}


.drop-area {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 2px dashed #CDCDCE;
  background: #FBFBFB;
  border-radius: 8px;
  font-size: 14px;
  color: #A7A7AB;
}

u, .purple-link {
  text-decoration: none;
  color: #89238A;
}

</style>
