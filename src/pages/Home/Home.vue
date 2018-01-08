<template>
  <div class="home">
    <header-white nuo_xin_Bol="true"></header-white>
    <div class="home_main">
      <img src="//rescdn.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/home/head_getCoupon.png?v=1" class="pick_img">
      <!-- 轮播图 -->
      <div class="roasting_chart">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item, index) in banner" :key="index"><img v-lazy="item.img" width="100%" height="100%"></mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 为您推荐 -->
      <div class="recommend">
        <div class="recommend_head">
          <span>为您推荐</span>
          <p>Sincerely Recommend</p>
        </div>
        <ul class="recommend_ul" id="recommend_ul">
          <router-link tag="li" v-for="(item, index) in recommendPro" :key="item.product_id" :to="'/product-particulars/' + item.product_id">
            <img v-lazy="item.imgs.big" width="100%">
            <p class="proName">{{item.proName}}<span class="addPro" @click.stop="add(item)">＋</span></p>
            <p class="proEName">{{item.proEName}}</p>
          </router-link>
        </ul>
      </div>
      <!-- 全部蛋糕按钮 -->
      <router-link to="/cake" class="all_cake_button">
        <p class="all_cake">全部蛋糕</p>
        <span>more</span>
      </router-link>
      <!-- 银行专区按钮 -->
      <router-link to="/bank" class="all_cake_button">
        <p class="all_cake">银行专区</p>
        <span>Bank Zone</span>
      </router-link>
      <!-- 触屏版,电脑版 -->
      <div class="toggle">
        <div class="toggle_two">
          <router-link to="">
            <span class="toggle_phone"></span><br>
            触屏版
          </router-link>
          <router-link to="">
            <span class="toggle_computer"></span><br>
            电脑版
          </router-link>
        </div>
      </div>
      <!-- 版权 -->
      <div class="copyright">copyright © 2010-2017 诺心lecake.com版权所有</div>
    </div>
    <go-top></go-top>
  </div>
</template>

<script>
import HeaderWhite from '@/components/Header-white/Header-white'
import GoTop from '@/components/GoTop/GoTop'
export default {
  components: {
    HeaderWhite,
    GoTop
  },
  computed: {
    banner () {
      return this.$store.state.banner
    },
    recommendPro () {
      return this.$store.state.recommendPro
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
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
.home_main {
    width: 100%;
    margin: 4rem 0 6rem 0;
    // background: skyblue;
    // 轮播图上的小图
    .pick_img {
      width: 100%;
      position: absolute;
      top: 3rem;
      left: 0;
      float: left;
      z-index: 8;
    }
    // 轮播图
    .roasting_chart {
      width: 100%;
      height: 47rem;
    }
    // 为您推荐
    .recommend {
      width: 90%;
      height: 100%;
      margin: 5% 0 0 5%;
      border-top: 0.1rem solid #a38d6b;
      color: #a38d6b;
      font-size: 0.9rem;
      // 推荐头部
      .recommend_head {
        width: 100%;
        height: 4rem;
        text-align: center;
        padding-top: 1rem;
      }
      // 推荐列表
      .recommend_ul {
        width: 100%;
        list-style: none;
        margin-top: 1rem;
        font-size: 0;
        color: #444;
        li {
          display: inline-block;
          width: 48%;
          margin: 0 4% 2% 0;
          font-size: 0.9rem;
          img {
            margin-bottom: 0.5rem;
          }
          p {
            margin: 0;
            font-size: 1rem;
            .addPro {
              float: right;
              width: 1.2rem;
              height: 1.2rem;
              background: orangered;
              text-align: center;
              line-height: 1.2rem;
              color: #fff;
            }
          }
        }
      }
    }
    #recommend_ul > li:nth-child(2n) {
      margin-right: 0;
    }
    // 全部蛋糕按钮和银行专区按钮
    .all_cake_button {
      display: block;
      width: 100%;
      height: 4rem;
      background: #f9f9f9;
      text-align: center;
      color: #a38d6b;
      font-size: 0.9rem;
      padding-top: 0.1px;
      margin-bottom: 1rem;
      .all_cake {
        margin: 2% 0 0 0;
      }
    }
    // 手机电脑版
    .toggle {
      width: 100%;
      height: 4rem;
      .toggle_two {
        width: 60%;
        height: 100%;
        margin-left: 20%;
        a {
          width: 50%;
          height: 100%;
          float: left;
          text-align: center;
          font-size: 0.9rem;
          color: #5c5c5c;
        }
        .toggle_phone {
          display: inline-block;
          width: 1.2rem;
          height: 1rem;
          background: url('./images/phone.jpg') no-repeat;
          background-size: contain;
          margin-top: 0.8rem;
        }
        .toggle_computer {
          display: inline-block;
          width: 1.2rem;
          height: 1rem;
          background: url('./images/computer.jpg') no-repeat;
          background-size: contain;
          margin-top: 0.8rem;
        }
      }
    }
    // 版权声明
    .copyright {
      width: 100%;
      text-align: center;
      font-size: 0.9rem;
      color: #5c5c5c;
      margin-top: 1rem;
    }
}
a:hover, a:active {
  text-decoration: none;
}
</style>

