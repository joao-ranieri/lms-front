<template>
  <div class="content">
    <!-- <div class="welcome-text">Boas vindas, {{user.name.split(' ')[0]}}!</div> -->
    <h3> Veja seus cursos</h3>
    <div class="filter-bar">
      <FormInput class="position-relative mb-3" placeholder="Pesquise por curso, instrutor ou categoria" :isRequired="true" nameInput="search" size="lg" />

      <div class="order-by-box mb-3">
        <label>Ordenar por:</label>
        <b-dropdown class="order-by-select h-100" :text="selectedOrderBy.text" right toggle-class="btn-menu dropdown-grey w-100">
          <b-dropdown-item v-for="(o, index) in ordinations" :key="index" @click="orderingBy(index)">{{o.text}}</b-dropdown-item>
        </b-dropdown>
      </div>

      <b-button variant="none" class="d-block btn-purple mb-3" @click="$nuxt.$router.push('/dashboard/cursos/adicionar')">
        Criar novo curso
      </b-button>

    </div>
    <div class="d-flex flex-wrap mt-5" style="gap: 12px;">
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
    </div>

  </div>
</template>

<script>
export default {
  head(){
    return {
      title: "Cursos - Masters",
    }
  },
  computed: {
    user(){
      return this.$auth.$storage.getLocalStorage('user')
    }
  },
  data(){
    return {
      ordinations: [
        {
          value: "alphabet",
          text: "Ordem alfabética",
        },
        {
          value: "category",
          text: "Por categoria",
        },
        {
          value: "recent",
          text: "Mais recentes"
        }
      ],
      selectedOrderBy: {}
    }
  },
  beforeMount() {
    this.selectedOrderBy = this.ordinations[0];
  },
  methods: {
    orderingBy(pos){
      this.selectedOrderBy = this.ordinations[pos]
    }
  }
}
</script>

<style scoped>

.filter-bar {
  display: grid;
  grid-template-columns: 385px 340px 205px;
  padding: 24px 0 0;
  justify-content: space-between;
}

.order-by-box label {
  font: 14px "Inter Bold";
  color: #8A8C92;
}

.order-by-box .order-by-select {
  font: 14px "Inter Bold";
  color: #090E11;
}

.welcome-text {
  font: 24px "Poppins Regular";
}

@media (max-width: 768px) {
  .filter-bar {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .filter-bar {
    grid-template-columns: 1fr;
  }
}
</style>
