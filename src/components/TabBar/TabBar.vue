<template>
  <div class="tabbar">
    <nav>
      <router-link to="/" class="home tab_button">
        <span class="button_picture"></span>
        首页
      </router-link>
      <router-link to="/cake" class="cake tab_button">
        <span class="button_picture"></span>
        蛋糕店
      </router-link>
      <router-link to="/gift"class="gift tab_button">
        <span class="button_picture"></span>
        礼品店
      </router-link>
      <router-link to="/cart" class="cart tab_button">
        <span class="button_picture"></span>
        <!-- 购物车商品数量显示标签 -->
        <i class="proNum" v-show="cartsLen>0">{{cartsLen}}</i>
        <!-- <i class="proNum">0</i> -->
        购物车
      </router-link>
      <router-link to="/mine" class="mine tab_button">
        <span class="button_picture"></span>
        个人中心
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    cartsLen () {
      return this.$store.getters.cartsLen
    }
  }
}
</script>

<style lang="less" scoped>
.tabbar {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 4.5rem;
    line-height: 6.3rem;
    border-top: 1px solid #a38d6b;
    background: #fff;
    // 5个button样式
    .tab_button {
        width: 20%;
        height: 100%;
        float: left;
        text-align: center;
        color: #a38d6b;
        position: relative;
        font-size: 0.9rem;
        // button图标的通用样式
        .button_picture {
            display: block;
            width: 1.3rem;
            height: 1.3rem;
            position: absolute;
            top: 13%;
            left: 41%;
        }
    }
}
// 各个图标样式
a:hover, a:active {
    text-decoration: none;
    color: #a38d6b;
}
nav > a.home > span {
    background: url('./images/home.jpg') no-repeat;
    background-size: contain;
}
nav > a.cake > span {
  background: url('./images/cake.jpg') no-repeat;
  background-size: contain;
}
nav > a.gift > span {
  background: url('./images/gift.jpg') no-repeat;
  background-size: contain;
}
nav > a.cart > span {
  background: url('./images/cart.jpg') no-repeat;
  background-size: contain;
}
nav > a.mine > span {
  background: url('./images/mine.jpg') no-repeat;
  background-size: contain;
}
nav>a.home.router-link-exact-active>span{
  background-image: url("./images/home-active.jpg");
}
nav>a.cake.router-link-exact-active>span{
  background-image: url("./images/cake-active.jpg");
}
nav>a.gift.router-link-exact-active>span{
  background-image: url("./images/gift-active.jpg");
}
nav>a.cart.router-link-exact-active>span{
  background-image: url("./images/cart-active.jpg");
}
nav>a.mine.router-link-exact-active>span{
  background-image: url("./images/mine-active.jpg");
}
// 购物车商品数量样式
.proNum {
  width: 1.2rem;
  height: 1.2rem;
  background: red;
  text-align: center;
  line-height: 1.2rem;
  border-radius: 50%;
  color: #fff;
  display: block;
  position: absolute;
  top: 7%;
  left: 54%;
  font-style: normal;
  font-weight: normal;
  // display: none;
}
</style>

