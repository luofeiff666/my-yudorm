<template>
    <footer>
        <div class="footer-wrapper">
            <div class="left">
                <h1>联系我们</h1>
                <div class="text">
                    <p>
                        <span>加入我们：</span>
                        <a href="#">hr@yudorm.com</a>
                    </p>
                    <p>
                        <span>微信公众号：</span>
                        <a href="#">www.yudorm.com</a>
                    </p>
                    <p>
                        <span>公司邮箱：</span>
                        <a href="#">support@yudorm.com</a>
                    </p>
                </div>
            </div>
            <div class="right">
                <div class="text text-r">
                    <p>
                        版权所有：北京寓道科技有限公司
                    </p>
                    <p>
                        公司地址：北京朝阳区望京摩托罗拉大厦5层
                    </p>
                    <p>
                        © www.yudorm.com 2016京 ICP备16065570号
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {}
}
</script>

<style lang='scss' scoped>
footer {
  min-width: 1180px;
  background: #f5f4fa;
  text-align: center;
  .footer-wrapper {
    padding: 29px 0;
    .left {
      display: inline-block;
      padding-right: 68px;
      border-right: 1px solid #dfdfdf;
      text-align: right;
      line-height: 48px;
      h1 {
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: #000333;
        font-weight: bold;
      }
    }
    .right {
      display: inline-block;
      padding-left: 68px;
      text-align: left;
      .text-r {
      }
    }
    .text {
      line-height: 48px;
      font-size: 18px;
      color: #999;
      a {
        text-decoration: none;
        color: #999;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
