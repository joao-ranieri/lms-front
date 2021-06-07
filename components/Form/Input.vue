<template>
  <div>
    <b-form-group :label="labelText" :label-for="nameInput" :class="[size, {hasError}, {validated}, {isPass}]">
      <b-form-input :name="nameInput" :type="typeInput" v-model="value" :required="isRequired" :placeholder="placeholder" @change="validate(nameInput)">
      </b-form-input>
      <span class="ico-input" @click="inputAction(hasError)" :title="hasError ? 'Limpar campo' : ''">
        <img src="" alt="ico-input">
      </span>
    </b-form-group>
    <span class="error-validation" v-text="message" v-if="hasError"></span>
  </div>
</template>

<script>
export default {
  props: {
    labelText: {type: String},
    nameInput: {type: String},
    placeholder: {type: String},
    typeInput: {type: String, default: "text"},
    isRequired: {type: Boolean, default: false},
    validateForm: {type: Boolean, default: false},
    isPass: {type: Boolean, default: false},
    size: {type: String}
  },
  data() {
    return {
      value: null,
      message:'',
      hasError: false,
      validated: false
    }
  },
  methods: {
    validate(nameInput) {
      let value = this.value;
      this.validated = this.error = false;

      if(value === null || value === undefined || value==='') {
        return false;
      }

      if(nameInput === "name") {
        if (value.split(" ").length < 2) {
          this.message = "Informe seu nome e sobrenome.";
          this.hasError = true;
        }
        else {
          this.validated = true;
        }
      }
      else if(nameInput === "password") {
        let patternNumber = /^[0-9]+$/;
        let patternLettersNumbers = /(?=.*[0-9])(?=[a-zA-Z])/;

        if(value.length < 8){
          this.message = "Sua senha deve ter no mínimo 8 caracteres, composta por letras e números.";
          this.hasError = true;
        }
        else if (patternNumber.test(value)) {
            this.message = "Essa senha não possui letras.";
            this.hasError = true;
        }
        else if (!patternLettersNumbers.test(value)) {
          this.message = "Essa senha não possui números.";
          this.hasError = true;
        }
        else {
          this.validated = true;
        }
      }
      else if(nameInput === "email") {
        let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if(!pattern.test(value)){
          this.message = "Esse e-mail não é válido. O e-mail deve conter “@” e “.com”";
          this.hasError = true;
        }
        else {
          this.validated = true;
        }
      }
    },
    inputAction(hasError) {
      if(hasError) {
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

input.form-control {
  background: #F1F1F2;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  font-family: 'Inter Bold';
  border: none;
}

::-webkit-input-placeholder {
  color: #8A8C92;
}

:-moz-placeholder { /* Firefox 18- */
  color: #8A8C92;
}

::-moz-placeholder {  /* Firefox 19+ */
  color: #8A8C92;
}

:-ms-input-placeholder {
  color: #8A8C92;
}


.lg input {
  padding: 18px 23px;
  height: 56px;
}

input.form-control:focus, input.form-control:active {
  box-shadow: 0px 0px 0 2px #6C5DD3;
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
  top: 44px;
  right: 18px;
  height: 17px;
}

.ico-input img {
  display: none;
}

.lg .ico-input {
  top: 44px;
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

.error-validation {
  color: #FF754C;
  font: 12px "Inter Regular";
  line-height: 16px;
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
