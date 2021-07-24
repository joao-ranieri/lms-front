<template>
  <div>
    <h6 v-text="question"></h6>
    <b-form-group class="checkbox-style w-100" style="width: 500px">
      <b-form-radio-group v-model="selected" :options="options"></b-form-radio-group>
    </b-form-group>

    <div class="w-100 mt-3" v-if="!isNaN(selected)">
      {{ `A resposta está ${selected === rightAnswer ? 'certa' : 'incorreta'}!`}}
      <p>{{ selected+ " - " +rightAnswer}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rightAnswer: {type: Number},
    options: {type: Array},
    question: {type: String},
    image: {type: String, default: null}
  },
  data() {
    return {
      selected: null
    }
  }
}
</script>
