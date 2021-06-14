<template>
  <div>
    <b-modal id="author" title="Cadastrar" centered no-close-on-esc no-close-on-backdrop hide-footer
             header-class="border-0" dialog-class="modal-author" ref="modalAuthor">
      <b-form id="login-form" @submit.prevent="executeForm">

        <div class="box-form">
            <span v-if="!isSuccess">
            <input style="display: none" ref="fileInput" type="file" @change="setImage" enctype="multipart/form-data">

            <div class="drop-image d-flex cursor-pointer" @click="$refs.fileInput.click()" v-cloak
                 @drop.prevent="setImage" @dragover.prevent>
              <span class="selected-image">
                <img width="128" height="128" :src="imageURL" alt="author-image">
              </span>
              <span class="instructions">
                <span class="top-text mb-1">
                  Arraste ou <span>selecione</span> uma foto de perfil
                </span>
                <span class="sub-text">
                  Imagens com 200x200 pixels ou mais ficam com qualidade melhor.
                </span>
              </span>
            </div>

            <FormInput class="mt-4 position-relative" @value-model="setValue" :isRequired="true" labelText="Nome"
                       nameInput="name" size="lg" :isNew="true" placeholder="Digite nome e sobrenome"
                       :value="author && author.name ? author.name : null"/>

            <FormInput class="mt-4 position-relative" @value-model="setValue" :isRequired="true" labelText="Descrição"
                       nameInput="description" size="lg" :isNew="true" :value="author && author.description ? author.description : null"
                       placeholder="Faça uma pequena descrição para essa pessoa"/>

            <span class="error-login" v-if="notification" v-text="notification"></span>
              </span>
          <span v-else-if="isSuccess">
          <UtilsAnimation src="/animations/save-success.json" :cssGroup="{'transform': 'scale(1.5)'}"/>
          <span class="green-text text-center d-block">Cadastro realizado com sucesso!</span>
        </span>

          <div class="mt-5 mb-2 d-flex justify-content-around">
            <b-button class="btn-grey lg" :disabled="isLoading" @click="close">
              {{ isSuccess ? 'Fechar' : 'Cancelar' }}
            </b-button>
            <b-button variant="none" type="submit" :disabled="isLoading" class="btn-purple lg ml-2">
              <UtilsLoading v-if="isLoading"/>
              <span v-else>{{ isSuccess ? 'Novo cadastro' : 'Adicionar autor' }}</span>
            </b-button>
          </div>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    author: {type: Object}
  },
  data() {
    return {
      authorForm: {
        image: '../../assets/img/utils/photo-drop.svg'
      },
      imageURL: require('../../assets/img/utils/photo-drop.svg'),
      isLoading: false,
      isSuccess: false,
      notification: null
    }
  },
  methods: {
    setValue(v) {
      this.authorForm[v.model] = v.value;
      console.log(this.authorForm)
    },
    setImage(e) {
      this.imageURL = window.URL.createObjectURL(e.dataTransfer.files[0]);
      this.authorForm['image'] = 'url';
    },
    executeForm() {
      if (this.isSuccess) {
        this.isSuccess = false;
        this.authorForm = {image: null}
        return;
      }

      this.isLoading = true;

      if (this.author && this.author.id) {
        console.log('aqui')
      } else {
        this.$axios.$post('/author', this.authorForm).then(response => {
          this.isSuccess = true;
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
        .finally(()=>{
          this.isLoading = false;
        })
      }
    },
    close(){
      this.$bvModal.hide('author');
      this.$root.$emit('refresh-authors');
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

.selected-image img {
  border-radius: 50%;
  object-fit: cover;
}

.instructions {
  margin-left: 16px;
}

.instructions .top-text {
  font: 16px "Inter Bold";
  display: block;
  line-height: 24px;
  color: #5C5C64;
}

.instructions .top-text > span {
  text-decoration: underline;
  color: #89238A;
}

.instructions .sub-text {
  display: block;
  font: 13px "Inter Regular";
  color: #A7A7AB;
  ine-height: 18px;
}

.green-text {
  display: block;
  font-family: "Poppins Regular";
  font-size: 18px;
  line-height: 24px;
  color: #7FBA7A;
}
</style>
