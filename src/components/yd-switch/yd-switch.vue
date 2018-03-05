<template>
  <div class="switch">
    <p class="title">{{title}}</p>
    <download :imgUrl="imgUrl"></download>
  </div>
</template>
<script type="text/ecmascript-6">
import Download from '../download/download'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: Array,
      default: ''
    }
  },
  components: {
    Download
  }
}
</script>
<style scoped lang="scss">
.switch {
  position: relative;
  .title {
    font-size: 30px;
    border-width: 400;
    line-height: 5;
    text-align: end;
    padding-right: 10px;
  }
}
</style>
