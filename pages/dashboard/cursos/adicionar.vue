<template>
  <div class="form-addCurso">
    <div class="main-form">
      <header style="padding-left: 2px;">
        <h4 v-text="title"></h4>
        <span class="sub-text-form" v-text="subtitle"></span>
      </header>

      <div class="content-addCurso-form overflow-hidden">
        <div class="h-100 position-relative">
          <div class="group-inputs-carousel" v-if="step === 1">
            <div :class="['input-step-group', {'active': position === 1}]" v-if="position <= 1">
                <label class="d-block">Como seu curso será chamado?</label>
                <b-form-group>
                  <b-form-input v-model="course.name" class="input-border" type="text" @keyup="validate(course.name)"
                                placeholder="Tran Mau Tri Tam"/>
                </b-form-group>
            </div>

            <div :class="['input-step-group', {'active': position === 2}]" v-if="position <= 2">
              <label class="d-block">Em qual categoria ele se encaixa?</label>
              <FormSelectSearch v-if="categoriesList" :items="categoriesList" type="categories" @return-selection="setProperty"/>
            </div>

            <div :class="['input-step-group', {'active': position === 3}]" v-if="position <= 3">
              <label class="d-block">Quem criou esse curso?</label>
              <FormSelectSearch v-if="authorList" :items="authorList" type="author" @return-selection="setProperty"/>
            </div>

            <div :class="['input-step-group', {'active': position === 4}]" v-if="position <= 4">
              <label class="d-block">Qual o tipo de acesso desse curso?</label>
              <b-form-group class="radio-style">
                <b-form-radio name="some-radios" value="P" v-model="course.accessType" @change="validate(course.accessType)"><strong>Pago -</strong> é necessário o pagamento para liberar
                  acesso
                </b-form-radio>
                <b-form-radio name="some-radios" value="F" v-model="course.accessType" @change="validate(course.accessType)"><strong>Gratuito -</strong> é necessário apenas o cadastro para
                  liberar acesso
                </b-form-radio>
              </b-form-group>
            </div>

            <div style="width: 572px" :class="['input-step-group', 'd-flex', {'active': position === 5}]" v-if="position <= 5">
              <UtilsDropImage @send-image="setProperty"/>
              <div class="box-info-image ml-3">
                <h6 class="grey-neutral-6">Escolha a imagem de capa do seu curso</h6>
                <span class="d-block grey-neutral">
                Essa será imagem aparecerá como capa no catálogo de cursos. <br><br><br>
                Use uma imagem de alta qualidade, em formato vertical e com <strong>dimensão mínima de 300x400 pixels</strong> para garantir uma boa visualização.
              </span>
              </div>
            </div>
          </div>

          <div class="group-inputs-carousel" v-if="step === 2">
            <div :class="['input-step-group', {'active': position === 1}]" v-if="position <= 1">
              <label class="d-block">O curso possui alguma Central de Ajuda ou página de Suporte?</label>
              <b-form-group>
                <b-form-input v-model="course.link" class="input-border" type="text"
                              placeholder="Insira o link da página de ajuda"/>
              </b-form-group>
              <label class="d-block mt-2">Se não houver, você pode pular essa etapa.</label>
            </div>

            <div :class="['input-step-group', {'active': position === 2}]" v-if="position <= 2">
              <label class="d-block">No seu curso, os alunos podem:</label>
              <b-form-group class="checkbox-style">
                <b-form-checkbox-group v-model="course.permissions" :options="permissionOptions" @change="validate(course.permissions)">
                </b-form-checkbox-group>

                <label class="d-block" v-if="course.permissions.includes('C')">Quanto precisa ser concluído para emissão do certificado?</label>
                <b-form-group v-if="course.permissions.includes('C')">
                  <b-form-input v-model="course.percent" class="input-border" type="text" @keyup="validate(course.percent)"
                                placeholder="Insira uma porcentagem"/>
                </b-form-group>
              </b-form-group>
            </div>

            <div :class="['input-step-group', {'active': position === 3}]" v-if="position <= 3">
              <label class="d-block">Esse curso possui termos e condições?</label>
              <b-form-group class="radio-style">
                <b-form-radio name="some-radios" value="N" v-model="course.term" @change="validate(course.term)">
                  <strong>Não</strong>, não precisa de Termos e Condições
                </b-form-radio>
                <b-form-radio name="some-radios" value="Y" v-model="course.term" @change="validate(course.term)">
                  <strong>Sim</strong>, precisa de Termos e Condições
                </b-form-radio>
              </b-form-group>

              <b-form-textarea v-if="course.term === 'Y'" v-model="course.acceptanceText" rows="6"
                               @keyup="validate(course.acceptanceText)" placeholder="Insira seus Termos e Condições">
              </b-form-textarea>

            </div>
          </div>

          <div style="position: relative; right: -588px; top: 26px">
            <button class="btn d-block btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="isDisabled">Próximo</button>
<!--            <button v-if="(step === 1 && position > 1) || step === 2" @click="returnPosition"-->
<!--                    class="btn d-block btn-rounded-purple small-button pl-4 pr-4 mt-2">Anterior</button>-->
          </div>
        </div>
      </div>

      <footer>
        <div class="progress-cadastro">
          <div class="state-progress" :style="{width: '30%'}"/>
        </div>
        <div class="content-footer">
          <b-button class="d-block" @click="$nuxt.$router.push('/dashboard/cursos')" v-b-tooltip="'Voltar'">
            Voltar
          </b-button>

          <div>
            <b-button class="btn-rounded-purple mr-3" v-b-tooltip="'Salvar rascunho'">
              Salvar rascunho
            </b-button>

            <b-button class="btn-purple" v-b-tooltip="'Publicar curso'" @click="sendForm"
                      :disabled="(step === 1 && position < 5) || (step === 2 && position < 3) || isDisabled">
              Publicar curso
            </b-button>
          </div>

        </div>
      </footer>
    </div>
    <CourseSideProgressAdd :itensProgress="itensProgress"/>
  </div>
</template>

<script>
import Header from '../../../components/Menu/Header.vue'

export default {
  components: {Header},
  head() {
    return {
      title: "Adicionar Curso - Masters",
    }
  },
  data(){
    return {
      position: 1,
      step: 1,
      title: 'Vamos cadastrar seu novo curso!',
      subtitle: 'Primeiro precisamos de alguns dados básicos',
      isDisabled: true,
      categoriesList: [
        {name: 'Item 1', selected: false},
        {name: 'Item 2', selected: false},
        {name: 'Item 3', selected: false},
        {name: 'Item 4', selected: false},
        {name: 'Item 5', selected: false},
        {name: 'Item 6', selected: false},
        {name: 'Item 7', selected: false},
        {name: 'Item 8', selected: false},
        {name: 'Item 9', selected: false},
        {name: 'Item 10', selected: false},
        {name: 'Item 11', selected: false},
      ],
      authorList: [
        {name: 'Item 1', selected: false},
        {name: 'Item 2', selected: false},
        {name: 'Item 3', selected: false},
        {name: 'Item 4', selected: false},
        {name: 'Item 5', selected: false},
        {name: 'Item 6', selected: false},
        {name: 'Item 7', selected: false},
        {name: 'Item 8', selected: false},
        {name: 'Item 9', selected: false},
        {name: 'Item 10', selected: false},
        {name: 'Item 11', selected: false},
      ],
      permissionOptions: [
        { text: 'Marcar aula como assistida', value: 'M' },
        { text: 'Acessar simultâneamente por mais de um dispositivo', value: 'A' },
        { text: 'Ver o progresso do curso em porcentagem e quantidade de aulas concluídas', value: 'V' },
        { text: 'Emitir certificado automaticamente', value: 'C' }
      ],
      course:{
        name: null,
        categories: [],
        author: [],
        accessType: null,
        image: null,
        link: null,
        permissions: [],
        percent: null,
        term: null,
        acceptanceText: null
      },
      itensProgress: [
        {
          title: "Sobre o curso",
          subItems: [
            {title: 'Título'},
            {title: 'Categoria'},
            {title: 'Autores'},
            {title: 'Acesso'},
            {title: 'Imagem'},
          ],
        },
        {
          title: "Opções do aluno",
          subItems: [
            {title: 'Página de suporte'},
            {title: 'Permissões'},
            {title: 'Termos e condições'},
          ],
        },
        {
          title: "Módulos e aulas",
          subItems: [
            {title: 'Adicionar módulos'},
            {title: 'Adicionar aulas'},
          ],
        },

      ],
    }
  },
  methods:{
    nextPosition(){
      this.position += 1;
      this.isDisabled = true;

      if(this.position === 6) {
        this.title = 'Legal! Agora algumas configurações avançadas';
        this.subtitle = 'Vamos configurar algumas opções para os seus alunos';
        this.step = 2;
        this.position = 1;
        this.isDisabled = false;
      }
    },
    returnPosition(){
      if(this.step === 1 && this.position > 1){
        this.position -= 1;
      }
      else if (this.step === 2 && this.position === 1){
        this.step = 1;
        this.position = 5;
      }

      this.isDisabled = false;

    },
    validate(value) {
      if ((this.course.permissions.length > 0 && this.course.permissions.includes('C') && !this.course.percent) ||
         (this.course.term && this.course.term === 'Y' && !this.course.acceptanceText) || !value || value.length === 0) {
        this.isDisabled = true;
      }
      else {
        this.isDisabled = false;
      }
    },
    setProperty(value) {
      this.course[value.prop] = value.collection ? value.collection : value.item;

      if(this.course[value.prop] && this.course[value.prop].length > 0){
        this.isDisabled = false;
      }
      else {
        this.isDisabled = true;
      }
    },
    sendForm(){
      console.log(this.course)
    }
  }
}
</script>

<style scoped>
.form-addCurso {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
}

.sub-text-form {
  font: 14px "Inter Regular";
  color: #828287;
}

.form-addCurso .main-form {
  padding: 40px 0 40px 66px;
  max-height: 100%;
  overflow: hidden;
}

.content-addCurso-form {
  display: block;
  padding-top: 30px;
  height: calc(100% - 121px);
}

.group-inputs-carousel {
  position: absolute;
  bottom: 54px;
  height: 100px;
  max-width: 572px;
  width: 100%;
}

.group-inputs-carousel .input-step-group {
  position: relative;
  transition: .3s all;
  padding-left: 2px;
  z-index: -1;
}

.group-inputs-carousel .input-step-group.active {
  align-items: center;
  width: 100%;
  z-index: 1;
  top: calc(-100vh + 483px);
}

.group-inputs-carousel .box-info-image {
  width: 405px;
  background: #FBFBFB;
  border: 1px solid #F2F2F2;
  border-radius: 16px;
  padding: 32px;
}

/* footer */
footer {
  grid-column: 1/-1;
  z-index: 5;
  box-shadow: -19px -20px 20px 5px rgb(255 255 255);
  height: 108px;
}

footer .progress-cadastro {
  background: #F2F2F2;
  width: 100%;
  height: 2px;
}

footer .progress-cadastro .state-progress {
  background: #A7A7AB;
  height: 2px;
}

footer .content-footer {
  background: #FFFFFF;
  width: 100%;
  height: 108px;
  padding: 0 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
</style>
