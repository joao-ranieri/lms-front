<template>
  <div class="form-addCurso">
    <div :class="['main-form', {'course-module': step === 3 && position > 1}]">
      <header>
        <div v-if="!(step === 3 && position > 1)">
          <h4 v-html="headerText[step - 1].title"></h4>
          <span class="sub-text-form" v-html="headerText[step - 1].subtitle"></span>
        </div>
        <div v-else>
          <MenuNavigator @change-position="changePositon" :items="itemsNavigator" :current="position"/>
        </div>
      </header>

      <div class="content-addCurso-form overflow-hidden">
        <div class="h-100 position-relative">
          <div class="group-inputs-carousel" v-if="step === 1">
            <div :class="['input-step-group', {'active': position === 1}]" v-if="position <= 1">
              <div class="item-form">
                <label class="d-block">Como seu curso será chamado?</label>
                <b-form-group>
                  <b-form-input v-model="course.title" class="input-border" type="text" @keyup="validate(course.title)"
                                placeholder="Tran Mau Tri Tam"/>
                </b-form-group>
              </div>
              <div class="pl-3">
                <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="!course.title">Ok
                </button>
              </div>
            </div>

            <div :class="['input-step-group', {'active': position === 2}]" v-if="position <= 2">
              <div class="item-form">
                <label class="d-block">Em qual categoria ele se encaixa?</label>
                <FormSelectSearch :items="categoriesList" type="categories" @return-selection="setProperty"/>

              </div>
              <div class="pl-3">
                <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="course.categories.length === 0">Ok
                </button>
              </div>
            </div>

            <div :class="['input-step-group', {'active': position === 3}]" v-if="position <= 3">
              <div class="item-form">
                <label class="d-block">Quem criou esse curso?</label>
                <FormSelectSearch :items="authorList" type="authors" @return-selection="setProperty"/>

              </div>
              <div class="pl-3">
                <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="course.authors.length === 0">Ok
                </button>
              </div>
            </div>

            <div :class="['input-step-group', {'active': position === 4}]" v-if="position <= 4">
              <div class="item-form">
                <label class="d-block">Qual o tipo de acesso desse curso?</label>
                <b-form-group class="radio-style">
                  <b-form-radio  value="PAGO" v-model="course.accessType"
                                @change="validate(course.accessType)"><strong>Pago -</strong> é necessário o pagamento
                    para liberar
                    acesso
                  </b-form-radio>
                  <b-form-radio  value="GRATIS" v-model="course.accessType"
                                @change="validate(course.accessType)"><strong>Gratuito -</strong> é necessário apenas o
                    cadastro para
                    liberar acesso
                  </b-form-radio>
                </b-form-group>

              </div>
              <div class="pl-3">
                <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="!course.accessType">Ok
                </button>
              </div>
            </div>

            <div :class="['input-step-group', {'active': position === 5}]"
                 v-if="position <= 5">
              <div class="item-form d-inline-flex" style="gap: 16px">
                <UtilsDropImage @send-image="setProperty" :image="course.coverImage"/>
                <div class="box-info-image">
                  <h6 class="grey-neutral-6">Escolha a imagem de capa do seu curso</h6>
                  <span class="d-block grey-neutral">
                    Essa será imagem aparecerá como capa no catálogo de cursos. <br><br><br>
                    Use uma imagem de alta qualidade, em formato vertical e com <strong>dimensão mínima de 300x400 pixels</strong> para garantir uma boa visualização.
                  </span>
                </div>

              </div>
              <div class="pl-3">
                <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="!course.coverImage">Ok
                </button>
              </div>
            </div>
          </div>

          <div class="group-inputs-carousel" v-if="step === 2">
            <div :class="['input-step-group', {'active': position === 1}]" v-if="position <= 1">
              <div class="item-form">
                <label class="d-block">O curso possui alguma Central de Ajuda ou página de Suporte?</label>
                <b-form-group>
                  <b-form-input v-model="course.supportPage" class="input-border" type="text"
                                placeholder="Insira o link da página de ajuda"/>
                </b-form-group>
                <label class="d-block mt-2">Se não houver, você pode pular essa etapa.</label>
              </div>
              <div class="pl-3">
                <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition">Ok
                </button>
              </div>
            </div>

            <div :class="['input-step-group', {'active': position === 2}]" v-if="position <= 2">
              <div class="item-form">
                <label class="d-block">No seu curso, os alunos podem:</label>
                <b-form-group class="checkbox-style">
                  <b-form-checkbox-group v-model="permissions" :options="permissionOptions"></b-form-checkbox-group>

                  <label class="d-block" v-if="course.issueCertificate">Quanto precisa ser concluído para emissão do
                    certificado?</label>
                  <b-form-group v-if="permissions.includes('issueCertificate')">
                    <b-form-input v-model="course.certificateIssuePercentage" class="input-border" type="text"
                                  @keyup="validate(course.certificateIssuePercentage)"
                                  placeholder="Insira uma porcentagem"/>
                  </b-form-group>
                </b-form-group>
              </div>
              <div class="pl-3">
                <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="permissions.length === 0">Ok
                </button>
              </div>
            </div>

            <div :class="['input-step-group', {'active': position === 3}]" v-if="position <= 3">
              <div class="item-form">
                <label class="d-block">Esse curso possui termos e condições?</label>
                <b-form-group class="radio-style">
                  <b-form-radio  value="N" v-model="term" @change="validate(term)">
                    <strong>Não</strong>, não precisa de Termos e Condições
                  </b-form-radio>
                  <b-form-radio  value="Y" v-model="term" @change="validate(term)">
                    <strong>Sim</strong>, precisa de Termos e Condições
                  </b-form-radio>
                </b-form-group>

                <b-form-textarea v-if="term === 'Y'" v-model="course.acceptanceText" rows="6"
                                 @keyup="validate(course.acceptanceText)" placeholder="Insira seus Termos e Condições">
                </b-form-textarea>
              </div>
              <div class="pl-3">
                <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="!term || (term === 'Y' && !course.acceptanceText)">Ok
                </button>
              </div>
            </div>
          </div>

          <div class="group-inputs-carousel group-module" v-if="step === 3">
            <div :class="['input-step-group', {'active': position === 1}]" v-if="position <= 1">
              <div class="item-form">
                <button class="btn btn btn-block btn-rounded-purple" @click="nextPosition">+ Criar módulo</button>
                <draggable draggable=".item">
                  <CourseModule v-for="(module, index) in moduleList" :key="module.sequence" :module="module" class="item"
                    @add-lesson="openFormLesson(index)"/>
                </draggable>
              </div>
            </div>

            <div :class="['input-step-group', {'active': position === 2}]" v-if="position <= 2">
              <div class="item-form">

                <label class="d-block">Título do módulo</label>
                <b-form-group>
                  <b-form-input v-model="module.title" class="input-border" type="text"
                                placeholder="Insira o título do seu módulo"/>
                </b-form-group>

                <label class="d-block mt-4">Quando será disponibilizado?</label>
                <b-form-group class="radio-style">
                  <b-form-radio value="immediate" v-model="module.availability">
                    Imediatamente, assim que o curso for publicado.
                  </b-form-radio>

                  <b-form-radio value="registration" v-model="module.availability">
                    De acordo com a matrícula do aluno.
                  </b-form-radio>
                  <span v-if="module.availability === 'registration'">
                    <label class="d-block">Quantos dias após a matrícula?</label>
                    <b-form-group>
                      <b-form-input v-model="module.releaseDaysAfterPurchase" class="input-border" type="number"
                        placeholder="Insira a quantidade de dias"/>
                    </b-form-group>
                  </span>

                  <b-form-radio value="specificDate" v-model="module.availability">
                    Em uma data específica.
                  </b-form-radio>
                  <span v-if="module.availability === 'specificDate'">
                    <label class="d-block">Selecione a data de lançamento</label>
                    <b-form-group>
                      <b-form-datepicker v-model="module.releaseDate" hide-header class="input-border" locale="pt-BR"
                        placeholder="Digite ou selecione a data"></b-form-datepicker>
                    </b-form-group>
                  </span>
                </b-form-group>

                <label class="d-block mt-4">O método possui período de validade?</label>
                <b-form-group class="radio-style">
                  <b-form-radio value="N" v-model="module.hasExpiration">
                    <strong>Não</strong>, o acesso é por tempo indeterminado.
                  </b-form-radio>
                  <b-form-radio value="Y" v-model="module.hasExpiration">
                    <strong>Sim</strong>, os alunos só acessam por um período específico.
                  </b-form-radio>

                  <span v-if="module.hasExpiration === 'Y'">
                  <label class="d-block">Qual o prazo de validade desse módulo?</label>
                  <b-form-group>
                    <b-form-input v-model="module.expirationDays" class="input-border" type="number"
                                  placeholder="Insira a quantidade de dias"/>
                  </b-form-group>
                </span>
                </b-form-group>

                <label class="d-block mt-4">Outras opções</label>
                <b-form-group class="checkbox-style">
                  <b-form-checkbox-group v-model="permissions" :options="otherOptionsModule"></b-form-checkbox-group>
                </b-form-group>
              </div>
              <div class="pl-3">
                <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="isDisabled">Ok
                </button>
              </div>
            </div>

            <div :class="['input-step-group', {'active': position === 3}]" v-if="position <= 3">
              <div class="item-form">
                <label class="d-block">Título do aula</label>
                <b-form-group>
                  <b-form-input v-model="lesson.title" class="input-border" type="text"
                                placeholder="Insira o título da sua aula"/>
                </b-form-group>

                <label class="d-block mt-4">Deseja exibir quem são autores?</label>
                <b-form-group class="radio-style">
                  <b-form-radio  :value="false" v-model="lesson.showAuthors">
                    <strong>Não</strong>, ocultar autores.
                  </b-form-radio>
                  <b-form-radio :value="true" v-model="lesson.showAuthors">
                    <strong>Sim</strong>, exibir autores.
                  </b-form-radio>
                </b-form-group>

                <label class="d-block mt-4">Quando será disponibilizada?</label>
                <b-form-group class="radio-style">
                  <b-form-radio value="immediate" v-model="lesson.classAvailability">
                    Imediatamente, assim que o curso for publicado.
                  </b-form-radio>
                  <b-form-radio value="afterRegistration" v-model="lesson.classAvailability">
                    De acordo com a matrícula do aluno.
                  </b-form-radio>
                  <span v-if="lesson.classAvailability === 'afterRegistration'">
                  <label class="d-block">Quantos dias após a matrícula?</label>
                <b-form-group>
                  <b-form-input v-model="lesson.releaseDaysAfterPurchase" class="input-border" type="number"
                                placeholder="Insira a quantidade de dias"/>
                </b-form-group>
                </span>
                  <b-form-radio value="specificDate" v-model="lesson.classAvailability">
                    Em uma data específica.
                  </b-form-radio>
                  <span v-if="lesson.classAvailability === 'specificDate'">
                  <label class="d-block">Selecione a data de lançamento</label>
                <b-form-group>
                  <b-form-datepicker v-model="lesson.releaseDate" class="input-border" locale="pt-BR"
                                placeholder="Digite ou selecione a data"></b-form-datepicker>
                </b-form-group>
                </span>
                </b-form-group>

                <label class="d-block mt-4">A aula possui período de validade?</label>
                <b-form-group class="radio-style">
                  <b-form-radio value="N" v-model="lesson.expirationLesson" >
                    <strong>Não</strong>, o acesso é por tempo indeterminado.
                  </b-form-radio>
                  <b-form-radio  value="Y" v-model="lesson.expirationLesson"
                                @change="validate(module.hasExpiration)">
                    <strong>Sim</strong>, os alunos só acessam por um período específico.
                  </b-form-radio>

                  <span v-if="lesson.expirationLesson === 'Y'">
                  <label class="d-block">Qual o prazo de validade desse módulo?</label>
                  <b-form-group>
                  <b-form-input v-model="lesson.expirationDays" class="input-border" type="number"
                    placeholder="Insira a quantidade de dias"/>
                  </b-form-group>
                </span>
                </b-form-group>

                <label class="d-block mt-4">Outras opções</label>
                <b-form-group class="checkbox-style">
                  <b-form-checkbox-group v-model="permissionsLesson" :options="lessonsOptionsModule"></b-form-checkbox-group>
                </b-form-group>

                <label class="d-block mt-4">Selecione qual conteúdo deseja adicionar</label>
                <FormMultimedia @add-multimedia="setClassComposition"/>
              </div>
            </div>
            <div class="pl-3">
              <button class="btn d-inline btn-purple pl-4 pr-4 mt-4" @click="nextPosition" :disabled="isDisabled">Ok
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalAddCategory @refresh-categories="getCategoriesList"/>
      <ModalAuthor @refresh-authors="getAuthorList"/>
      <ModalConfirmation :msg="msgConfirmation" :onlyConfirmation="true" :redirect="routeRedirect"/>

      <footer>
        <div class="progress-cadastro">
          <div class="state-progress" :style="{width: barPercent+'%'}"/>
        </div>
        <div class="content-footer">
          <button class="d-block btn btn-rounded-grey" @click="backPage">
            <span
              class="d-inline-block arrow-back-ico mr-2"></span>{{ this.step === 3 && position > 1 ? "Voltar para Módulos" : "Voltar para Cursos" }}
          </button>

          <div>
            <b-button v-if="step <= 2 || (step === 3 && position === 1)" class="btn-rounded-purple mr-3 pl-4 pr-4" v-b-tooltip="'Salvar rascunho'" @click="sendForm()">
              Salvar rascunho
            </b-button>

            <b-button v-if="step <= 2 || (step === 3 && position === 1)" class="btn-purple pl-4 pr-4" v-b-tooltip="'Publicar curso'" @click="sendForm(true)"
                :disabled="((step === 1 && position < 5) || (step === 2 && position < 3) || isDisabled) && !(!isDisabled && id)">
              Publicar curso
            </b-button>

            <b-button v-if="step === 3 && position === 2" class="btn-purple pl-4 pr-4" v-b-tooltip="'Adicioanr módulo'" @click="addModule">
              Adicionar módulo
            </b-button>

            <b-button v-if="step === 3 && position === 3" class="btn-purple pl-4 pr-4" @click="addLesson"
                      v-b-tooltip="'Adicionar aula'">Adicionar aula</b-button>
          </div>

        </div>
      </footer>
    </div>
    <CourseSideProgressAdd
      @change-position="changeInputProgress"
      @change-step="changeStep"
      :currentStep="step"
      :currentPosition="position"
      :itemsNavigator="itemsNavigator[position-1]"
      :moduleAnswers="module"
      :lessonAnswers="lesson"
      :itensProgress="itensProgress"/>
  </div>
</template>

<script>
import Header from '../../../components/Menu/Header.vue';
import draggable from "vuedraggable";

export default {
  components: {Header, draggable},
  head() {
    return {
      title: "Adicionar Curso - Masters",
    }
  },
  data() {
    return {
      position: 1,
      msgConfirmation: null,
      routeRedirect: null,
      step: 1,
      id: null,
      headerText: [
        {title: 'Vamos cadastrar seu novo curso!', subtitle: 'Primeiro precisamos de alguns dados básicos'},
        {
          title: 'Legal! Agora algumas configurações avançadas',
          subtitle: 'Vamos configurar algumas opções para os seus alunos'
        },
        {
          title: 'Hora do conteúdo!',
          subtitle: 'Agora você já pode adicionar módulos e aulas ao seu curso!<br>Que tal começar com um módulo introdutório?'
        }],
      subtitle: 'Primeiro precisamos de alguns dados básicos',
      isDisabled: true,
      categoriesList: [],
      authorList: [],
      permissionOptions: [
        {text: 'Marcar aula como assistida', value: 'manualCheck'},
        {text: 'Acessar simultâneamente por mais de um dispositivo', value: 'hasSimultaneousAccess'},
        {text: 'Ver o progresso do curso em porcentagem e quantidade de aulas concluídas', value: 'canDisplayProgress'},
        {text: 'Emitir certificado automaticamente', value: 'issueCertificate'}
      ],
      otherOptionsModule: [
        {text: 'Esse módulo é gratuito', value: 'accessType'},
        {text: 'Esse módulo ficará oculto', value: 'showModule'},
        {text: 'Notificar os alunos sobre a alteração desse módulo', value: 'notifyStudents'}
      ],
      lessonsOptionsModule: [
        {text: 'Esse aula é gratuita', value: 'accessType'},
        {text: 'Esse aula ficará oculta', value: 'showClass'},
        {text: 'Os alunos podem fazer comentários nessa aula', value: 'allowStudentsComments'}
      ],
      permissions: [],
      permissionsLesson: [],
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
        certificateIssuePercentage: 0,
        acceptanceText: null,
        publishCourse: false
      },
      module: {
        title: null,
        availability: null,
        hasExpiration: null,
        lessons: [],
        releaseDaysAfterPurchase: null,
        releaseDate: null,
        expirationDays: null,
        classes: []
      },
      lesson: {
        moduleIndex: null,
        title: null,
        showAuthors: null,
        expirationLesson: null,
        classAvailability: null,
        showClass: null,
        releaseDate: null,
        releaseDaysAfterPurchase: null,
        expirationDays: null,
        allowStudentsComments: null,
        accessType: null,
        contents: []
      },
      moduleList: [],
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
          subItems: [],
        },
      ],
      itemsNavigator: [
        { position: 1, title: null},
        { position: 2, title: "Criar módulo", icon: "folder",
        steps: [
          {stepsTitle: "Título"},
          {stepsTitle: "Disponibilidade"},
          {stepsTitle: "Validade"},
          {stepsTitle: "Outras Opções"},
          ]
        },
        { position: 3, title: "Criar aula", icon: "folder",
        steps: [
          {stepsTitle: "Título"},
          {stepsTitle: "Autoria"},
          {stepsTitle: "Disponibilidade"},
          {stepsTitle: "Validade"},
          {stepsTitle: "Outras Opções"},
          {stepsTitle: "Conteúdo"},
          ]
        }
      ]
    }
  },
  watch: {
    'course.title': function (newValue) {
      if (newValue) {
        this.itemsNavigator[0].title = newValue;
      }
    }
  },
  methods: {
    backPage() {
      if (this.step === 3 && this.position > 1) {
        this.position = 1;
      }
      else {
        $nuxt.$router.push('/dashboard/cursos')
      }
    },
    nextPosition() {
      this.position += 1;
      this.isDisabled = !this.id;

      if (this.position === 2 && this.step === 2) {
        this.isDisabled = false;
      }

      if (this.step === 1 && this.position === 6) {
        this.step = 2;
        this.position = 1;
        this.isDisabled = false;
      }

      if (this.step === 2 && this.position === 4) {
        this.step = 3;
        this.position = 1;
        this.isDisabled = true;
      }

      this.isDisabled = false;
    },
    returnPosition() {
      if (this.step === 1 && this.position > 1) {
        this.position -= 1;
      } else if (this.step === 2 && this.position === 1) {
        this.step = 1;
        this.position = 5;
      }

      this.isDisabled = false;
    },
    validate(value) {
      if ((this.course.issueCertificate && !this.course.certificateIssuePercentage) ||
        (this.course.term && this.course.term === 'Y' && !this.course.acceptanceText) || !value || value.length === 0) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    },
    setProperty(value) {
      this.course[value.prop] = value.collection ? value.collection : value.item;

      if (this.course[value.prop] && this.course[value.prop].length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    sendForm(publish) {
      let authors = [];

      // this.course.authors.forEach(author => {
      //   authors.push(author.id);
      // });
      // this.course.authors = authors;
      //
      // let categories = [];
      // this.course.categories.forEach(category => {
      //   categories.push(category.id);
      // })
      // this.course.categories = categories;

      this.permissions.forEach(option => {
        this.course[option] = true;
      })

      this.course.certificateIssuePercentage = parseFloat(this.course.certificateIssuePercentage);

      this.course.publishCourse = publish;

      this.msgConfirmation = publish ? 'Curso publicado com sucesso!' : 'O seu rascunho está salvo!';
      this.routeRedirect = publish ? '/dashboard/cursos' : null;

      if (this.course.id) {
        this.$axios.$put('/course/' + this.course.id, this.course).then(response => {
          this.sendModules(this.course.id);
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.isLoading = false;
        })
      } else {
        this.$axios.$post('/course', this.course).then(response => {
          this.sendModules(response.data.id);
          this.$bvModal.show('confirmation');
          this.routeRedirect = '/dashboard/cursos';
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          // this.isLoading = false;
        })
      }
    },
    sendLesson(moduleId, classes) {
      classes.forEach(lesson => {
        try {
          if(lesson.id){
            this.$axios.$put(`/class?id=${lesson.id}`, lesson);
          } else {
            this.$axios.$post(`/class?moduleId=${moduleId}`, lesson);
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
    sendModules(couseId) {
      this.moduleList.forEach(module => {
        try {
          if(module.id){
            const response = this.$axios.$put(`/module/${module.id}`, module);
            this.sendLesson(response.data.id, module.classes);
          } else {
            const ObjModule = {...module};
            ObjModule.course = couseId;
            this.$axios.$post('/module', ObjModule);
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
    changeStep(step) {
      this.step = step + 1;
      this.position = 1;
    },
    changePositon(pos) {
      this.position = pos;
    },
    changeInputProgress(e) {
      if (e.indexItem + 1 !== this.step) {
        this.changeStep(e.indexItem)
      }
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
    },
    addModule(){
      const paramsModule = {
        sequence: this.moduleList.length + 1,
        title: this.module.title,
        accessType: this.permissions.includes('accessType') ? 'GRATIS' : 'PAGO',
        showModule: this.permissions.includes('showModule'),
        notifyStudents: this.permissions.includes('notifyStudents'),
        releaseDaysAfterPurchase: this.module.releaseDaysAfterPurchase,
        releaseDate: this.module.releaseDate,
        expirationDays: this.module.expirationDays,
        classes: this.module.classes
      };

      this.module.availability !== 'registration' && delete paramsModule.releaseDaysAfterPurchase;
      this.module.availability !== 'specificDate' && delete paramsModule.releaseDate;
      this.module.hasExpiration === 'N' && delete paramsModule.expirationDays;

      this.moduleList.push(paramsModule);
      this.module = {
        title: null,
        availability: null,
        hasExpiration: null,
        releaseDaysAfterPurchase: null,
        releaseDate: null,
        expirationDays: null,
        classes: []
      }
      this.permissions = [],

      this.backPage();
    },
    openFormLesson(moduleIndex){
      this.lesson.moduleIndex = moduleIndex;
      this.step = 3;
      this.position = 3;
    },
    addLesson() {
      const paramsLesson = {
        title: this.lesson.title,
        showAuthors: this.lesson.showAuthors,
        showClass: !this.permissionsLesson.includes('allowStudentsComments'),
        releaseDate: this.lesson.releaseDate,
        releaseDaysAfterPurchase: this.lesson.releaseDaysAfterPurchase,
        expirationDays: this.lesson.expirationDays,
        allowStudentsComments: this.permissionsLesson.includes('allowStudentsComments'),
        accessType: this.permissionsLesson.includes('accessType') ? 'GRATIS' : 'PAGO',
        authors: [],
        contents: []
      }

      this.lesson.classAvailability !== 'registration' && delete paramsLesson.releaseDaysAfterPurchase;
      this.lesson.classAvailability !== 'specificDate' && delete paramsLesson.releaseDate;
      this.lesson.expirationLesson === 'N' && delete paramsLesson.expirationDays;

      this.moduleList[this.lesson.moduleIndex].classes.push(paramsLesson);
      this.lesson = {
        moduleIndex: null,
        title: null,
        showAuthors: null,
        expirationLesson: null,
        classAvailability: null,
        showClass: null,
        releaseDate: null,
        releaseDaysAfterPurchase: null,
        expirationDays: null,
        allowStudentsComments: null,
        accessType: null,
        contents: []
      };
      this.permissionsLesson = [];

      this.step = 3;
      this.position = 1;
    },
    setClassComposition(params) {
      this.lesson.contents = params.collection;
    }
  },
  computed: {
    barPercent() {
      if(this.step === 1) {
        return ((100/12)*(this.position))
      } else if(this.step === 2) {
        return ((100/12)*(this.position + 5))
      } else if(this.step === 3) {
        return ((100/12)*(this.position + 8))
      }
    }
  },
  mounted() {
    this.getCategoriesList();
    this.getAuthorList();

    if ($nuxt.$route.params.id) {
      this.id = $nuxt.$route.params.id;
      this.$axios.$get('/course', {params: {id: this.id}}).then(response => {
        this.course = {...response.data};

        this.categoriesList.forEach(category => {
          this.course.categories.forEach(c => {
            if (c.id === category.id) {
              category.selected = true;
            }
          })
        })

        this.authorList.forEach(author => {
          this.course.authors.forEach(a => {
            if (a.id === author.id) {
              author.selected = true;
            }
          })
        });

        this.permissionOptions.forEach(({value}) => {
          if (this.course[value]) {
            this.permissions.push(value);
          }
        })

        this.isDisabled = false;
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

header {
  padding-left: 66px;
}

.sub-text-form {
  font: 14px "Inter Regular";
  color: #828287;
}

.form-addCurso .main-form {
  padding: 40px 0 40px 0;
  max-height: 100%;
  overflow: hidden;
}

.form-addCurso .main-form.course-module {
  padding: 27px 0 40px 0;
}

.content-addCurso-form {
  display: block;
  padding: 30px 0 0 66px;
  height: calc(100% - 121px);
}

.course-module .content-addCurso-form {
  padding-top: 24px;
}

.group-inputs-carousel {
  position: relative;
  display: inline-block;
  bottom: -16px;
  height: 100px;
  width: 100%;
}

.group-inputs-carousel.group-module {
  bottom: -50px;
}

.group-inputs-carousel .input-step-group {
  position: relative;
  display: grid;
  grid-template-columns: 572px auto;
  transition: .3s all;
  padding-left: 2px;
  z-index: -1;
}

.group-inputs-carousel .input-step-group .item-form {
  padding: 0 2px;
  display: inline-block;
  max-width: 572px;
  height: 100%;
  overflow-y: auto;
}

.course-module .group-inputs-carousel .input-step-group {
  grid-template-columns: 671px auto;
}

.course-module .group-inputs-carousel .input-step-group .item-form {
  max-width: 671px;
}

.group-inputs-carousel .input-step-group.active {
  width: 100%;
  height: calc(100vh - 381px);
  z-index: 1;
  background-color: #fff;
  top: -16px;
}

.group-inputs-carousel.group-module .input-step-group.active {
  top: -50px;
}

.group-inputs-carousel .box-info-image {
  height: max-content;
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
