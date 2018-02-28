<template>
  <div id="app">
    <div class="banner">
      <!-- 父组件来控制子组件 -->
      <banner :speed="500" class="slider-wrapper">
        <div>
          <a href="#" class="first">
            <img src="./assets/banner/img1.png">
            <div class="first-slider">
              <div class="first-left">112121212</div>
              <div class="first-right">112121212</div>
            </div>
          </a>
        </div>
        <div>
          <a href="#">
            <img src="./assets/banner/img2.png">
          </a>
        </div>
        <div>
          <a href="#">
            <img src="./assets/banner/img3.png">
          </a>
        </div>
        <div>
          <a href="#">
            <img src="./assets/banner/img4.png">
          </a>
        </div>
        <div>
          <a href="#">
            <img src="./assets/banner/img5.png">
          </a>
        </div>
      </banner>
    </div>
  </div>
</template>

<script>
import Banner from './components/banner/banner'
const bannerNum = 5
export default {
  data() {
    return {}
  },
  created() {},
  computed: {},
  components: {
    Banner
  }
}
</script>

<style scoped lang="scss">
.slider-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  .first {
    position: relative;
    .first-slider {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: red;
    }
  }
}
</style>
