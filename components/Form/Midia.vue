<template>
  <div class="content-box mt-3">
    <div class="resume-box w-100 d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <span class="three-points mr-2"></span>
        <span :class="types[type].classIco"></span>
        <h6 class="d-inline-block mb-0 ml-2" v-text="types[type].label"></h6>
      </div>
      <div class="d-flex align-items-center">
        <span @click="$emit('remove-item', {index: taskObj.id})" class="cursor-pointer trash-ico mr-4"></span>
        <a href="#" @click="showModule = !showModule"><img src="../../assets/img/utils/ico-arrow-dropdown.svg"></a>
      </div>
    </div>
    <div class="expanded-box pb-3" v-show="showModule">
      <div style="margin-top: 16px; gap: 16px" class="d-flex w-100 justify-content-between pl-3 pr-3">
        <div class="w-100" v-if="type === 'text' || type === 'incorporate'">
          <label class="d-block">
            {{ item.type === 'incorporate' ? 'Insira o código que deseja incorporar' : 'Texto' }}
          </label>
          <b-form-textarea v-model="modelObject.text" rows="6"
                           :placeholder='type === "incorporate" ? "<embed type=\"image/jpg\" src=\"pic_trulli.jpg\" width=\"300\" height=\"200\"" : "Insira o texto que fará parte da sua aula"'>
          </b-form-textarea>

          <a href="https://rockcontent.com/br/blog/embed-code-o-que-e/" target="_blank" v-if="type === 'incorporate'"
             class="mt-3 d-block purple-link">Não sabe o que são links incorporados?</a>
        </div>

        <div class="w-100" v-else-if="['audio', 'file'].includes(type)">
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
            <b-form-checkbox class="checkbox-style" v-model="modelObject.canDownload" :value="true"
                             @change="updateAttr">Permitir download
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
              Incluir DRM nesse vídeo. <i class="help-circle-ico ml-2" v-b-tooltip.hover="{customClass: 'tooltip-box' }"
                                          :title="drmMessage"></i>
            </b-form-checkbox>

            <b-tooltip target="my-button" custom-class="my-tooltip-class">Tooltip Title</b-tooltip>
          </div>
        </div>

        <div class="w-100" v-else-if="type === 'task'">
          <div class="w-100" v-if="!taskSettings.type">
            <label class="d-block">Escolha o tipo de atividade que deseja criar:</label>
            <div class="d-flex justify-content-between w-100 task-types">
              <span class="t-multiple-choice" @click="selectTypeQuestion('multiple-choice')">Múltiplas opções</span>
              <span class="t-checkbox" @click="selectTypeQuestion('checkbox')">Caixas de seleção</span>
              <span class="t-true-false" @click="selectTypeQuestion('true-or-false')">Verdadeiro ou falso</span>
              <span class="t-short-answer" @click="selectTypeQuestion('short-answer')">Resposta curta</span>
            </div>
          </div>

          <div v-else>
            <h6 v-text="taskName[typeQuestion]"></h6>
            <b-form-group class="mb-0 w-100 mt-3">
              <b-form-input v-model="taskSettings.title" class="input-border" type="text" @change="updateAttr"
                            placeholder="Insira o enunciado da sua atividade"/>
            </b-form-group>

            <div class="options" v-if="taskSettings.type.includes('multiple-choice')">
              <div class="w-100 mt-3 mb-3 text-right">
                <a class="d-block purple-link cursor-pointer" @click="addOption('radio')">Criar alternativa</a>
              </div>

              <draggable v-model="taskSettings.options" draggable=".radio-option-task" @change="reorderValues">
                <transition-group>
                  <div class="w-100 mt-2 radio-option-task pl-3" v-for="(option, index) in taskSettings.options"
                       :key="index">
                    <b-form-group class="checkbox-style" style="width: 500px">
                      <b-form-radio-group name="options" v-model="taskSettings.rightAnswer">
                        <b-form-radio :value="index">
                          <b-form-textarea v-model="option.text" placeholder="Insira a descrição dessa opção"
                                           rows="1" max-rows="6" style="height: 45px"></b-form-textarea>
                        </b-form-radio>

                      </b-form-radio-group>
                    </b-form-group>
                    <div class="actions-task">
                      <button class="btn btn-rounded-purple trash" v-b-tooltip="'Remover'"
                              @click="actionTask('remove', index)"></button>
                      <button class="btn btn-rounded-purple ml-3 check" v-b-tooltip="'Marcar como correta'"
                              @click="actionTask('setCorrect', index)"></button>
                    </div>
                  </div>
                </transition-group>
              </draggable>

              <div class="text-center w-100 pt-4 text-center" v-if="taskSettings.options.length > 0">
                <button class="btn btn-purple" @click="previewTask">Pre-visualização</button>
              </div>
            </div>

            <div class="options" v-else-if="taskSettings.type.includes('true-or-false')">

              <draggable v-model="taskSettings.options" draggable=".radio-option-task" @change="reorderValues">
                <transition-group>
                  <div class="w-100 mt-2 radio-option-task pl-3" v-for="(option, index) in taskSettings.options"
                       :key="index">
                    <b-form-group class="checkbox-style" style="width: 500px">
                      <b-form-radio-group name="questionCheck" v-model="taskSettings.rightAnswer">
                        <b-form-radio :value="option.value">
                          <span class="label-radio-option">{{ option.text }}</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>
                    <div class="actions-task">
                      <button class="btn btn-rounded-purple ml-3 check" v-b-tooltip="'Marcar como correta'"
                              @click="setAnswerTrueFalse(option.value, index)"></button>
                    </div>
                  </div>
                </transition-group>
              </draggable>

              <div class="text-center w-100 pt-4 text-center" v-if="taskSettings.options.length > 0">
                <button class="btn btn-purple" @click="previewTask">Pre-visualização</button>
              </div>
            </div>

            <div class="options" v-else-if="taskSettings.type.includes('checkbox')">
              <div class="w-100 mt-3 mb-3 text-right">
                <a class="d-block purple-link cursor-pointer" @click="addOption('checkbox')">Criar alternativa</a>
              </div>

              <draggable v-model="taskSettings.options" draggable=".radio-option-task" @change="reorderValues">
                <transition-group>
                  <div class="w-100 mt-2 radio-option-task pl-3" v-for="(option, index) in taskSettings.options"
                       :key="index">
                    <b-form-group class="checkbox-style" style="width: 500px">
                      <b-form-checkbox :name="'opt_'+nameOpt" :id="'opt_'+nameOpt" v-model="taskSettings.rightAnswer" :key="index" :value="index">
                        <b-form-textarea v-model="option.text" placeholder="Insira a descrição dessa opção"
                                         rows="1" max-rows="6" style="height: 45px"></b-form-textarea>
                      </b-form-checkbox>
                    </b-form-group>
                    <div class="actions-task">
                      <button class="btn btn-rounded-purple trash" v-b-tooltip="'Remover'"
                              @click="actionTask('remove', index)"></button>
                      <button class="btn btn-rounded-purple ml-3 check" v-b-tooltip="'Marcar como correta'"
                              @click="setAnswerCheckbox(option, index)"></button>
                    </div>
                  </div>
                </transition-group>
              </draggable>

              <div class="text-center w-100 pt-4 text-center" v-if="taskSettings.options.length > 0">
                <button class="btn btn-purple" @click="previewTask">Pre-visualização</button>
              </div>
            </div>

            <div class="options d-flex w-100 align-items-center" v-else-if="taskSettings.type.includes('short-answer')">
              <span class="d-inline pencil-ico ml-2 mr-3 align-middle"></span>
              <b-form-group class="mb-0 w-100 mt-3">
                <b-form-textarea v-model="taskSettings.options[0].value" placeholder="Insira a resposta da questão"
                                 rows="4" max-rows="6"></b-form-textarea>
              </b-form-group>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="taskView.type">
      <ModalPreviewTask :task="taskView"/>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  props: {
    taskObj: {type: Object},
    type: {type: String}
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
      selectedTask: null,
      taskSettings: {
        type: null,
        title: null,
        rightAnswer: null,
        options: []
      },
      typeQuestion: null,
      taskView: {},
      taskName: {
        'multiple-choice': 'Múltipla escolha',
        'checkbox': 'Seleção Múltipla',
        'true-or-false': 'Verdadeiro ou falso',
        'short-answer': 'Resposta curta'
      },
      nameOpt: new Date().getTime()
    }
  },
  methods: {
    loadFile(e) {
      const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      const url = window.URL.createObjectURL(file);

      if (this.type === 'audio') {
        this.audio = url;
      } else if (this.type === 'file') {
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
    updateTask() {
      this.taskSettings.id ||= this.taskObj.id;
      this.taskSettings.contentType = this.taskObj.contentType;
      this.$emit('update-item', {collection: this.type, item: {...this.taskSettings}})
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      })
    },
    addOption() {
      let option = {
        text: null,
        value: this.taskSettings.options.length,
        isCorrect: false,
      };
      this.taskSettings.options.push(option);
      this.updateTask();
    },
    actionTask(action, index) {
      switch (action) {
        case 'setCorrect':
          this.taskSettings.options.forEach((option, idx) => {
            option.isCorrect = index === idx;
          })
          this.taskSettings.rightAnswer = index;
          break;
        case 'remove':
          this.taskSettings.options.splice(index, 1)
          break;
      }
      this.updateTask();
    },
    setAnswerTrueFalse(answer, index) {
      this.taskSettings.options.forEach((option, idx) => {
        option.isCorrect = idx === index
      })
      this.taskSettings.rightAnswer = answer;
      this.updateTask();
    },
    setAnswerCheckbox(option, index){
      if(this.taskSettings.rightAnswer.includes(index)){
        this.taskSettings.rightAnswer.splice(this.taskSettings.rightAnswer.indexOf(index), 1);
        option.isCorrect = false;
      }
      else {
        this.taskSettings.rightAnswer.push(index)
        option.isCorrect = true;
      }
      this.updateTask();
    },
    reorderValues() {
      if(this.taskSettings.type.includes('checkbox')){
        this.taskSettings.rightAnswer = [];
        this.taskSettings.options.forEach((option, index) =>{
          if(option.isCorrect){
            this.taskSettings.rightAnswer.push(index);
          }
        })
      }
      else{
        this.taskSettings.rightAnswer = this.taskSettings.options.findIndex(option => {
          return option.isCorrect
        })
      }
      this.updateTask();
    },
    previewTask() {
      this.taskView = {};
      this.taskView = this.taskSettings;

      setTimeout(() => {
        this.$bvModal.show('preview-question');
      }, 250)
    },
    selectTypeQuestion(type) {
      this.taskSettings.type = type;
      this.typeQuestion = type;
      this.taskSettings.id = this.index;

      if (type.includes('true-or-false')) {
        this.taskSettings.options = [
          {
            text: 'Verdadeiro',
            value: 'Verdadeiro',
            isCorrect: false
          },
          {
            text: 'Falso',
            value: 'Falso',
            isCorrect: false
          }];
      }
      else if (type.includes('checkbox')) {
        this.taskSettings.rightAnswer = [];
      }
      else if(type.includes('short-answer')) {
        this.taskSettings.options = [{
            text: null,
            value: null,
            isCorrect: true
          }];
      }
      this.updateTask();
    }
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

.task-types > span {
  position: relative;
  display: inline-flex;
  padding: 12px 16px 12px 32px;
  border: 1px solid #8A8C92;
  border-radius: 8px;
  color: #8A8C92;
  cursor: pointer;
}

.task-types > span:hover {
  color: #89238A;
  border-color: #89238A;
}

.task-types .t-multiple-choice:before {
  position: absolute;
  width: 12px;
  height: 12px;
  top: calc(50% - 6px);
  left: 13px;
  content: '';
  background-image: url("../../assets/img/utils/ico-verify.svg");
  background-size: 12px 12px;
}

.task-types .t-checkbox:before {
  position: absolute;
  width: 12px;
  height: 12px;
  top: calc(50% - 6px);
  left: 13px;
  content: '';
  background-image: url("../../assets/img/utils/ico-check.svg");
  background-size: 12px 12px;
}

.task-types .t-true-false:before {
  position: absolute;
  width: 12px;
  height: 12px;
  top: calc(50% - 6px);
  left: 13px;
  content: '';
  background-image: url("../../assets/img/utils/ico-radio-btn.svg");
  background-size: 12px 12px;
}

.task-types .t-short-answer:before {
  position: absolute;
  width: 12px;
  height: 12px;
  top: calc(50% - 6px);
  left: 13px;
  content: '';
  background-image: url("../../assets/img/utils/ico-pencil-purple.svg");
  background-size: 12px 12px;
}

.radio-option-task {
  position: relative;
  height: 45px;
}

.radio-option-task:before {
  position: absolute;
  width: 10px;
  height: 100%;
  background: url("../../assets/img/utils/three-points-vertical.svg") no-repeat 50%;
  background-size: 5px;
  left: 4px;
  content: '';
}

.radio-option-task .actions-task {
  display: none;
  position: absolute;
  height: 30px;
  right: 0px;
  top: 0px;
  transition: all .2s;
}

.radio-option-task:hover .actions-task {
  display: block;
}

.radio-option-task:hover .actions-task button.trash {
  padding: 16px 20px;
  background: url("../../assets/img/utils/ico-trash-purple.svg") no-repeat 50%;
  background-size: 20px;
}

.radio-option-task:hover .actions-task button.check {
  padding: 16px 20px;
  background: url("../../assets/img/utils/ico-verify.svg") no-repeat 50%;
  background-size: 20px;
}

.radio-option-task:hover .actions-task button:hover {
  background-color: #fef0ff;
}

</style>
