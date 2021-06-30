<template>
  <div>
    <b-modal id="confirmation" :title="title" centered no-close-on-esc no-close-on-backdrop hide-footer
             header-class="border-0" dialog-class="modal-author" ref="modalAuthor">
      <div class="mt-4 mb-4">
        <span v-if="onlyConfirmation" class="text-center">
          <span class="d-block green-text">
            {{msg}}

            <UtilsAnimation src="/animations/save-success.json" :cssGroup="{'transform': 'scale(1.5)'}"/>
          </span>
        </span>
        <span v-else>
          {{msg}}
        </span>
      </div>

      <div class="mt-5 mb-2 d-flex justify-content-around">
        <b-button class="btn-grey lg" :disabled="isLoading" @click="close">
          {{ isSuccess || onlyConfirmation ? 'Fechar' : 'Cancelar' }}
        </b-button>
        <b-button v-if="!onlyConfirmation" @click="execute" variant="none" :disabled="isLoading" class="btn-purple lg ml-2">
          <UtilsLoading v-if="isLoading"/>
          <span v-else>Confirmar</span>
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    idAuthor: {type: String, default: null},
    route: {type: String},
    title: {type: String},
    msg: {type: String},
    onlyConfirmation: {type: Boolean, default: false},
    redirect: {type: String},
    typeRequest: {type: String, default: 'delete'}
  },
  computed: {
    url() {
      return this.redirect;
    }
  },
  data(){
    return {
      isLoading: false,
      isSuccess: false
    }
  },
  methods: {
    execute(){
      this.$axios.$delete(this.route+this.idAuthor).then(response => {
        this.$root.$emit('refresh-authors');
        this.$bvModal.hide('confirmation')
      }).catch((e)=>{
        console.log(e)
      })
    },
    close(){
      if(this.url){
        console.log(this.url)
        $nuxt.$router.push(this.url);
      }
      this.$bvModal.hide('confirmation');
    }
  }
}
</script>
