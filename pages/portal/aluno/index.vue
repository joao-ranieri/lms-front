<template>
  <div class="content student-class">
    <div class="player-class">
      <div class="player-class-media">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/gn7PHkYLDZU"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
      </div>
      <div class="player-class-controls">
        <div>
          <div class="player-class-control">
            <img width="25" :src="require('../../../assets/img/utils/ico-expand-gray.svg')" alt="">
            <span>Modo teatro</span>
          </div>
          <div class="player-class-control">
            <img width="25" :src="require('../../../assets/img/utils/ico-lamp-gray.svg')" alt="">
            <span>Modo foco</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-class">
      <h5>Fonologia - Como estudar para a prova</h5>
      <p>
        Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet
        commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue.
      </p>
      <div class="files-content-class">
        <span>Arquivos para baixar:</span>
        <div class="files">
          <div class="file-item" v-for="n in 10">
            <img width="25" :src="require('../../../assets/img/utils/ico-file-download.svg')" alt="">
            <div class="file-info">
              <span class="file-item-name">The Walt Disney Compan dc sdfçklds sdf sdf dsf dsf sdfds f</span>
              <div class="file-item-info">
                <span>pdf</span>
                <span>10mb</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: "Aluno - Masters",
    }
  },

  data() {
    return {}
  },
}
</script>

<style>
.student-class {
  margin: 0 132px;
}

/* content student-class */
.player-class {
  display: flex;
  width: 100%;
  flex: 500px;
  flex-wrap: wrap;
}

.player-class-media {
  width: 80%;
  height: 415px;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center;
  background-size: cover;
  border: 1px solid #89238A;
  box-sizing: border-box;
  border-radius: 4px;
}

.player-class-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.player-class-control {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 25px 0;
}

.player-class-controls img {
  margin: 0 10px 0 0;
}

.player-class-controls span {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #5C5C64;
  margin-top: 3px;
}

/* content-class */
.content-class {
  margin-top: 32px;
}

h5 {
  font-family: 'Poppins Regular';
  color: #89238A;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 125%;
  margin-bottom: 16px;
}

p {
  font-size: 14px;
  line-height: 20px;
  color: #373740;
}

.files-content-class {
  margin-top: 32px;
}

.files-content-class > span {
  font-family: "Inter Semibold";
  font-size: 14px;
  line-height: 20px;
  color: #373740;
  display: block;
  margin-bottom: 16px;
}

.files-content-class .files {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.files-content-class .file-item {
  display: flex;
  align-items: center;
  background: #F2F2F2;
  width: 220px;
  height: 72px;
  padding: 16px;
  border-radius: 4px;
}

.files-content-class .file-item > img {
  height: 100%;
  width: 20%;
  padding-bottom: 15px;
  margin-right: 5px;
}

.files-content-class .file-item .file-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;
  height: 100%;
}

.files-content-class .file-item .file-info .file-item-name {
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}

.files-content-class .file-item .file-item-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #5C5C64;
}
</style>
