<template>
  <div class="download">
    <div class="download-l">
      <img src="../../assets/banner/butler.png" v-show="currentIndex">
      <img src="../../assets/banner/butler1.png" v-show="!currentIndex">
    </div>
    <div class="download-r">
      <div v-for="item in select" class="item" @click="selectOne(item)">
        <!-- content容器 由计算属性得到 -->
        <!-- 设计css的对应样式 -->
        <i class="icon" :class="icon(item)"></i>
        <span class="text">{{item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: Array,
      default: ''
    }
  },
  data() {
    return {
      currentIndex: false,
      select: [
        {
          //   icon: '../../assets/banner/iPhone.png',
          text: 'iPhone'
        },
        {
          //   icon: '../../assets/banner/Android.png',
          text: 'Android'
        }
      ]
    }
  },
  computed: {},
  methods: {
    icon(item) {
      return item.text === 'iPhone' ? 'icon-iphone' : 'icon-Android'
    },
    selectOne(item) {
      if (item.text === 'iPhone') {
        this.currentIndex = 0
      } else {
        this.currentIndex = 1
      }
    }
  },
  components: {}
}
</script>

<style lang='scss' scoped>
.download {
  .download-l {
    display: inline-block;
    vertical-align: middle;
    img {
      width: 174px;
      height: 174px;
      border-radius: 5px;
    }
    margin-right: 20px;
  }
  .download-r {
    display: inline-block;
    vertical-align: middle;
    .item {
      border: 1px solid #fff;
      box-sizing: border-box;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0);
      transition: background 0.3s;
      width: 242px;
      height: 62px;
      margin: 25px 0;
      box-sizing: border-box;
      padding-left: 45px;
      line-height: 62px;
      text-align: left;
      .icon {
        display: inline-block;
        margin-right: 10px;
        width: 32px;
        height: 36px;
        vertical-align: middle;
      }
      .icon::before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      .icon-iphone::before {
        background: url(../../assets/banner/iPhone.png) no-repeat 0 0;
        background-size: contain;
      }
      .icon-Android::before {
        background: url(../../assets/banner/Android.png) no-repeat 0 0;
        background-size: contain;
      }
      .text {
        vertical-align: middle;
        font-size: 25px;
      }
    }
    .item:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
