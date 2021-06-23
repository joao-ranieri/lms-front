<template>
  <div class="content">
    <!-- <h5>Boas vindas, {{user.name.split(' ')[0]}}!</h5> -->
    <h2> Veja seus cursos</h2>
    <div class="filter-bar mb-3">
      <FormInput class="position-relative w-50" placeholder="Pesquise por curso, instrutor ou categoria"
                 :isRequired="true" nameInput="search" size="lg"/>

      <div class="group-btn-action">
        <div class="d-inline-block mr-3">
          <label>Ordenar por:</label>
          <b-dropdown class="order-by-select" :text="selectedOrderBy.text" right toggle-class="btn-menu dropdown-grey w-100">
            <b-dropdown-item v-for="(o, index) in ordinations" :key="index" @click="orderingBy(index)">{{o.text}}</b-dropdown-item>
          </b-dropdown>
        </div>

        <b-button
          variant="none"
          class="d-inline-block btn-purple"
          @click="$nuxt.$router.push('/dashboard/cursos/adicionar')">
          Criar novo curso
        </b-button>
      </div>
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
  display: inline-flex;
  width: 100%;
  padding: 24px 0 0;
  justify-content: space-between;
}

.group-btn-action label {
  font: 14px "Inter Regular";
  color: #A7A7AB;
}

.group-btn-action .order-by-select {
  font: 14px "Inter Regular";
  font-weight: 500;
  color: #373740;
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
