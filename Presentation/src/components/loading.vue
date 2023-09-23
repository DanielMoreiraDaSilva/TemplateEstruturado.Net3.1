<template>
  <div class="loading-bg">
    <semipolar-spinner :animation-duration="2000" :size="65" color="#12466e" />
    <!-- <half-circle-spinner
      :animation-duration="1000"
      :size="100"
      color="#0080ff"
    /> -->
  </div>
</template>
<script>
import { SemipolarSpinner  } from 'epic-spinners'
export default {
  components: {
    SemipolarSpinner,
  },
};
</script>
<style scoped>
.loading-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>