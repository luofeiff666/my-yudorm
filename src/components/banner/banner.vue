<template>
  <!-- 外部引用 ref="slider" -->
  <div class="slider" ref="slider">
    <!-- 需要滚动的放在第一个位置 -->
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <!-- dots -->
    <div class="dots">
      <!-- :class="{ 判断当前的位置是否和currentPageIndex相同 相同就添加active -->
      <span @click="clickToPage(index)" class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex === index}"></span>
    </div>
    <!-- 侧边导航按钮 -->
    <div class="mark-left" @touchstart="prevtPage" @click="prevtPage">
      <img src="../../assets/arrowLeft.png">
    </div>
    <div class="mark-right" @touchstart="nextPage" @click="nextPage">
      <img src="../../assets/arrowLeft.png">
    </div>
    <div class="logo">
      <img src="../../assets/banner/logo.png">
      <p>寓道科技</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { addClass } from '../../common/js/dom'

export default {
  // 轮播属性设置 的外部接口
  data() {
    return {
      dots: [],
      // 表示当前是第几页 默认0
      currentPageIndex: 0,
      // 悬停标志位
      mouseover: false
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 自定轮播间隔
    interval: {
      type: Number,
      default: 3000
    },
    // 转跳速度 最小1不能是0
    speed: {
      type: Number,
      default: 1
    }
  },
  // beeter-scroll初始化 渲染时机
  mounted() {
    setTimeout(() => {
      // 自动获取屏幕宽度尺寸
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      // 判断是否自动轮播
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    // 当resize事件触发时 重新获取设置宽度
    window.addEventListener('resize', () => {
      // 如果slider还没有初始化的时候 那么 return
      if (!this.slider) {
        return
      }
      // 问题:这里重新设置    width += 2 * sliderWidth不能再这里再次设置所以要设置一个Boolon- isResize 去判断
      this._setSliderWidth(true)
      // BScroll的一个refresh API 当宽度发生变化重新refresh重新计算
      this.slider.refresh()
    })
    // 悬停停止自动轮播
    this.$refs.slider.addEventListener('mouseover', () => {
      clearTimeout(this.timer)
      this.mouseover = true
    })
    this.$refs.slider.addEventListener('mouseout', () => {
      this.mouseover = false
      if (this.autoPlay) {
        this._play()
      }
    })
  },
  methods: {
    // 设置轮播外容器宽度
    _setSliderWidth(isResize) {
      // sliderGroup 参与轮播元素个数
      this.children = this.$refs.sliderGroup.children
      let width = 0
      // 获得当前屏幕的宽度
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // 给每个轮播元素设置class
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      // 边界处理 边界是添加两倍的宽 保证循环
      // 一开始的时候是需要多算2倍的sliderWidth
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      // 导航个数
      this.dots = new Array(this.children.length)
    },
    // 初始化轮播
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        // 允许X轴滚动
        scrollX: true,
        // 不允许Y轴动
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        // 滑动动画速度
        snapSpeed: 400
        // 这个在移动端会阻止转跳默认事件click 不设置
        // click: true
      })
      // 滑动图片时提供
      // 内置的scrollEnd 滚动完毕触发
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        // 做一个判断
        if (this.loop) {
          // 默认配置的时候是+1 这里当滚动的时候 要-1
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        // 每次轮播前 清除前面的定时器
        this.clearTime()
      })
    },
    _play() {
      this.timer = setTimeout(() => {
        // goToPage是BScroll提供的(位置,Y轴动画时间,X轴动画时间)
        this.nextPage()
      }, this.interval)
    },
    // 清除定时器
    clearTime() {
      if (this.autoPlay) {
        clearTimeout(this.timer)
        if (!this.mouseover) {
          this._play()
        }
      }
    },
    // 上翻
    prevtPage() {
      let pageIndex = this.slider.getCurrentPage().pageX
      // 做一个判断
      if (this.loop) {
        // 默认配置的时候是+1 这里当滚动的时候 要-1
        pageIndex -= 1
      }
      if (pageIndex <= 0) {
        this.currentPageIndex = this.children.length - 3
      } else {
        this.currentPageIndex = pageIndex - 1
      }
      this.slider.goToPage(pageIndex, 0, this.speed)
      //  清除前面的定时器
      this.clearTime()
    },
    // 下翻
    nextPage() {
      // 清除前面的定时器
      this.clearTime()
      let pageIndex = this.slider.getCurrentPage().pageX
      // 做一个判断
      if (this.loop) {
        // 默认配置的时候是+1 这里当滚动的时候 要-1
        pageIndex += 1
      }
      if (pageIndex === this.children.length - 1) {
        this.currentPageIndex = 0
      } else {
        this.currentPageIndex = pageIndex - 1
      }
      this.slider.goToPage(pageIndex, 0, this.speed)
    },
    // 转跳指定
    clickToPage(index) {
      let pageIndex = index + 1
      this.currentPageIndex = index
      this.slider.goToPage(pageIndex, 0, this.speed)
      // 每次轮播前 清除前面的定时器
      this.clearTime()
    }
  },
  // 组件销毁时清除循环 清除内存
  destroyed() {
    clearTimeout(this.timer)
  },
  components: {}
}
</script>

<style scoped lang="scss">
.slider {
  min-height: 1px;

  .mark-left,
  .mark-right {
    display: flex;
    align-items: center;
    height: 100%;
    width: 10%;
    opacity: 0.5;
    transition: opacity 1s;
    img {
      display: block;
      width: 25%;
    }
  }
  .mark-left {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
      position: absolute;
      left: 10%;
    }
  }
  .mark-right {
    position: absolute;
    top: 0;
    right: 0;

    img {
      display: block;
      transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* Internet Explorer */
      -moz-transform: rotate(180deg); /* Firefox */
      -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
      -o-transform: rotate(180deg); /* Opera */
      position: absolute;
      right: 10%;
    }
  }
  // 左右导航按钮 hover
  .mark-left:hover {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.4) 0,
      rgba(0, 0, 0, 0) 100%
    );
    opacity: 1;
    cursor: pointer;
  }
  .mark-right:hover {
    // 渐变(角度, 开始颜色 开始位置,下一个颜色 下一个颜色的开始位置)
    opacity: 1;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.4) 100%
    );
    cursor: pointer;
  }
  .logo {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    color: #fff;
    font-size: 25px;
    padding-top: 20px;
    width: 400px;
    img {
      display: block;
      margin: 0 auto;
    }
    p {
      margin-top: 10px;
      text-align: center;
    }
  }
  .slider-group {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
  .dots {
    position: absolute;
    bottom: 5%;
    right: 0;
    left: 0;
    margin-bottom: 5px;
    text-align: center;
    font-size: 0;
    z-index: 50;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
      &.active {
        border-radius: 5px;
        // width: 20px;
        background: #2fb3fe;
      }
    }
  }
}
</style>