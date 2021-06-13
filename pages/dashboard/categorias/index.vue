<template>
  <div>
    <h3>Categorias</h3>
    <div>
      <div class="btn-filters">
        <b-button v-b-toggle.filtros class="d-block btn-rounded-purple md">Filtros</b-button>
        <b-button v-b-toggle.filtros class="d-block btn-rounded-purple squad ml-3" title="Adicionar">+</b-button>
      </div>
      <b-collapse id="filtros" class="mt-2 collapse-filters">
        <b-card>
          <b-row>
            <b-col cols="12" lg="6">
              <b-form-group label="Nome:">
                <b-form-input name="name" type="text" v-model="filters.name" placeholder="Filtrar por nome de aluno" @keyup="changeSearch" />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group label="Ordenação:">
                <b-form-select  v-model="direction" @change="changeSearch" :options="filters.direction" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-collapse>
    </div>

    <div class="mt-2">
      <b-table hover striped class="table-category" head-variant="dark" :items="allCategory" :fields="fields">
        <template #cell()="data" v-b-modal.modal-details>
          <div v-b-modal.modal-details @click="categoryDetails(data.item.id)">
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

    <b-modal id="modal-details" centered hide-footer :title="studentCategory.name">
    </b-modal>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: "Categorias - Masters",
    }
  },

  data() {
    return {
      fields: [
        {key: 'name', label: 'Nome'}
      ],
      allCategory: [],
      studentCategory: {},
      orderBy: 'name',
      direction: 'ASC',
      currentPage: 1,
      itemsPerPage: 10,
      total: 0,

      filters: {
        name: '',
        direction: [
          { value: 'ASC', text: 'Crescente' },
          { value: 'DESC', text: 'Decrescente ' },
        ],
      }
    }
  },

  mounted() {
    this.getAllCategory();
  },

  methods: {
    getAllCategory() {
      this.$axios.$get(`/category/all?page=${this.currentPage}&size=${this.itemsPerPage}&orderBy=${this.orderBy}&direction=${this.direction}`).then(response => {
        this.allCategory = response.data;
        this.total = response.total;
      });
    },
    categoryDetails(id) {
      this.$axios.$get(`category?id=${id}`).then(response => {
        this.studentCategory = response.data;
      });
    },
    changePage(value) {
      this.currentPage = value;
      this.getAllCategory();
    },
    changeSearch() {
      const obj = {
        page: 1,
        size: this.itemsPerPage,
        orderBy: this.orderBy,
        direction: this.direction,
      };

      if(this.filters.name !== '') obj.name = this.filters.name;

      const query = Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
      this.$axios.$get(`category/all?${query}`).then(response => {
        this.allCategory = response.data;
        this.total = response.total;
        this.page = 1;
      });
    }
  }
}
</script>

<style>
.table-category.table th,
.table-category.table td {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  font-family: 'Inter SemiBold';
}

.table-category.table th{
  background: #89238A;
  Border-color: #89238A;
}

.table-category.table td{
  padding: 0;
}

.table-category.table td > div{
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
.collapse-filters {
  font-family: 'Inter Regular';
  font-weight: bolder;
}

.btn-filters {
  display: flex;
  justify-content: flex-end;
}
</style>
