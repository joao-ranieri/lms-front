<template>
  <label class="switch">
    <input type="checkbox">
    <span class="slider"></span>
  </label>
</template>

<script>
export default {
  computed: {
    expanded() {
      return this.$store.state.expanded;
    },
  },
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 20px;
  margin: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F1F1F2;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 3px;
  bottom: 2.7px;
  background-color: #6C5DD3;
  border: 3px solid white;
  box-sizing: border-box;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);
}

input:checked + .slider {
  background-color: #6C5DD3;
}

input:focus + .slider {
  box-shadow: 0 0 1px ;
}

input:checked + .slider:before {
  -webkit-transform: translateX(58px);
  -ms-transform: translateX(58px);
  transform: translateX(58px);
}
</style>
