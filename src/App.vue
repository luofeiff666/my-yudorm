<template>
  <div id="app">
    <!-- 轮播图区域 -->
    <!-- 父组件来控制子组件 -->
    <banner :speed="400" class="slider-wrapper">
      <!--  -->
      <div v-for="(item, index) in imgs">
        <a href="javascript:void(0);" class="first">
          <div class="mark" v-show="!index">
            <div class="first-left">
              <yd-switch :title="title1" :imgUrl="imgUrl1"></yd-switch>
            </div>
            <div class="first-right">
              <yd-switch :title="title2" :imgUrl="imgUrl1"></yd-switch>
            </div>
          </div>
          <img :src="item.img">
        </a>
      </div>
    </banner>
    <!-- toTop导航 -->
    <div class="toTop" ref="toTop" title="回到顶部">
      <a @click="toTop">
        <img src="./assets/arrowLeft.png">
      </a>
    </div>
    <!-- 主页面区域 -->
    <my-section></my-section>
    <!-- 页脚部分 -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import Banner from './components/banner/banner'
import MySection from './components/my-section/my-section'
import MyFooter from './components/my-footer/my-footer'
import YdSwitch from './components/yd-switch/yd-switch'
const bannerNum = 5
export default {
  data() {
    return {
      title1: '寓管家APP下载',
      imgUrl1: [
        '../../assets/banner/butler.png',
        '../../assets/banner/butler1.png'
      ],
      title2: '直租APP下载',
      imgs: [
        {
          img: require('./assets/banner/img1.png')
        },
        {
          img: require('./assets/banner/img2.png')
        },
        {
          img: require('./assets/banner/img3.png')
        },
        {
          img: require('./assets/banner/img4.png')
        },
        {
          img: require('./assets/banner/img5.png')
        }
      ]
    }
  },
  mounted() {
    let vm = this
    window.onscroll = function() {
      vm.uptop()
    }
  },
  methods: {
    // 回到顶部
    toTop() {
      this.timer = setInterval(() => {
        //设置一个计时器
        var ct = document.documentElement.scrollTop || document.body.scrollTop //获取距离顶部的距离
        ct -= 30
        if (ct > 0) {
          //如果与顶部的距离大于零
          window.scrollTo(0, ct) //向上移动100px
        } else {
          //如果距离小于等于零
          window.scrollTo(0, 0) //移动到顶部
          clearInterval(this.timer) //清除计时器
        }
      }, 0.01)
    },
    // 监听滚动发生
    uptop() {
      var t = document.documentElement.scrollTop || document.body.scrollTop //获取距离页面顶部的距离
      var uptop = this.$refs.toTop //获取div元素
      if (t >= 500) {
        //当距离顶部超过500px时
        uptop.style.bottom = 30 + 'px' //使div距离底部30px，也就是向上出现
      } else {
        //如果距离顶部小于300px
        uptop.style.bottom = -50 + 'px' //使div向下隐藏
      }
    }
  },
  components: {
    Banner,
    MySection,
    MyFooter,
    YdSwitch
  }
}
</script>

<style scoped lang="scss">
#app {
  // padding: 0 10px;
  a {
    cursor: default;
  }
  .slider-wrapper {
    position: relative;
    width: 100%;
    min-width: 1180px;
    overflow: hidden;
    .first {
      position: relative;
      .mark {
        position: absolute;
        bottom: 20%;
        margin: 0 auto;
        width: 100%;
        z-index: 30;
        color: #fff;
        .first-left,
        .first-right {
          display: inline-block;
          text-align: center;
        }
        .first-left {
          padding-right: 80px;
          box-sizing: border-box;
        }
        .first-right {
          padding-left: 80px;
          box-sizing: border-box;
        }
      }
    }
  }
  .toTop {
    position: fixed;
    right: 20px;
    bottom: -50px;
    z-index: 100;
    width: 50px;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    background: #000;
    text-align: center;
    opacity: 0.3;
    transition: opacity 0.3s;
    img {
      width: 16px;
      height: auto;
      vertical-align: middle;
      transform: rotate(90deg);
      -ms-transform: rotate(90deg); /* Internet Explorer */
      -moz-transform: rotate(90deg); /* Firefox */
      -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
      -o-transform: rotate(90deg); /* Opera */
    }
  }
  .toTop:hover {
    opacity: 0.7;
  }
}
</style>