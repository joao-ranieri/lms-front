<template>
  <div class="form-addCurso">
    <div class="main-form">
      <header style="padding-left: 2px;">
        <h4>Vamos cadastrar seu novo curso!</h4>
        <span class="sub-text-form">Primeiro precisamos de alguns dados básicos</span>
      </header>

      <div class="content-addCurso-form overflow-hidden">
        <div class="h-100 position-relative">
          <div class="group-inputs-carousel">
            <div :class="['input-step-group', {'active': position === 1}]" v-if="position <= 1">
              <label class="d-block">Como seu curso será chamado?</label>
              <b-form-group class="search-input">
                <b-form-input class="input-border" type="text"
                              placeholder="Tran Mau Tri Tam"/>
              </b-form-group>
            </div>

            <div :class="['input-step-group', {'active': position === 2}]" v-if="position <= 2">
              <label class="d-block">Em qual categoria ele se encaixa?</label>
              <b-form-group class="search-input">
                <b-form-input class="input-border" type="text" placeholder="Selecione uma categoria"/>
              </b-form-group>
            </div>

            <div :class="['input-step-group', {'active': position === 3}]" v-if="position <= 3">
              <label class="d-block">Quem criou esse curso?</label>
              <b-form-group class="search-input">
                <b-form-input class="input-border" type="text" placeholder="Selecione os autores"/>
              </b-form-group>
            </div>

            <div :class="['input-step-group', {'active': position === 4}]" v-if="position <= 4">
              <label class="d-block">Qual o tipo de acesso desse curso?</label>
              <b-form-group>
                <b-form-radio name="some-radios" value="P"><strong>Pago -</strong> é necessário o pagamento para liberar
                  acesso
                </b-form-radio>
                <b-form-radio name="some-radios" value="F"><strong>Gratuito -</strong> é necessário apenas o cadastro para
                  liberar acesso
                </b-form-radio>
              </b-form-group>
            </div>

            <div style="width: 572px" :class="['input-step-group', 'd-flex', {'active': position === 5}]" v-if="position <= 5">
              <UtilsDropImage/>
              <div class="box-info-image ml-3">
                <h6 class="grey-neutral-6">Escolha a imagem de capa do seu curso</h6>
                <span class="d-block grey-neutral">
                Essa será imagem aparecerá como capa no catálogo de cursos. <br><br><br>
                Use uma imagem de alta qualidade, em formato vertical e com <strong>dimensão mínima de 300x400 pixels</strong> para garantir uma boa visualização.
              </span>
              </div>
            </div>
          </div>
        </div>

        <div class="pl-3">
          <button class="btn btn-purple pl-4 pr-4 mt-4" @click="nextPosition">Ok</button>
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
          <b-button class="d-block btn-rounded-purple" v-b-tooltip="'Salvar rascunho'">
            Salvar rascunho
          </b-button>
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
      if(this.position === 6) {
        this.position = 1;
      }
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
  display: grid;
  grid-template-columns: 1fr 152px;
  padding-top: 30px;
  height: calc(100% - 121px);
}

.group-inputs-carousel {
  position: absolute;
  bottom: -138px;
  height: 200px;
}

.group-inputs-carousel .input-step-group {
  position: relative;
  z-index: -1;
}

.group-inputs-carousel .input-step-group.active {
  position: absolute;
  padding-left: 2px;
  width: 100%;
  top: calc(-100vh + 391px);
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
