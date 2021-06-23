<template>
  <div class="form-addCurso">
    <div class="content">
      <header>
        <h4>Vamos cadastrar seu novo curso!</h4>
        <span>Primeiro precisamos de alguns dados básicos</span>
      </header>
    </div>

    <div class="content-addCurso">
      <div class="content-addCurso-form">
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
      </div>
      <div style="width: 300px">
        testeee
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
</template>

<script>
import Header from '../../../components/Menu/Header.vue'
export default {
  components: { Header },
  head(){
    return {
      title: "Adicionar Curso - Masters",
    }
  },
}
</script>

<style scoped>
.form-addCurso {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* content add */
.content-addCurso {
  display: flex;
  overflow: auto;
}

.content-addCurso .content-addCurso-form {
  padding: 0 66px;
  overflow: auto;
  flex: 1;
}

/* footer */
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
