<template>
  <div class="content">
    <!-- <h5>Boas vindas, {{user.name.split(' ')[0]}}!</h5> -->
    <h2> Veja seus cursos</h2>

    <div class="filter-bar">
      <b-form-group class="search-input">
        <b-form-input class="input-border" v-model="search" type="text"
                      placeholder="Pesquise por curso, instrutor ou categoria" />
      </b-form-group>

      <div class="group-btn-action">
        <span class="mr-2 grey-neutral">Ordenar por:</span>
        <div class="d-inline-block font-weight-normal mr-4" style="width: 204px">
          <b-form-select class="font-weight-bold input-border select-arrow" v-model="orderBy" :options="ordinations"></b-form-select>
        </div>

        <b-button variant="none" class="d-inline-block btn-purple" @click="$nuxt.$router.push('/dashboard/cursos/adicionar')">
          Criar novo curso
        </b-button>
      </div>
    </div>
    <div class="d-flex flex-wrap" style="gap: 20px;">
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
      orderBy: "recent",
      search: null
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
  margin-bottom: 40px;
}

.search-input {
  position: relative;
  width: 370px;
}

.search-input input {
  padding-right: 35px;
}

.search-input:after {
  position: absolute;
  content: url("assets/img/utils/ico-search.svg");
  top: 11px;
  right: 14.65px;
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
