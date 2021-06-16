<template>
  <div>
    <h3>Autores</h3>

    <div class="filter-bar lg">
      <b-form-input class="w-50" v-model="nameSearch" placeholder="Pesquisar por nome" @keypress="getAuthors"/>

      <b-button @click="openModalAuthor" class="d-block btn-purple" v-b-tooltip="'Adicionar autor'">
        Cadastrar autor
      </b-button>
    </div>

    <div class="d-flex flex-wrap" style="gap: 20px;">
      <AuthorCard v-for="(author, index) in authors" :key="index" :name="author.name" :resume="author.description"
                  :image="image" :idAuthor="author.id" @open-modal="openModalAuthor"/>

    </div>
    <b-pagination v-if="authors.length > 0" class="paginate-style mt-4" pills align="center" @change="getByPage" v-model="currentPage"
                  :total-rows="total" :per-page="perPage"/>

    <ModalAuthor/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Autores - Masters",
    }
  },
  data() {
    return {
      authorEdit: {
        name: 'null',
        description: 'null',
        image: 'null'
      },
      nameSearch: null,
      authors: [],
      currentPage: 1,
      total: 0,
      perPage: 10,
      image: "../../assets/img/course-test/img-author.svg",
    }
  },
  methods: {
    openModalAuthor(id) {
      if(typeof id === "string") {
        this.$axios.get('/author', {params: {id: id}}).then(response => {
          this.$root.$emit('getAuthorData', {...response.data.data});
        })
      }
      this.$bvModal.show('author');
    },
    getAuthors() {
      let params = `direction=ASC&page=${this.currentPage}&size=${this.perPage}&orderBy=name`;

      if (this.nameSearch) {
        params = params + `&name=${this.nameSearch}`;
      }

      this.$axios.$get('author/all?' + params).then(response => {
        this.total = Math.ceil(response.total / this.perPage);
        this.authors = response.data;
      })
        .catch(e => {
          console.log(e)
        })
    },
    getByPage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.getAuthors();

    this.$root.$on('refresh-authors', ()=>{
      this.getAuthors();
    })
  }
}
</script>

<style>
.filter-bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 24px 0;
}
</style>
