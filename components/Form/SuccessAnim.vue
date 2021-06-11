<template>
    <lottie
      :width="180"
      :height="180"
      :options="lottieOptions"
      @animCreated="handleAnimation"
    />
</template>
<script>
import lottie from 'vue-lottie/src/lottie'
import * as animationData from "@/assets/animations/save-success.json"

export default {
  components: {
    lottie
  },
  data() {
    return {
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
}
</script>
