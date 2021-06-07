<template>
  <b-card overlay :img-src="require('../../assets/img/course-test/image.png')">
      <b-dropdown class="menu-card" right toggle-class="btn-menu">
        <template #button-content>
            <img src="../../assets/img/utils/three-points.svg" alt="author">
        </template>
        <b-dropdown-item> <i class="mr-1 share-ico"></i>Compartilhar</b-dropdown-item>
        <b-dropdown-item> <i class="mr-1 trash-ico"></i>Deletar</b-dropdown-item>
        <b-dropdown-item> <i class="mr-1 star-ico"></i>Salvar como favorito</b-dropdown-item>
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

      <b-button href="#" class="d-block btn-purple lg">
        Editar Curso
      </b-button>
    </div>
  </b-card>
</template>

<script>
export default {

}
</script>

<style scoped>
.card {
  position: relative;
  width: 306px;
  height: 400px;
  border-radius: 32px;
  border: 1px solid;
  border: 4px solid #6C5DD3;
  background-blend-mode: multiply;
  overflow: hidden;
  margin-bottom: 23px;
}

.card-img-overlay {
  background: linear-gradient(180deg , rgba(58, 62, 69, 0.0001) -6%, #212527 85%);
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

.tags-group .tag {
  padding: 4px 8px;
  margin: 0 10px 5px 0px;
  background: white;
  font: 12px "Inter Regular";
  line-height: 16px;
  color: #6C5DD3;
  border-radius: 8px;
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


.share-ico {
  content: url("../../assets/img/utils/ico-share.svg");
}

.star-ico {
  content: url("../../assets/img/utils/ico-star.svg");
}

.trash-ico {
  content: url("../../assets/img/utils/ico-trash.svg");
}

</style>
