<template>
  <div class="product_particulars">
    <div class="proItemTitle">
      <span class="el-icon-arrow-left back2" @click="Back"></span>
      <span class="proItem">商品详情</span>
      <router-link to="/" class="goHome"><span class="homeTuan"></span>首页</router-link>
    </div>
    <img v-lazy="productDetail.imgs.big" class="proImg">
    <div class="suggest">
        <div class="eatsuggest" :class="{Bgwhite: ActiveIndex === 1}" @click="ActiveIndex = 1">
          <span class="span_suggest">建议</span>
          <p>2-4人食</p>
        </div>
        <div class="eatsuggest" :class="{Bgwhite: ActiveIndex === 2}" @click="ActiveIndex = 2">
          <span class="span_suggest">建议</span>
          <p>5-8人食</p>
        </div>
        <div class="eatsuggest" :class="{Bgwhite: ActiveIndex === 3}" @click="ActiveIndex = 3">
          <span class="span_suggest">建议</span>
          <p>10-12人食</p>
        </div>
        <div class="eatsuggest" :class="{Bgwhite: ActiveIndex === 4}" @click="ActiveIndex = 4">
          <span class="span_suggest">建议</span>
          <p>15-20人食</p>
        </div>
    </div>
    <div class="proDetail_1">
        <p class="proDetail_1_Detail">{{productDetail.proName}}&nbsp;&nbsp;<span>{{productDetail.proEName}}</span></p>
        <span class="proPrice_item">￥{{productDetail.proPrice}}</span>
    </div>
    <div class="proDetail_2">
        <span class="flavor">口味:芝士口味</span>
        <span class="flavor yue">约13*13cm</span>
        <span class="flavor canju">含5套餐具</span>
        <span class="flavor tiandu">甜度: <span class="el-icon-star-on xing xing1"></span><span class="el-icon-star-on xing xing2"></span></span>
        <span class="flavor ke">约{{productDetail.unit}}g</span>
    </div>
    <div class="purchase">
        <div class="purTielt">
          提交订单或直接进入订单详情页即可上传语音
        </div>
        <div class="group_list">
          <img src="./images/tuangou.jpg" alt="" width="25%">
          <div class="group_introduce">
            <p>[组合购]</p>
            <span>+9.00</span>元换购怪声怪器
          </div>
          <span class="group_check" :class="{selectGroup: ActiveGroupBol}" @click.stop="ActiveGroupBol = !ActiveGroupBol"></span>
        </div>
    </div>
    <div class="delicious">
        <div class="delicious_title">
          <p>找寻心中的美味</p>
          <span>The Custom Flavor</span>
        </div>
        <img v-lazy=productDetail.imgs.small width="100%">
        <p class="introduce">{{productDetail.details}}</p>
    </div>
    <div class="material">
        <div class="material_title">
          <p>严选食材</p>
          <span>The Top Ingredients</span>
        </div>
        <img v-lazy="productDetail.imgs.medium" width="100%">
        <img src="//rescdn.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/goods/img-chef.jpg" alt="" width="100%">
    </div>
    <div class="origin">
        <div class="origin_title">
          <p>主要原材料</p>
          <span>Main raw materials</span>
        </div>
        <div class="originMain">
          <table>
            <tr>
              <td>食材配比</td>
              <td>产地</td>
            </tr>
            <tr>
              <td>无盐黄油</td>
              <td>新西兰</td>
            </tr>
            <tr>
              <td>白巧克力</td>
              <td>比利时</td>
            </tr>
            <tr>
              <td>芝士</td>
              <td>新西兰</td>
            </tr>
            <tr>
              <td>淡奶油</td>
              <td>新西兰</td>
            </tr>
            <tr>
              <td>牛奶</td>
              <td>法国/德国</td>
            </tr>
          </table>
        </div>
    </div>
    <div class="about">
        <div class="about_title">
          <p class="shiyong">关于食用</p>
          <span>How To Process</span>
        </div>
        <p class="about_item">口味：芝士口味</p>
        <p class="about_item">适合季节：所有</p>
        <p class="about_item">适合人群：大众</p>
        <p class="about_item">保鲜条件：冷藏0-4摄氏度</p>
        <p class="about_item">食用方法：请收到蛋糕后2-3小时内食用</p>
        <p class="about_item red">温馨提示：蛋糕中出现的细小黑色颗粒为香草籽，此为香草荚未碾磨均匀带入的颗粒，可放心食用。</p>
    </div>
    <div class="love_cake">
        <div class="love_cake_title">
          <p class="dingzhi">如何定制我的情话蛋糕?</p>
          <span>How To Cstomize</span>
        </div>
        <img src="//rescdn.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/goods/audio-tips.jpg?latest" alt="" width="100%">
    </div>
    <div class="user_comment">
        <div class="user_comment_title">
          <p>用户评论</p>
          <span>Reviews</span>
        </div>
        <div class="comment">
          <img src="//rescdn.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/goods/avatar.png">
          <p>17826804586 &nbsp;&nbsp;&nbsp; <span>2-4人食</span><span class="comment_time">2017-11-2</span></p>
        </div>
        <div class="comment_content">一直在诺心买蛋糕，送货快，新鲜，蛋糕也好吃。</div>
        <div class="comment">
          <img src="//rescdn.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/goods/avatar.png">
          <p>13918323506 &nbsp;&nbsp;&nbsp; <span>2-4人食</span><span class="comment_time">2017-11-2</span></p>
        </div>
        <div class="comment_content">好吃</div>
        <div class="comment">
          <img src="//rescdn.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/goods/avatar.png">
          <p>15306661719 &nbsp;&nbsp;&nbsp; <span>2-4人食</span><span class="comment_time">2017-11-2</span></p>
        </div>
        <div class="comment_content">味道很好，非常棒</div>
        <span class="el-icon-arrow-down more_comment_content"></span>
    </div>
    <div class="footer_nav">
        <div class="container">
          <div class="carts" @click.stop="goCart()">
            <span class="CartsNum" v-show="cartsLen>0">{{cartsLen}}</span>
            <span class="carts_2"></span>
            购物车
          </div>
          <div class="service" @click.stop="goKefu()">
            <span class="kefu el-icon-service"></span>
            客服
          </div>
        </div>
        <div class="addCart" @click="add(productDetail)">加入购物车</div>
    </div>
    <go-top></go-top>
  </div>
</template>

<script>
import GoTop from '@/components/GoTop/GoTop'
export default {
  created () {
    this.id = this.$route.params.id
    // console.log(this.productDetail)
  },
  data () {
    return {
      ActiveIndex: 1,
      id: 0,
      ActiveGroupBol: false
    }
  },
  components: {
    GoTop
  },
  computed: {
    productDetail () {
      let cakeGiftPro = this.$store.state.cakeGiftPro
      if (cakeGiftPro.length > 0) {
        for (let i = 0; i < cakeGiftPro.length; i++) {
          if (cakeGiftPro[i].product_id === Number(this.id)) {
            // console.log(cakeGiftPro[i])
            return cakeGiftPro[i]
          }
        }
      } else {
        return {
          imgs: {}
        }
      }
    },
    // 购物车商品数量
    cartsLen () {
      return this.$store.getters.cartsLen
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    Back () {
      this.$router.go(-1)
    },
    add (item) {
      if (this.userInfo.id) {
        console.log('have_user_add')
        this.$store.dispatch('addPro', item)
      } else {
        // this.$msg('提示', '请登录')
        //   .then(res => {
        //     this.$router.push('/login')
        //   })
        console.log('no_user_add')
        this.$store.dispatch('no_user_add', item)
      }
    },
    goCart () {
      this.$router.push('/cart')
    },
    goKefu () {
      this.$router.push('/kefu')
    }
  }
}
</script>

<style lang="less" scoped>
img[lazy=loading]{
  background: url("../../assets/loading.gif") center center no-repeat;
  -webkit-background-size: 1.5rem 1.5rem;
  background-size: 1.5rem 1.5rem;
}
.product_particulars {
    margin: 3.5rem 0 4.5rem 0;
    .proItemTitle {
        width: 100%;
        height: 3.5rem;
        background: #fff;
        line-height: 3.5rem;
        text-align: center;
        position: fixed;
        color: #a38d6b;
        border-bottom: 1px solid #e1dbcc;
        z-index: 15;
        top: 0;
        .back2 {
            width: 10%;
            height: 100%;
            line-height: 3.5rem;
            text-align: center;
            position: absolute;
            left: 0;
            font-size: 1.1rem;
        }
        .proItem {
            font-size: 1rem;
        }
        .goHome {
            width: 20%;
            height: 100%;
            position: absolute;
            right: 0;
            margin: 0;
            font-size: 1rem;
            color: #a38d6b;
            text-decoration: none;
            .homeTuan {
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                margin-top: 0.1rem;
                background: url('../../components/TabBar/images/home.jpg') no-repeat;
                background-size: contain;
                position: relative;
                top: 0.1rem;
            }
        }
    }
    .proImg {
        width: 100%;
        height: 23rem;
    }
    .suggest {
        width: 100%;
        height: 5rem;
        background: #f6f6f6;
        .eatsuggest {
        width: 25%;
        height: 100%;
        // background: skyblue;
        float: left;
        text-align: center;
        font-size: 1rem;
        color: #a38d6b;
        .span_suggest {
            display: block;
            margin-top: 15%;
        }
        }
        .Bgwhite {
        background: #fff;
        }
    }
    .proDetail_1 {
        width: 90%;
        height: 4rem;
        margin-left: 5%;
        line-height: 4rem;
        // text-indent: 1rem;
        border-bottom: 1px solid #e1dbcc;
        .proDetail_1_Detail {
            width: 75%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
            font-size: 1.1rem;
            float: left;
            color: #444;
            span {
                font-size: 1rem;
            }
        }
        .proPrice_item {
            float: right;
            font-size: 1.1rem;
            color: #ff4001;
        }
    }
    .proDetail_2 {
        width: 90%;
        height: 6rem;
        margin-left: 5%;
        border-bottom: 1px solid #e1dbcc;
        position: relative;
        .flavor {
            width: 33.33%;
            height: 50%;
            font-size: 1rem;
            display: flex;
            // justify-content: center;
            // text-indent: 1rem;
            align-items: center;
            position: absolute;
            left: 0;
            top: 0;
        }
        .yue {
            left: 33.33%;
            top: 0;
        }
        .canju {
            left: 66.66%;
            top: 0;
        }
        .tiandu {
            left: 0;
            top: 50%;
            .xing {
                margin: 0;
                padding: 0;
                width: 1.2rem;
                color: #a38d6b;
                position: relative;
            }
            .xing1 {
                // left: -rem;
            }
            .xing2 {
                left: 0.1rem;
            }
        }
        .ke {
            top: 50%;
            left: 33.33%;
        }
    }
    .purchase {
        width: 90%;
        height: 12rem;
        margin-left: 5%;
        border-bottom: 1px solid #e1dbcc;
        .purTielt {
        font-size: 1rem;
        // text-indent: 1rem;
        line-height: 4rem;
        }
        .group_list {
            width: 100%;
            background: #f9f9f9;
            height: 6rem;
            position: relative;
        img {
            float: left;
        }
        .group_introduce {
            float: left;
            font-size: 1rem;
            margin-left: 1rem;
            p {
            margin-top: 10%;
            }
            span {
            color: #FF4001;
            }
        }
        .group_check {
            float: right;
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            position: absolute;
            border: 1px solid #9c9c9c;
            right: 1%;
            top: 40%;
        }
        .selectGroup {
            background: url('../Cart/images/checkbox-selectd.png');
            background-size: contain;
            border: none;
        }
        }
    }
    .delicious {
        width: 90%;
        height: 28rem;
        margin-left: 5%;
        border-bottom: 1px solid #e1dbcc;
        .delicious_title {
            width: 100%;
            height: 4rem;
            // background: red;
            font-size: 1rem;
            color: #a38d6b;
            text-align: center;
            padding-top: 0.1px;
            p {
                margin: 0;
                margin-top: 2%;
            }
        }
        .introduce {
            width: 80%;
            font-size: 1rem;
            margin-left: 10%;
            margin-top: 5%;
        }
    }
    .material {
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid #e1dbcc;
        text-align: center;
        padding-top: 0.1px;
        color: #a38d6b;    
        .material_title {
            height: 4rem;
            font-size: 1rem;
            p {
                margin: 0;
                margin-top: 1rem;
            }
        }
    }
    .origin {
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid #e1dbcc;
        text-align: center;
        padding-top: 0.1px;
        color: #a38d6b;
        .origin_title {
            height: 4rem;
            font-size: 1rem;
            p {
                margin: 0;
                margin-top: 1rem;
            }
        }
        table {
            width: 100%;
            font-size: 1rem;
            color: #424242;
            margin-bottom: 1rem;
            td {
                line-height: 2rem;
            }
        }
    }
    .about {
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid #e1dbcc;
        text-align: center;
        padding-top: 0.1px;
        color: #a38d6b;
        .about_title {
            height: 4rem;
            font-size: 1rem;
            .shiyong {
                color: #a38d6b;
                margin: 0;
                margin-top: 1rem;
            }
        }
        .about_item {
            margin: 0;
            font-size: 1rem;
            color: #424242;
            width: 70%;
            margin-left: 15%;
            text-align: left;
            margin-bottom: 0.2rem;
        }
        .red {
            color: #ff4001;
            margin-bottom: 1rem;
        }
    }
    .love_cake {
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid #e1dbcc;
        text-align: center;
        padding-top: 0.1px;
        color: #a38d6b;
        .love_cake_title {
            height: 4rem;
            font-size: 1rem;
            .dingzhi {
                color: #a38d6b;
                margin: 0;
                margin-top: 1rem;
            }
        }
        img {
            margin-bottom: 1rem;
        }
    }
    .user_comment {
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid #e1dbcc;
        text-align: center;
        padding-top: 0.1px;
        color: #a38d6b;
        .user_comment_title {
        height: 4rem;
        font-size: 1rem;
        p {
            color: #a38d6b;
            margin: 0;
            margin-top: 1rem;
        }
        }
        .comment {
            width: 100%;
            height: 4rem;
            position: relative;
            img {
                float: left;
                height: 100%;
                width: 15%;
            }
            p {
                font-size: 1rem;
                color: #3e3e3e;
                text-align: left;
                text-indent: 10%;
                line-height: 3rem;
                margin: 0;
            }
            .comment_time {
                font-size: 1rem;
                color: #7c7c7c;
                position: absolute;
                right: 0;
            }
        }
        .comment_content {
            width: 100%;
            font-size: 1rem;
            text-align: left;
            line-height: 2rem;
            color: #000;
            border-bottom: 1px solid #e1dbcc;
        }
        .more_comment_content {
            margin: 0.5rem 0;
            font-size: 1rem;
        }
    }
    .footer_nav {
        width: 100%;
        height: 4rem;
        position: fixed;
        bottom: 0;
        z-index: 15;
        background: #fff;
        border-top: 1px solid #e1dbcc;
        .container {
            width: 60%;
            height: 100%;
            float: left;
            padding: 0;
            color: #a38d6b;
            .carts {
                width: 50%;
                height: 100%;
                float: left;
                font-size: 1rem;
                text-align: center;
                line-height: 5.5rem;
                position: relative;
                .carts_2 {
                    display: block;
                    width: 1.2rem;
                    height: 1.2rem;
                    background: url('../../components/TabBar/images/cart-active.jpg') no-repeat;
                    background-size: contain;
                    position: absolute;
                    top: 20%;
                    left: 43%;
                }
                .CartsNum {
                    display: block;
                    width: 1rem;
                    height: 1rem;
                    background: red;
                    text-align: center;
                    line-height: 1rem;
                    color: #fff;
                    border-radius: 50%;
                    position: absolute;
                    top: 10%;
                    left: 53%;
                    z-index: 10;
                }
            }
            .service {
                width: 50%;
                height: 100%;
                float: right;
                font-size: 1rem;
                text-align: center;
                line-height: 5.5rem;
                position: relative;
                .kefu {
                    font-size: 1.2rem;
                    position: absolute;
                    top: 20%;
                    left: 43%;
                }
            }
        }
        .addCart {
            width: 40%;
            height: 100%;
            float: right;
            background: #ff4001;
            color: #fff;
            text-align: center;
            line-height: 4rem;
            font-size: 1rem;
        }
    }
}
</style>

