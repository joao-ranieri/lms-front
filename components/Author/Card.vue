<template>
  <b-card overlay>
    <div class="card-content">
      <b-dropdown class="menu-card" right toggle-class="btn-menu btn-white squad">
        <template #button-content>
          <img src="../../assets/img/utils/three-points.svg" alt="author">
        </template>
        <b-dropdown-item @click="edit"><i class="share-ico mr-1"></i>Editar</b-dropdown-item>
        <b-dropdown-item @click="remove"><i class="trash-ico mr-1"></i>Remover</b-dropdown-item>
      </b-dropdown>
      <div class="author-image">
        <img class="w-100 mr-auto ml-auto" width="130" height="130" src="../../assets/img/course-test/img-author.svg" alt="author">
      </div>

      <div class="author-info">
        <h6 class="mt-3 mb-3 text-center" v-text="name"></h6>
        <span class="resume mb-3" v-text="resume"></span>
      </div>
    </div>
    <ModalAuthor :author="author"/>
    <ModalConfirmation :idAuthor="idAuthor" route="/author/" title="Exclusão de autor" :msg="'Deseja remover o autor '+ name+'?'" />
  </b-card>
</template>

<script>
export default {
  props: {
    idAuthor:{type: String, default: null},
    name: {type: String},
    resume: {type: String},
    image: {type: String}
  },
  data(){
    return {
      author: {
      }
    }
  },
  methods:{
    edit() {
      this.$axios.get('/author', {params: {id: this.idAuthor}}).then(response => {
        console.log(response)
        this.author = {...response.data}
      }).finally(()=>{
        this.$bvModal.show('author');
      })
    },
    remove(){
      this.$bvModal.show('confirmation');
    }
  }
}
</script>

<style>
.card {
  position: relative;
  width: 280px;
  height: 380px;
  border-radius: 32px;
  border: 2px solid #89238A;
  background-blend-mode: multiply;
  overflow: hidden;
  margin-bottom: 23px;
}

.menu-card {
  float: right;
}

.author-info .resume {
  display: block;
  width: 100%;
  height: 140px;
  overflow-y: auto;
}


</style>
