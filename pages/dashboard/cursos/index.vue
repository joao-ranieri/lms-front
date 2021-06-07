<template>
  <div>
    <div class="welcome-text">Boas vindas, João!</div>
    <div class="title-page"> Veja seus cursos</div>
    <div class="filter-bar">
      <FormInput class="position-relative" placeholder="Pesquise por curso, instrutor ou categoria" :isRequired="true" nameInput="search" size="lg" />
    </div>
    <div class="d-flex flex-wrap justify-content-between">
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
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
}
</script>

<style scoped>

.filter-bar {
  padding: 24px 0 32px;
}

.welcome-text {
  font: 24px "Poppins Regular";
}

.title-page {
  font: 48px "Poppins SemiBold";
}

</style>
