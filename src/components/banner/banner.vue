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
// 添加class 以及自动添加前缀
import { addClass, prefixStyle } from '../../common/js/dom'

const transform = prefixStyle('transform')
export default {
  // 轮播属性设置 的外部接口
  data() {
    return {
      dots: [],
      // 表示当前是第几页 默认0
      currentPageIndex: 0,
      // 悬停标志位
      mouseover: false,
      clickReady: true
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
      // 问题:这里重新设置    width += 2 * sliderWidth不能再这里再次设置所以要设置一个Boolon- isResize 去判断
      this.resizeReady = false
      this._setSliderWidth(true)
      // BScroll的一个refresh API 当宽度发生变化重新refresh重新计算
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
      // 获得图的宽度
      this.childrenWidth = sliderWidth
      // 使得轮播图在改变尺寸时一直保持当前位置
      this.$refs.sliderGroup.style.left = `${-sliderWidth *
        (this.currentPageIndex + 1)}px`
      this.$refs.sliderGroup.style.transition = `left ${0}ms`
    },
    _initDots() {
      // 导航个数
      this.dots = new Array(this.children.length)
    },
    // 初始化轮播
    _initSlider() {
      this.children = this.$refs.sliderGroup.children
      let len = this.children.length
      let clnFirst = this.children[0].cloneNode(true)
      let clnLast = this.children[len - 1].cloneNode(true)
      // 把第一个复制一份到最后
      this.$refs.sliderGroup.appendChild(clnFirst)
      //把最后一个复制一份到第一
      this.$refs.sliderGroup.insertBefore(clnLast, this.children[0])
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
      if (!this.clickReady) return
      this.currentPageIndex--
      // 获得图的宽度
      if (this.currentPageIndex <= -1) {
        this.currentPageIndex = 4
      }
      let index = this.currentPageIndex
      let prevtPage = true
      this.animation(index, prevtPage)
      //  清除前面的定时器
      this.clearTime()
      this.clickReady = false
      let timer = setTimeout(() => {
        this.clickReady = true
      }, this.speed)
      // clearTimeout(timer)
    },
    // 下翻
    nextPage() {
      if (!this.clickReady) return
      // 清除前面的定时器
      this.clearTime()
      this.currentPageIndex++
      // 获得图的宽度
      let len = this.children.length - 2
      if (this.currentPageIndex === len) {
        this.currentPageIndex = 0
      }
      let index = this.currentPageIndex
      let nextPage = false
      this.animation(index, nextPage)
      this.clickReady = false
      let timer = setTimeout(() => {
        this.clickReady = true
      }, this.speed)
      // clearTimeout(timer)
    },
    // 转跳指定
    clickToPage(index) {
      this.currentPageIndex = index
      this.animation(index)
      // 每次轮播前 清除前面的定时器
      this.clearTime()
    },
    animation(index, bl) {
      // transition: left 0.4s;
      let width = this.childrenWidth
      width = width * (index + 1)
      // 并且判断上还是下
      if (index === 0 && !bl) {
        width = width * 6
        this.$refs.sliderGroup.style.left = `${-width}px`
        this.$refs.sliderGroup.style.transition = `left ${this.speed}ms`
        clearTimeout(timer)
        let timer = setTimeout(() => {
          this.$refs.sliderGroup.style.left = `${-this.childrenWidth}px`
          this.$refs.sliderGroup.style.transition = `left ${0}ms`
        }, this.speed)
        // 并且判断上还是下
      } else if (index === 4 && bl) {
        this.$refs.sliderGroup.style.left = `${0}px`
        this.$refs.sliderGroup.style.transition = `left ${this.speed}ms`
        clearTimeout(timer)
        let timer = setTimeout(() => {
          this.$refs.sliderGroup.style.left = `${-this.childrenWidth * 5}px`
          this.$refs.sliderGroup.style.transition = `left ${0}ms`
        }, this.speed)
      } else {
        this.$refs.sliderGroup.style.left = `${-width}px`
        this.$refs.sliderGroup.style.transition = `left ${this.speed}ms`
      }
    }
  },
  // 组件销毁时清除循环 清除内存
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="scss">
.slider {
  min-height: 1px;

  .mark-left,
  .mark-right {
    z-index: 100;
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
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .mark-right {
    position: absolute;
    top: 0;
    right: 0;

    img {
      position: absolute;
      top: 50%;
      right: 10%;
      // -webkit-transform: translateY(50%);
      transform: rotate(180deg) translateY(50%);
      -ms-transform: rotate(180deg) translateY(50%); /* Internet Explorer */
      -moz-transform: rotate(180deg) translateY(50%); /* Firefox */
      -webkit-transform: rotate(180deg) translateY(50%); /* Safari 和 Chrome */
      -o-transform: rotate(180deg) translateY(50%); /* Opera */
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
    left: 0;
    top: 0;
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
      width: 20px;
      height: 5px;
      border-radius: 5px;
      background: #eee;
      &.active {
        border-radius: 5px;
        // width: 20px;
        background: #2fb3fe;
      }
    }
  }
}
</style>