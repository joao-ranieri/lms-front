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
                  <b-form-input v-model="course.title" class="input-border" type="text" @keyup="validate(course.title)"
                                placeholder="Tran Mau Tri Tam"/>
                </b-form-group>
            </div>

            <div :class="['input-step-group', {'active': position === 2}]" v-if="position <= 2">
              <label class="d-block">Em qual categoria ele se encaixa?</label>
              <FormSelectSearch :items="categoriesList" type="categories" @return-selection="setProperty"/>
            </div>

            <div :class="['input-step-group', {'active': position === 3}]" v-if="position <= 3">
              <label class="d-block">Quem criou esse curso?</label>
              <FormSelectSearch :items="authorList" type="authors" @return-selection="setProperty"/>
            </div>

            <div :class="['input-step-group', {'active': position === 4}]" v-if="position <= 4">
              <label class="d-block">Qual o tipo de acesso desse curso?</label>
              <b-form-group class="radio-style">
                <b-form-radio name="some-radios" value="PAGO" v-model="course.accessType" @change="validate(course.accessType)"><strong>Pago -</strong> é necessário o pagamento para liberar
                  acesso
                </b-form-radio>
                <b-form-radio name="some-radios" value="GRATUITO" v-model="course.accessType" @change="validate(course.accessType)"><strong>Gratuito -</strong> é necessário apenas o cadastro para
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
                <b-form-input v-model="course.supportPage" class="input-border" type="text"
                              placeholder="Insira o link da página de ajuda"/>
              </b-form-group>
              <label class="d-block mt-2">Se não houver, você pode pular essa etapa.</label>
            </div>

            <div :class="['input-step-group', {'active': position === 2}]" v-if="position <= 2">
              <label class="d-block">No seu curso, os alunos podem:</label>
              <b-form-group class="checkbox-style">
                <b-form-checkbox-group v-model="permissions" :options="permissionOptions"></b-form-checkbox-group>

                <label class="d-block" v-if="course.issueCertificate">Quanto precisa ser concluído para emissão do certificado?</label>
                <b-form-group v-if="permissions.includes('issueCertificate')">
                  <b-form-input v-model="course.certificateIssuePercentage" class="input-border" type="text" @keyup="validate(course.certificateIssuePercentage)"
                                placeholder="Insira uma porcentagem"/>
                </b-form-group>
              </b-form-group>
            </div>

            <div :class="['input-step-group', {'active': position === 3}]" v-if="position <= 3">
              <label class="d-block">Esse curso possui termos e condições?</label>
              <b-form-group class="radio-style">
                <b-form-radio name="some-radios" value="N" v-model="term" @change="validate(term)">
                  <strong>Não</strong>, não precisa de Termos e Condições
                </b-form-radio>
                <b-form-radio name="some-radios" value="Y" v-model="term" @change="validate(term)">
                  <strong>Sim</strong>, precisa de Termos e Condições
                </b-form-radio>
              </b-form-group>

              <b-form-textarea v-if="term === 'Y'" v-model="course.acceptanceText" rows="6"
                               @keyup="validate(course.acceptanceText)" placeholder="Insira seus Termos e Condições">
              </b-form-textarea>

            </div>
          </div>

          <div style="position: relative; right: -588px; top: 26px">
            <button class="btn d-block btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="isDisabled">Ok</button>
<!--            <button v-if="(step === 1 && position > 1) || step === 2" @click="returnPosition"-->
<!--                    class="btn d-block btn-rounded-purple small-button pl-4 pr-4 mt-2">Anterior</button>-->
          </div>
        </div>
      </div>

      <ModalAddCategory @refresh-categories="getCategoriesList"/>
      <ModalAuthor @refresh-authors="getAuthorList"/>

      <footer>
        <div class="progress-cadastro">
          <div class="state-progress" :style="{width: '30%'}"/>
        </div>
        <div class="content-footer">
          <b-button class="d-block" @click="$nuxt.$router.push('/dashboard/cursos')" v-b-tooltip="'Voltar'">
            Voltar
          </b-button>

          <div>
            <b-button class="btn-rounded-purple mr-3" v-b-tooltip="'Salvar rascunho'"  @click="sendForm()">
              Salvar rascunho
            </b-button>

            <b-button class="btn-purple" v-b-tooltip="'Publicar curso'" @click="sendForm(true)"
                      :disabled="(step === 1 && position < 5) || (step === 2 && position < 3) || isDisabled">
              Publicar curso
            </b-button>
          </div>

        </div>
      </footer>
    </div>
    <CourseSideProgressAdd
      @change-position="changeInputProgress"
      @change-step="changeStep"
      :currentStep="step"
      :currentPosition="position"
      :itensProgress="itensProgress" />
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
      categoriesList: [],
      authorList: [],
      permissionOptions: [
        { text: 'Marcar aula como assistida', value: 'manualCheck' },
        { text: 'Acessar simultâneamente por mais de um dispositivo', value: 'hasSimultaneousAccess' },
        { text: 'Ver o progresso do curso em porcentagem e quantidade de aulas concluídas', value: 'canDisplayProgress' },
        { text: 'Emitir certificado automaticamente', value: 'issueCertificate' }
      ],
      permissions: [],
      term: null,
      course: {
        title: null,
        categories: [],
        authors: [],
        accessType: null,
        description: null,
        coverImage: null,
        supportPage: null,
        manualCheck: false,
        hasSimultaneousAccess: false,
        canDisplayProgress: false,
        issueCertificate: false,
        certificateIssuePercentage: null,
        acceptanceText: null,
        publishCourse: false
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
      if ((this.course.issueCertificate && !this.course.certificateIssuePercentage) ||
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
    sendForm(publish){
      let authors = [];
      this.course.authors.forEach(author => {
        authors.push(author.id);
      });
      this.course.authors = authors;

      let categories = [];
      this.course.categories.forEach(category => {
        categories.push(category.id);
      })
      this.course.categories = categories;

      this.permissions.forEach(option => {
        this.course[option] = true;
      })

      this.course.certificateIssuePercentage = parseFloat(this.course.certificateIssuePercentage);

      this.course.publishCourse = publish;

      if (this.course.id) {
        this.$axios.$put('/course/'+this.course.id, this.course).then(response => {
          this.isSuccess = true;
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.isLoading = false;
        })
      }
      else {
        this.$axios.$post('/course', this.course).then(response => {
          $nuxt.$router.push('/dashboard/cursos');
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          // this.isLoading = false;
        })
      }
    },
    changeStep(step) {
      this.step = step + 1;
      this.position = 1;
    },
    changeInputProgress(e) {
      if(e.indexItem + 1 !== this.step) { this.changeStep(e.indexItem) }
      this.position = e.indexSub + 1;

    },
    getCategoriesList() {
      this.$axios.$get(`/category/all?page=${1}&size=${1000}&orderBy=${'name'}&direction=${'ASC'}`).then(response => {
        this.categoriesList = [...response.data];
      });
    },
    getAuthorList() {
      this.$axios.$get(`/author/all?page=${1}&size=${1000}&orderBy=${'name'}&direction=${'ASC'}`).then(response => {
        this.authorList = [...response.data];
      });
    }
  },
  mounted() {
    this.getCategoriesList();
    this.getAuthorList();

    if($nuxt.$route.params.id) {
      this.$axios.$get('/course', {params: {id: $nuxt.$route.params.id}}).then(response => {
        this.course = {...response.data.data};
      });
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
