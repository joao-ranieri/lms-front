<template>
  <div class="module-content mt-24">
    <div class="expand-module w-100">
      <span class="three-points mr-2"></span>
      <h6 class="d-inline-block mb-0">{{module.title}}</h6>
      <a class="float-right" href="#" @click="showModule = !showModule"><img src="../../assets/img/utils/ico-arrow-dropdown.svg"></a>
      <span @click="$emit('edit-module', moduleIndex)" class="cursor-pointer pencil-ico float-right mr-4"></span>
    </div>
    <div class="expanded-module" v-show="showModule">
      <div style="margin-top: 29px; gap: 16px" class="d-flex justify-content-between">
        <button class="btn btn-block w-100 btn-rounded-grey mr-3">Importar de outro módulo</button>
        <button class="btn btn-block w-100 btn-rounded-purple mt-0" @click="$emit('add-lesson', module.id)">+ Criar aula</button>
      </div>
      <div class="lessons mt-24">
        <draggable v-model="module.classes" draggable=".item">
          <div class="lesson mt-2 item" v-for="(lesson, index) in module.classes" :key="index">
            <span class="three-points mr-2"></span>
            {{ lesson.title }}
            <b-dropdown class="menu-card float-right" right toggle-class="btn-menu btn-white squad">
              <template #button-content>
                <img width="16" :src="require('@/assets/img/utils/three-points.svg')">
              </template>
              <b-dropdown-item @click=""><i class=" mr-1"></i>Visualizar aula</b-dropdown-item>
              <b-dropdown-item @click="$emit('open-class', {classID: lesson.id, moduleIndex: moduleIndex})"><i class="pencil-ico mr-1"></i>Editar aula</b-dropdown-item>
              <b-dropdown-item @click="$emit('remove-class', lesson.id)"><i class="trash-ico mr-1"></i>Deletar aula</b-dropdown-item>
            </b-dropdown>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: {
    module: {type: Object},
    moduleIndex: {type: Number}
  },
  components: {
    draggable,
  },
  data() {
    return {
      showModule: false
    }
  },
  methods: {
    editLesson(id){

    }
  }
}
</script>

<style scoped>
.module-content {
  display: block;
  padding: 29px 35px;
  background: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
}

.module-content:hover {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.mt-24 {
  margin-top: 24px;
}

.lessons .lesson {
  padding: 12px 21px;
  font-size: 14px;
  line-height: 20px;
  color: #5C5C64;
  border: 1px solid #F2F2F2;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
