<template>
  <div>
    <div class="title-page">Alunos</div>
    <div class="mt-3">
      <b-row>
        <b-col cols="12" md="3">
          <b-form-group>
            <b-form-input name="name" type="text" v-model="filters.name" placeholder="Filtrar por nome de aluno" @keyup="changeSearch" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group>
            <b-form-input name="name" type="text" v-model="filters.email" placeholder="Filtrar por e-mail de aluno" @keyup="changeSearch" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3"> * </b-col>
        <b-col cols="12" md="3"> * </b-col>
      </b-row>
    </div>

    <div class="mt-2">
      <b-table hover striped class="table-students" head-variant="dark" :items="allStudents" :fields="fields">
        <template #cell()="data" v-b-modal.modal-details>
          <div v-b-modal.modal-details @click="studentDetails(data.item.id)">
              {{ data.value }}
          </div>
        </template>
      </b-table>

      <b-pagination
        @change="changePage"
        v-model="currentPage"
        :total-rows="total"
        :per-page="itemsPerPage"
        aria-controls="my-table"
        class="pagination-students"
        first-number
        last-number
        align="right"/>
    </div>

    <b-modal id="modal-details" centered hide-footer :title="studentSelected.name">
      <p><strong>E-mail:</strong> {{studentSelected.email}}</p>
      <p><strong>Pontos de experiência:</strong> {{studentSelected.experiencePoints}}</p>
      <p><strong>Moedas:</strong> {{studentSelected.coins}}</p>
      <p><strong>Diamantes:</strong> {{studentSelected.diamonds}}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: "Alunos - Masters",
    }
  },

  data() {
    return {
      fields: [
        {key: 'name', label: 'Nome'},
        {key: 'email', label: 'E-mail'},
      ],
      allStudents: [],
      studentSelected: {},
      orderBy: 'name',
      direction: 'ASC',
      currentPage: 1,
      itemsPerPage: 10,
      total: 0,

      filters: {
        name: '',
        email: ''
      }
    }
  },

  mounted() {
    this.getAllStudent();
  },

  methods: {
    getAllStudent() {
      this.$axios.$get(`student/all?page=${this.currentPage}&size=${this.itemsPerPage}&orderBy=${this.orderBy}&direction=${this.direction}`).then(response => {
        this.allStudents = response.data;
        this.total = response.total;
      });
    },
    studentDetails(id) {
      this.$axios.$get(`student?id=${id}`).then(response => {
        this.studentSelected = response.data;
      });
    },
    changePage(value) {
      this.currentPage = value;
      this.getAllStudent();
    },
    changeSearch() {
      const obj = {
        page: 1,
        size: this.itemsPerPage,
        orderBy: this.orderBy,
        direction: this.direction,
      };

      if(this.filters.name !== '') obj.name = this.filters.name;
      if(this.filters.email !== '') obj.email = this.filters.email;

      //caso tenha email, valida antes de fazer a requisição
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValid = obj.email ? re.test(String(obj.email).toLowerCase()) : false
      const doRequest = ((obj.email && isValid) || !obj.email) ? true : false;

      if(doRequest){
        const query = Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
        this.$axios.$get(`student/all?${query}`).then(response => {
          this.allStudents = response.data;
          this.total = response.total;
          this.total = 1;
        });
      }
    }
  }
}
</script>

<style>
.table-students.table th,
.table-students.table td {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  font-family: 'Inter SemiBold';
}

.table-students.table th{

  background: #89238A;
  Border-color: #89238A;
}

.table-students.table td{
  padding: 0;
}

.table-students.table td > div{
  padding: 0.75rem;
}

.pagination-students .page-item .page-link {
  color: #222;
}

.pagination-students .page-item.active .page-link {
  background-color: #89238A;
  border-color: #89238A;
  color: #fff;
}
</style>
