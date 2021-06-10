<template>
  <div>
    <div class="welcome-text">Boas vindas, {{user.name.split(' ')[0]}}!</div>
    <div class="title-page"> Veja seus cursos</div>
    <div class="filter-bar">
      <FormInput class="position-relative w-50" placeholder="Pesquise por curso, instrutor ou categoria" :isRequired="true" nameInput="search" size="lg" />

      <div class="order-by-box">
        <label>Ordenar por:</label>
        <b-dropdown class="order-by-select h-100" :text="selectedOrderBy.text" right  toggle-class="btn-menu btn-white">
          <b-dropdown-item v-for="(o, index) in ordinations" :key="index" @click="orderingBy(index)">{{o.text}}</b-dropdown-item>
        </b-dropdown>
      </div>

      <b-button href="#" class="d-block btn-purple lg">
      Editar Curso
      </b-button>

    </div>
    <div class="d-flex flex-wrap justify-content-between">
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
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
      return this.$store.state.user
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
  display: flex;
  justify-content: space-between;
  padding: 24px 0 32px;
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
</style>
