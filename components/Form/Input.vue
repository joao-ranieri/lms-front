<template>
  <div>
    <b-form-group :label="labelText" :label-for="nameInput" :class="[size, {error}, {validated}, {isPass}]">
      <b-form-input :name="nameInput" :type="typeInput" v-model="value" :required="isRequired" @change="validate(nameInput)">
      </b-form-input>
      <span class="ico-input"><img src="" alt="ico-input"></span>
    </b-form-group>
    <span class="error-validation" v-text="message" v-if="error"></span>
  </div>
</template>

<script>
export default {
  props: {
    labelText: {type: String},
    nameInput: {type: String},
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
      error: false,
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
          this.error = true;
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
          this.error = true;
        }
        else if (patternNumber.test(value)) {
            this.message = "Essa senha não possui letras.";
            this.error = true;
        }
        else if (!patternLettersNumbers.test(value)) {
          this.message = "Essa senha não possui números.";
          this.error = true;
        }
        else {
          this.validated = true;
        }
      }
      else if(nameInput === "email") {
        let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if(!pattern.test(value)){
          this.message = "Esse e-mail não é válido. O e-mail deve conter “@” e “.com”";
          this.error = true;
        }
        else {
          this.validated = true;
        }
      }
    }
  }
}
</script>

<style scoped>
.error-validation {
  color: #FF754C;
  font: 12px "Inter Regular";
  line-height: 16px;
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

.lg input {
  padding: 18px 23px;
  height: 56px;
}

input.form-control:focus, input.form-control:active {
  box-shadow: 0px 0px 0 2px #6C5DD3;
}

.error input.form-control {
  box-shadow: 0px 0px 0 2px #FF754C;
}

.validated input.form-control {
  box-shadow: 0px 0px 0 2px #7FBA7A;
}

.ico-input {
  display: none;
}

.error .ico-input,
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

.error .ico-input img {
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
