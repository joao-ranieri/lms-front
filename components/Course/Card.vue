<template>
  <b-card overlay :img-src="require('../../assets/img/course-test/image.png')">
    <span class="course-status">Publicado</span>

    <b-dropdown class="menu-card" right toggle-class="btn-menu btn-white squad">
      <template #button-content>
        <img src="../../assets/img/utils/three-points.svg" alt="author">
      </template>
      <b-dropdown-item @click="share"><i class="share-ico mr-1"></i>Compartilhar</b-dropdown-item>
      <b-dropdown-item @click="remove"><i class="trash-ico mr-1"></i>Deletar</b-dropdown-item>
      <b-dropdown-item @click="favorite"><i class="star-ico mr-1"></i>Salvar como favorito</b-dropdown-item>
    </b-dropdown>

    <div class="card-content">
      <div class="tags-group">
        <span class="tag">Idiomas</span>
        <span class="tag">Preparatório</span>
      </div>

      <div class="title">
        Como preparar alunos para exames internacionais
      </div>

      <div class="author">
        <img src="../../assets/img/course-test/img-author.svg" alt="author"> Yvelize Wielewicki
      </div>

      <b-button @click="edit" href="#" class="d-block btn-purple lg">
        Editar Curso
      </b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    idCourse: {type: Number},
    courseTitle: {type: String},
    tags: {type: Array},
    isPublished: {type: Boolean},
    author: {type: Object}
  },
  methods: {
    share(){

    },
    remove(){

    },
    favorite(){

    },
    edit(){

    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  width: 306px;
  height: 400px;
  border-radius: 32px;
  border: 4px solid transparent;
  background-blend-mode: multiply;
  overflow: hidden;
  margin-bottom: 23px;
}

.card:hover {
  border-color: #89238A;
}

.card-img-overlay {
  background: linear-gradient(180deg, rgba(58, 62, 69, 0.0001) -6%, #212527 85%);
  height: 101%;
  padding: 16px;
}

.menu-card {
  float: right;
}

.btn-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.dropdown-toggle::after {
  display: none;
}

.card-content {
  display: block;
  position: absolute;
  bottom: 16px;
  color: white;
  padding-right: 16px;
}

.tags-group {
  display: flex;
  flex-wrap: wrap;
}

.course-status,
.tags-group .tag {
  padding: 4px 8px;
  margin: 0 10px 5px 0px;
  background: white;
  font: 12px "Inter Regular";
  line-height: 16px;
  color: #89238A;
  border-radius: 100px;
}

.course-status {
  color: #7FBA7A;
}

.card .title {
  padding: 0px;
  font: 24px "Poppins Regular";
}

.card .author {
  padding: 12px 8px 16px;
  width: 100%;
  font: 13px "Inter Regular";
}

.card .author img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

</style>
