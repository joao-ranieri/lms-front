<template>
  <div>
    <b-form-group :label="labelText" :label-for="nameInput"
                  :class="[size, {hasError}, {validated}, {'isPass': typeInput === 'password'}]">
      <b-form-input :name="nameInput" :type="typeInput" :value="value" :required="isRequired"
                    :placeholder="placeholder" @change="validate" :readonly="readOnly">
      </b-form-input>
      <span class="ico-input" @click="inputAction" :title="hasError ? 'Limpar campo' : ''">
        <img src="" alt="ico-input">
      </span>
    </b-form-group>

    <span :class="{'error-validation': hasError}"
          v-text="message" v-if="hasError || (isNew && typeInput === 'password')"></span>
  </div>
</template>

<script>
export default {
  props: {
    labelText: {type: String},
    value: {type: String, default: null},
    nameInput: {type: String},
    placeholder: {type: String},
    typeInput: {type: String, default: "text"},
    size: {type: String},
    isRequired: {type: Boolean, default: false},
    isNew: {type: Boolean, default: false},
    readOnly: {type: Boolean, default: false}
  },
  data() {
    return {
      message: "Sua senha deve ter no mínimo 8 caracteres, composta por letras e números.",
      hasError: false,
      validated: false
    }
  },
  methods: {
    validate(value) {
      this.validated = this.hasError = false;

      // Valida o input do formulário em caso de novo cadastro
      if (this.isNew && value) {
        if (this.nameInput === "name") {
          if (value.split(" ").length < 2) {
            this.message = "Informe seu nome e sobrenome.";
            this.hasError = true;
          } else {
            this.validated = true;
          }
        }
        else if (this.nameInput === "password") {
          let patternNumber = /^\d+$/;
          let patternLetters = /^[a-zA-Z]+$/;

          if (value.length < 8) {
            this.message = "Sua senha deve ter no mínimo 8 caracteres, composta por letras e números.";
            this.hasError = true;
          }
          else if (patternNumber.test(value)) {
            this.message = "Essa senha não possui letras.";
            this.hasError = true;
          }
          else if (patternLetters.test(value)) {
            this.message = "Essa senha não possui números.";
            this.hasError = true;
          }
          else {
            this.validated = true;
          }
        }
        else if (this.typeInput === "email") {
          let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          if (!pattern.test(value)) {
            this.message = "Esse e-mail não é válido. O e-mail deve conter “@” e “.com”";
            this.hasError = true;
          } else {
            this.validated = true;
          }
        }
        else if (this.nameInput === "cpf") {
          if (value === '') {
            this.message = "Informe um CPF válido";
            this.hasError = true;
          } else {
            this.validated = true;
          }
        }
        else {
          this.validated = true;
        }
      }

      // Devolve ao componente pai o valor do input caso seja válido
      if (this.validated || !this.isNew) {
        this.$emit('value-model', {model: this.nameInput, value: value})
      }
    },
    inputAction() {
      if (this.hasError) {
        this.hasError = false;
        this.value = '';
        document.getElementsByName(this.nameInput)[0].focus();
      }
    }
  }
}
</script>

<style scoped>

.form-group {
  margin-bottom: 0;
}

.hasError input.form-control {
  box-shadow: 0px 0px 0 2px #FF754C;
}

.validated input.form-control {
  box-shadow: 0px 0px 0 2px #7FBA7A;
}

.ico-input {
  display: none;
}

.hasError .ico-input,
.validated .ico-input {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 36px;
  right: 18px;
  height: 17px;
}

.ico-input img {
  display: none;
}

.lg .ico-input {
  top: 36px;
}

.hasError .ico-input img {
  display: block;
  content: url("../../assets/img/utils/ico-x.svg");
}

.validated .ico-input img {
  display: block;
  content: url("../../assets/img/utils/check-green.svg");
}

.validated.isPass .ico-input img {
  display: block;
  content: url("../../assets/img/utils/ico-eye.svg");
}

.validated.isPass .ico-input, .hasError .ico-input {
  cursor: pointer;
}

span {
  display: inline-block;
  margin-top: 8px;
  color: #8A8C92;
  font: 12px "Inter Regular";
  line-height: 16px;
}

.error-validation {
  color: #FF754C;
}

legend {
  font-size: 12px;
  font-family: "Inter Regular";
  color: #8A8C92;
  height: 16px;
}

@media (max-width: 768px) {
  .lg input {
    padding: 18px 23px;
    height: 36px;
  }

  .lg .ico-input {
    top: 34px;
  }
}

</style>
