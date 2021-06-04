<template>
  <div class="login-content">

    <div class="login-content-box logo-box">
        <span class="logo d-block" style="margin-bottom: 20px">
          <img height="63" src="../assets/img/utils/logo-text-white.svg" alt="masters-logo">
        </span>
      <span class="d-block" style="max-width: 500px">
          Conteúdo de qualidade criado de professor para professor.
        </span>
    </div>

    <div class="login-content-box align-self-center">
      <b-card align="left" class="mb-2">
        <b-form>
          <h2 v-text="formOptions[formSelected].title"></h2>
          <small v-if="formSelected === 'login'">Ainda não tem cadastro? <a href="#" @click="formControl('new')">
            Crie sua conta agora</a>
          </small>

          <div class="box-form">

            <FormInput class="mt-4 position-relative" :isRequired="true" labelText="Nome completo" nameInput="name" size="lg"
                       v-if="formSelected === 'new'"/>
            <FormInput class="mt-4 position-relative" typeInput="email" :isRequired="true" labelText="E-mail" nameInput="email"
                       size="lg"/>
            <FormInput class="mt-4 position-relative" typeInput="password" :isRequired="true" labelText="Senha" nameInput="password"
                       size="lg"/>

<!--            <lottie-animation :path='require("/assets/animations/save-success.json")' />-->

            <div class="text-center mt-4">
              <small v-if="formSelected === 'login'"><a href="#" @click="formControl('recover')">Esqueci minha senha</a></small>

              <b-button @click="executeForm" href="#" variant="primary" class="d-block mt-4">
                {{ formOptions[formSelected].buttonText }}
              </b-button>
            </div>
          </div>
        </b-form>
      </b-card>
    </div>

  </div>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

export default {
  components: {
    'lottie-animation': LottieAnimation
  },
  layout: 'login',
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
    executeForm() {
      alert('chegou aqui')
    }
  }
}
</script>

<style scoped>
.login-content {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  background: white url("../assets/img/login/login_screen1.jpg") no-repeat;
  background-size: cover;
  height: 100vh;
  overflow-y: auto;
}

.login-content-box {
  display: flex;
  padding: 51px 51px 72px;
  flex-direction: column;
  height: 660px;
}

.logo-box {
  padding-left: 79px;
  color: #fff;
  font-size: 24px;
  width: 100%;
  justify-content: flex-end;
  align-self: center;
}

h2 {
  font-family: "Poppins SemiBold";
  font-weight: 600;
  font-size: 40px;
}

.card {
  padding: 48px;
  box-shadow: 0px 35px 33px rgba(9, 14, 17, 0.64);
  border-radius: 40px;
  width: 464px;
  height: 515px;
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

@media (max-width: 920px) {
  .login-content {
    flex-direction: column;
    justify-content: start;
  }

  .login-content-box {
    padding: 25px 20px;
    align-items: center;
    height: auto;
  }

  .logo-box {
    text-align: center;
  }
}

@media (max-width: 640px) {
  .logo-box {
    font-size: 18px;
  }

  h2 {
    font-size: 30px;
  }

  .card {
    padding: 20px;
    border-radius: 20px;
    width: 310px;
    height: 420px;
  }

  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
