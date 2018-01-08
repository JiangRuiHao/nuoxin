<template>
  <div class="mine">
    <div class="mine_main">
      <!-- 用户div -->
      <div class="user_div">
        <!-- 用户头像 -->
        <div class="userhead">
          <img src="//rescdn.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/customer/avatar_new.png" alt="">
        </div>
        <!-- 用户登录(详情) -->
        <div class="user_login">
          <span type="primary" class="login_button" v-show="!userInfo.id" @click="toLogin()">登录</span>
          <div class="userInfo" v-show="userInfo.id">
            <div class="user_phone">{{userInfo.phone}}<span class="user_level">{{userInfo.level}}</span></div>
            <div class="user_integral">积分 : {{userInfo.current_score}}</div>
            <span class="go_user_detail"></span>
          </div>
        </div>
      </div>
      <!-- 用户选项 -->
      <div class="user_options">
        <div class="options">
          <span class="obligation"></span>
          待付款
        </div>
        <div class="options">
          <span class="shipments"></span>
          待发货
        </div>
        <div class="options">
          <span class="delivery"></span>
          待收货
        </div>
        <div class="options_my_order" @click="goIndent()">
          <span class="indent"></span>
          我的订单
        </div>
      </div>
      <!-- 用户卡劵 -->
      <div class="user_card_stock">
        <h3><span class="discounts"></span>优惠卡卷<span class="more"></span><span class="discounts_num" v-show="0">0</span></h3>
        <h3 class="h3_last"><span class="leculb"></span>Leculb<span class="more"></span></h3>
      </div>
      <!-- 关于诺心 -->
      <div class="about_div">
        <h3 class="h3_last" @click="about(true)">关于我们<span class="more"></span></h3>
        <h3 class="h3_last" @click="about(false)">关于发票<span class="more"></span></h3>
      </div>
      <!-- 客服电话 -->
      <div class="Customer">
        <span class="Customerphone"></span>客服电话: 400-157-8578
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    about (Bol) {
      this.$router.push('/about')
      this.$store.dispatch('changeAboutBol', Bol)
    },
    goIndent () {
      this.$router.push('/myindent')
    }
  }
}
</script>

<style lang="less" scoped>
.mine_main {
    width: 100%;
    margin-bottom: 4.5rem;
    .user_div {
      width: 100%;
      height: 10rem;
      border-bottom: 1px solid #a38d6b;
      font-size: 1rem;
      .userhead {
          width: 48%;
          height: 100%;
          float: left;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 5rem;
            height: 5rem;
            background: #f7f5f5;
            border-radius: 50%;
            line-height: 4rem;
            text-align: right;
            position: absolute;
            right: 0.5rem;
          }
      }
      .user_login {
        width: 52%;
        height: 100%;
        float: right;
        display: flex;
        align-items: center;
        position: relative;
        font-size: 1rem;        
        .login_button {
          display: block;
          margin-left: 0.5rem;
          padding: 0.3rem 1.6rem;
          background: #a38d6b;
          border-radius: 5px;
          color: #fff;
        }
        .user_phone {
          font-size: 1rem;
          position: absolute;
          top: 30%;
          float: left;
          .user_level {
            background: #a38d6b;
            color: #fff;
            padding: 2px 3px;
            margin-left: 0.5rem;
          }
        }
        .user_integral {
          width: 5rem;
          height: 2rem;
          line-height: 1rem;
          position: absolute;
          bottom: 20%;
          left: 0;
        }
        .go_user_detail {
          position: absolute;
          right: 1rem;
          top: 45%;
          // font-size: 1.2rem;
          width: 1.2rem;
          height: 1.2rem;
          float: right;
          margin-left: 1rem;
          background: url('http://rescdn.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/customer/arrow.png') no-repeat center center;
          background-size: contain;
        }
      }
    }
    .user_options {
      width: 100%;
      height: 5rem;
      font-size: 1rem;      
      border-bottom: 1px solid #a38d6b;
      .options, .options_my_order {
        width: 20%;
        height: 100%;
        text-align: center;
        float: left;
        line-height: 6rem;
        position: relative;
      }
      .options_my_order {
        width: 40%;
        float: right;
        background: #f9f9f9;
        span {
          left: 45%;
        }
      }
      span {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        left: 40%;
        top: 20%;
        background: skyblue;
        font-size: 1rem;
      }
      .obligation {
        background: url('./images/obligation.jpg') no-repeat;
        background-size: cover;
      }
      .shipments {
        background: url('./images/shipments.jpg') no-repeat;
        background-size: contain;
      }
      .delivery {
        background: url('./images/delivery.jpg') no-repeat;
        background-size: contain;
      }
      .indent {
        background: url('./images/indent.jpg') no-repeat;
        background-size: contain;
      }
    }
    .user_card_stock, .about_div {
      font-size: 1rem;
      width: 100%;
      // height: 6rem;
      border-bottom: 1px solid #a38d6b; 
      h3 {
        font-size: 1rem;
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        text-indent: 1rem;
        margin: 0;
        margin-top: 1rem;
        position: relative;
      }
      .h3_last {
        margin-bottom: 1rem;
      }
      .discounts, .leculb {
        display: inline-block;
        width: 1.3rem;
        height: 1.3rem;
        position: relative;
        top: 0.2rem;
        margin-right: 0.3rem;
        font-size: 1rem;
        background: url('./images/discounts.jpg') no-repeat;
        background-size: contain;
      }
      .discounts_num {
          display: block;
          width: 1rem;
          height: 1rem;
          background: red;
          font-size: 0.9rem;
          border-radius: 50%;
          position: absolute;
          text-indent: 0;
          text-align: center;
          line-height: 1rem;
          left: 21%;
          top: 25%;
          color: #fff;
      }
      .leculb {
        background: url('./images/leculb.jpg') no-repeat;
        background-size: contain;
      }
      .more {
        width: 1.2rem;
        height: 1.2rem;
        margin-left: 1rem;
        background: url('http://rescdn.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/customer/arrow.png') no-repeat center center;
        background-size: contain;
        display: inline-block;
        position: absolute;
        right: 1rem;
        top: 30%;
      }
    }
    .about_div {
      border: none;
    }
    .Customer {
      text-align: center;
      font-size: 1rem;
      width: 100%;
      position: absolute;
      bottom: 6rem;
      .Customerphone {
          display: inline-block;
          width: 1.2rem;
          height: 1.2rem;
          background: url('./images/Customerphone.jpg') no-repeat;
          background-size: contain;
          position: relative;
          top: 0.3rem;
      }
    }
}
</style>

