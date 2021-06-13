<template>
  <lottie-player :src="src"  background="transparent" speed="1" style="width: 100%; height: 100%;"  loop autoplay></lottie-player>
</template>
<script>

export default {
  props: {
    src: {type: String}
  }
}
</script>
