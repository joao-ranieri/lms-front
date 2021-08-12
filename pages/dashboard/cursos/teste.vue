<template>
  <div class="p-3">
    <FormMultimedia :multimediaList="mediaList"/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      mediaList: [],
      object: {}
    }
  }
}
</script>
