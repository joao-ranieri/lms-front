<template>
  <div>
    <div class="title-page">Alunos</div>
    {{allStudents}}
  </div>
</template>

<script>
const dataTeste = [
   {
      "id":"6d1e5c4a-5a6a-4666-a981-2686a4311ee3",
      "name":"teste",
      "email":"teste@teste.com",
      "profile":"ALUNO",
      "image":"",
      "createdAt":"2021-06-10T14:07:05.318Z",
      "updatedAt":"2021-06-10T14:07:05.318Z",
      "coins":0,
      "diamonds":0,
      "experiencePoints":0,
      "frameImage":null
   },
   {
      "id":"6d1e5c4a-5a6a-4666-a981-2686a4311ee3",
      "name":"teste",
      "email":"teste@teste.com",
      "profile":"ALUNO",
      "image":"",
      "createdAt":"2021-06-10T14:07:05.318Z",
      "updatedAt":"2021-06-10T14:07:05.318Z",
      "coins":0,
      "diamonds":0,
      "experiencePoints":0,
      "frameImage":null
   }
]

export default {
  head(){
    return {
      title: "Alunos - Masters",
    }
  },

  data() {
    return {
      allStudents: dataTeste,
      orderBy: 'name',
      direction: 'ASC',
      currentPage: 1,
      itemsPerPage: 10,
      total: null
    }
  },

  mounted() {
    // this.$axios.$get(`/student/findAll?page=${this.currentPage}&size=${this.itemsPerPage}&orderBy=${this.orderBy}&direction=${this.direction}`, {
    //   headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlNDI4MzdhLTgxNGUtNDJjYy1hNzFjLTQ1ZmExZGNlNTk2MSIsInVzZXJuYW1lIjoiYWRtaW5AZW1haWwuY29tIiwibmFtZSI6IkFkbWluaXN0cmFkb3IiLCJwcm9maWxlIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTYyMzMzNzg0NCwiZXhwIjoxNjIzMzQxNDQ0fQ.XxHgHq82u58OaRE7Y3ZHUO2vJYfCQSdBylijTLA_1kM' }
    // }).then(response => {
    //   this.allStudents = response.data;
    //   this.total = response.total;
    // });
  }
}
</script>

<style scoped>
.title-page {
  font: 48px "Poppins SemiBold";
}
</style>
