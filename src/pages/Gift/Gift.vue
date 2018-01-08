<template>
  <div class="gift">
    <header-white two_button_Bol="true"></header-white>
    <div class="gift_main">
      <ul class="gift_ul">
        <router-link tag="li" :to="'/product-particulars/' + item.product_id" v-for="(item, index) in giftPro" :key="item.product_id" @click="getItem(item)">
          <div class="gift_img">
            <img v-lazy="item.imgs.small" width="100%">
            <span class="gift_price">¥{{item.proPrice}}</span>
          </div>
          <p class="gift_Name">{{item.proName}}<br><span class="gift_EName">{{item.proEName}}</span></p>
        </router-link>
      </ul>
      <div class="no_more_gift">没有更多商品喽~</div>
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
    giftPro () {
      return this.$store.state.giftPro
    }
  },
  methods: {
    getItem (item) {
      console.log(item)
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
.gift_main {
    width: 100%;
    margin: 3.5rem 0 6rem 0;
    // 礼品列表
    .gift_ul {
      list-style: none;
      width: 100%;
      li {
        margin-bottom: 1rem;
        .gift_img {
          margin-bottom: 1rem;
          position: relative;
          .gift_price {
            position: absolute;
            right: 1.5rem;
            top: 108%;
            font-size: 1.1rem;
            color:#fd4f00;
          }
        }
        .gift_Name {
          text-indent: 1rem;
          font-size: 1.1rem;
          margin: 0;
          .gift_EName {
            display: inline-block;
            font-size: 1rem;
            color: #666;
          }
        }
      }
    }
    .no_more_gift {
      text-align: center;
      font-size: 1.1rem;
      color: #a1a1a1;
    }
}
</style>