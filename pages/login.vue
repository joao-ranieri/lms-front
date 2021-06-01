<template>
  <b-row align-content="center" align-v="stretch" class="login-screen">

    <b-col sm="12" md="6" align-self="end" class="logo-box">
        <span class="logo d-block" style="margin-bottom: 20px">
          <img height="63" src="../assets/img/ico/logo-text.svg" alt="masters-logo">
        </span>
      <span class="d-block" style="max-width: 500px">
          Conteúdo de qualidade criado de professor para professor
        </span>
    </b-col>

    <b-col sm="12" md="6" align="right" class="p-0">
      <b-card align="left" class="mb-2">
        <b-form>
          <h2 v-text="formOptions[formSelected].title"></h2>
          <small v-if="formSelected === 'login'">Ainda não tem cadastro? <a href="#" @click="formControl('new')">Crie sua conta
            agora</a></small>
          <div class="box-form" style="max-height: 326px">
            <b-form-group id="email" label="Nome completo" label-for="name" class="mt-4" v-if="formSelected === 'new'">
              <b-form-input name="name" type="name" placeholder="" required></b-form-input>
            </b-form-group>

            <b-form-group id="email" label="E-mail" label-for="email" class="mt-4">
              <b-form-input name="email" type="email" placeholder="" required></b-form-input>
            </b-form-group>

            <b-form-group id="password" label="Senha" label-for="password" class="mt-4">
              <b-form-input name="password" type="password" placeholder="" required></b-form-input>
              <span class="input-tip" v-if="formSelected === 'new'">Sua senha deve ter no mínimo 8 caracteres, composta por letras e números.</span>
            </b-form-group>

            <div class="text-center mt-4">
              <small v-if="formSelected === 'login'"><a href="#" @click="formControl('recover')">Esqueci minha senha</a></small>

              <b-button @click="executeForm" href="#" variant="primary" class="d-block mt-4">{{formOptions[formSelected].buttonText}}</b-button>
            </div>
          </div>
        </b-form>
      </b-card>
    </b-col>

  </b-row>
</template>

<script>
export default {
  data() {
    return {
      formOptions: {
        new: {title: "Cadatrar", buttonText: "Fazer cadastro", route: "/newUser"},
        recover: {title: "Redefinir senha", buttonText: "Redefinir minha senha", route: "/recovery"},
        login: {title: "Entrar", buttonText: "Acessar sua conta", route: "/enter"}
      },
      formSelected: 'login',
      isAdmin: false
    }
  },
  methods: {
    formControl(type) {
      this.formSelected = type;
    },
    executeForm(){
      alert('chegou aqui')
    }
  }
}
</script>

<style scoped>
.login-screen {
  display: flex;
  align-items: center;
  background-image: url("../assets/img/login/login_screen1.jpg");
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 51px 71px 51px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.logo-box {
  color: #fff;
  font-size: 24px;
}

.card {
  padding: 48px;
  box-shadow: 0px 35px 33px rgba(9, 14, 17, 0.64);
  border-radius: 40px;
  width: 464px
}

h2 {
  font-family: "Poppins SemiBold";
  font-weight: 600;
  font-size: 40px;
}

.card .card-body {
  padding: 0px;
}

.btn {
  font-size: 14px;
  color: white;
  padding: 18px 43px;
  background: #6C5DD3;
  border-radius: 16px;
}

.input-tip {
  font-size: 12px;
  font-family: "Inter Regular";
  color: #8A8C92;
  height: 16px;
}


input.form-control {
  background: #F1F1F2;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 18px 23px;
  height: 56px;
  font-family: 'Inter Bold';
  border: none;
}

input.form-control:focus, input.form-control:active {
  box-shadow: 0px 0px 0 2px #6C5DD3;
}

a {
  color: #6C5DD3;
  text-decoration-line: underline;
  line-height: 16px;
  font-family: 'Inter Regular';
}

.box-form {
  overflow-x: hidden;
  overflow-y: auto;
  height: 337px;
  padding: 0px 5px 3px;
}

@media (max-width: 768px) {

  .login-screen {
    padding: 30px 10px;
  }

  .logo-box {
    text-align: center;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .card {
    padding: 24px;
    border-radius: 20px;
    width: 310px
  }
}

</style>
