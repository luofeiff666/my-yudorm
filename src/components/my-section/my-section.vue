<template>
  <section class="section">
    <div class="content odd">
      <div class="content-wrapper content1">
        <div class="content1-title">
          <h1>01</h1>
          <p class="title">房源管控</p>
          <div class="text">
            <p>房屋动态，实时掌握
            </p>
            <p>房源管理，高效贴心</p>
          </div>
        </div>
        <div class="content1-img">
          <img src="../../assets/01.png" alt="">
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-wrapper content2">
        <div class="content1-img">
          <img src="../../assets/02.png" alt="">
        </div>
        <div class="content2-title">
          <h1>02</h1>
          <p class="title">收付提醒</p>
          <div class="text">
            <p>应收应付，事先提醒</p>
            <p>漏收漏付，不再忧心</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content odd">
      <div class="content-wrapper content1">
        <div class="content1-title content3-title">
          <h1>03</h1>
          <p class="title">销售漏斗</p>
          <div class="text">
            <p>销售线索，全部掌握
            </p>
            <p>房东信息，尽收眼底</p>
          </div>
        </div>
        <div class="content1-img">
          <img src="../../assets/03.png" alt="">
        </div>
      </div>
    </div>

    <div class="content">
      <div class="content-wrapper content2">
        <div class="content1-img content4-img">
          <img src="../../assets/04.png" alt="">
        </div>
        <div class="content2-title content4-title">
          <h1>04</h1>
          <p class="title">资金结算</p>
          <div class="text">
            <p>资金流水，一目了然</p>
            <p>往来明细，心中有数</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content odd">
      <div class="content-wrapper content1">
        <div class="content1-title content5-title">
          <h1>05</h1>
          <p class="title">金融产品</p>
          <div class="text">
            <p>房东贴现，装修贷</p>
            <p>从此资金不愁</p>
          </div>
        </div>
        <div class="content1-img">
          <img src="../../assets/05.png" alt="">
        </div>
      </div>
    </div>

    <div class="content content-footer">
      <h1>INTRODUCTION</h1>
      <h2>关于寓道</h2>
      <div class="text">
        <p>我们是这样一群人，有公寓运营服务专家，有信息管理系统科研高手，有互联网行业老炮，</p>
        <p>更加富有的是让世界变得更加美好的激情。</p>
        <p>寓道，公寓知道，公寓的全生态、全产业链、全生命周期的事情我们都知道。</p>
        <p>寓道，公寓之道，把握公寓生产、租赁、管理、服务和金融的最佳运营之道。</p>
        <p>我们希望，在寓道，每一位公寓所有者都能遇到最优化的运营增值服务，</p>
        <p>每一位租客都能遇到自己梦想居住的空间，每一个人都能遇到最美好的一切。</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.section {
  min-width: 1180px;
  text-align: center;
  .content {
    position: relative;
    height: 750px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .odd {
    background: #f5f4fa;
  }
  .content-wrapper {
    display: inline-block;
    position: relative;
    width: 1180px;
    min-width: 1180px;
    .content1-title {
      display: inline-block;
      position: absolute;
      top: 320px;
      left: 20px;
      width: 400px;
      height: 520px;
      z-index: 50;
      text-align: center;
      line-height: 80px;
      background: url(../../assets/橙色.png) no-repeat;
      background-size: 100%;
      h1 {
        font-size: 64px;
        margin-top: 50px;
        color: #fd9602;
      }
      .title {
        font-size: 35px;
        color: #333;
      }
      .text {
        font-size: 25px;
        color: #999;
        line-height: 40px;
      }
    }
    .content3-title {
      background: url(../../assets/蓝色.png) no-repeat 0 0;
      background-size: 100%;
      h1 {
        color: #2fb3fe;
      }
    }
    .content5-title {
      background: url(../../assets/紫色.png) no-repeat 0 0;
      background-size: 100%;
      h1 {
        color: #b172ff;
      }
    }
    .content1-img {
      display: inline-block;
      width: 512px;
      text-align: end;
      position: absolute;
      top: 300px;
      right: 20px;
      z-index: 50;
      img {
        width: 100%;
      }
    }
  }
  .content2 {
    .content2-title {
      width: 400px;
      height: 520px;
      position: absolute;
      right: 30px;
      top: 320px;
      display: inline-block;
      z-index: 50;
      text-align: center;
      line-height: 80px;
      background: url(../../assets/紫色.png) no-repeat 0 0;
      background-size: 100%;
      h1 {
        font-size: 64px;
        margin-top: 50px;
        color: #b172ff;
      }
      .title {
        font-size: 35px;
        color: #333;
      }
      .text {
        font-size: 25px;
        color: #999;
        line-height: 40px;
      }
    }
    .content4-title {
      background: url(../../assets/橙色.png) no-repeat 0 0;
      background-size: 100%;
      h1 {
        color: #fd9602;
      }
    }
    .content1-img {
      display: inline-block;
      width: 530px;
      text-align: end;
      position: absolute;
      top: 290px;
      left: 30px;
      z-index: 50;
      img {
        width: 100%;
      }
    }
    .content4-img{
      top: 350px;
    }
  }
  .content-footer {
    display: inline-block;
    height: 500px;
    text-align: center;
    line-height: 45px;
    color: #555;
    font-weight: bold;
    border-bottom: 0px;
    margin-top: 100px;
    h1 {
      display: inline-block;
      width: 270px;
      border-bottom: 1px solid #999;
      font-size: 32px;
    }
    h2 {
      font-size: 20px;
    }
    .text {
      margin-top: 50px;
      text-align: left;
      color: #777;
      font-weight: normal;
      font-size: 24px;
      line-height: 35px;
    }
  }
}
</style>
