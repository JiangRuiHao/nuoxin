<template>
  <div class="cake">
    <header-white two_button_Bol="true" button_screening_Bol="true" ActiveBol="true"></header-white>
    <div class="cake_main">
      <!-- 蛋糕商品列表 -->
      <ul class="cake_ul">
        <router-link tag="li" :to="'/product-particulars/' + item.product_id" v-for="(item, index) in changeProArray" :key="item.product_id">
          <div class="cake_img">
            <img v-lazy="item.imgs.small" width="100%">
            <span class="cake_price">¥{{item.proPrice}}</span>
          </div>
          <p class="cake_Name"><span></span>{{item.proName}}<br v-show="false"><span class="cake_EName">{{item.proEName}}</span></p>
          <span class="sales_labels">{{item.sellName}}</span>
        </router-link>
      </ul>
      <div class="no_more_cake">没有更多商品喽~</div>
      <!-- 筛选div -->
      <div class="screening_div" :class="{width: ScreeningBol}">
        <h4>筛选</h4>
        <div class="screening_title">时刻</div>
        <!-- 筛选列表 -->
        <ul class="screening_value_ul">
          <li v-for="(item, index) in classifys" :key="index" @click="ActiveCategoryIndex = index" :class="{border: ActiveCategoryIndex === index}">{{item.classifys_title}}</li>
        </ul>
        <!-- 筛选2个按钮 -->
        <div class="screening_two_button">
          <div class="reset_button" @click="reset">重置</div>
          <div class="determine_button" @click="ensure">确定</div>
        </div>
      </div>
      <!-- 筛选伪背景 -->
      <div class="screening_bg" v-show="ScreeningBol" @click="changeScreeningBol"></div>
      <go-top></go-top>
    </div>
  </div>
</template>

<script>
import HeaderWhite from '@/components/Header-white/Header-white'
import GoTop from '@/components/GoTop/GoTop'
export default {
  created () {
    this.changeProArray = this.allPro
  },
  data () {
    return {
      // 当前循环的数组(是否筛选)
      changeProArray: [],
      // 激活的筛选项下标
      ActiveCategoryIndex: -1
    }
  },
  components: {
    HeaderWhite,
    GoTop
  },
  computed: {
    // 控制筛选栏显示隐藏的变量
    ScreeningBol () {
      return this.$store.state.ScreeningBol
    },
    // 全部商品
    allPro () {
      return this.$store.state.allPro
    },
    // 分类数据
    classifys () {
      return this.$store.state.classifys
    }
  },
  methods: {
    // 改变筛选栏显示隐藏事件
    changeScreeningBol () {
      this.$store.dispatch('changeScreeningBol')
    },
    // 重置筛选按钮事件
    reset () {
      console.log('重置筛选(无筛选状态)')
      this.$store.dispatch('changeScreeningBol')
      this.ActiveCategoryIndex = -1
      this.changeProArray = this.allPro
    },
    // 确定筛选按钮事件
    ensure () {
      if (this.ActiveCategoryIndex === -1) {
        this.$store.dispatch('changeScreeningBol')
        console.log('您没有选择筛选项')
      } else {
        let index = this.ActiveCategoryIndex
        console.log('您选择的筛选项是: ' + this.classifys[index].classifys_title)
        this.changeProArray = this.classifys[index].products
        // console.log(this.changeProArray)
        this.$store.dispatch('changeScreeningBol')
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
.cake_main {
    width: 100%;
    margin: 3.5rem 0 6rem 0;
    // 蛋糕商品列表
    .cake_ul {
      list-style: none;
      li {
        width: 100%;
        margin-bottom: 1rem;
        .cake_img {
          position: relative;
        }
        .cake_Name {
          margin: 1rem 0 0 0;
          text-indent: 1rem;
          color: #333;
          width: 80%;
          font-size: 1.1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
          .cake_EName {
            font-size: 0.9rem;
            color: #666;
            text-indent: 1rem;
            display: inline-block;
          }
        }
        .sales_labels {
          font-size: 0.9rem;
          padding: 2px 4px;
          background: #ff4001;
          color: #fff;
          margin-left: 1rem;
        }
        .cake_price {
          position: absolute;
          right: 1.5rem;
          top: 108%;
          font-size: 1.1rem;
          color: #fd4f00;
        }
      }
    }
    // cake页底部
    .no_more_cake {
      text-align: center;
      color: #a1a1a1;
      font-size: 1.1rem;
    }
    // 筛选div
    .screening_div {
      width: 0%;
      height: 100%;
      position: fixed;
      top: 0;
      background: #fff;
      z-index: 100;
      right: 0;
      transition: all 0.3s;
      h4 {
        height: 3rem;
        line-height: 3rem;
        font-size: 1.2rem;
        color: #a38d6b;
        border-bottom: 0.1rem solid #a38d6b;
        text-indent: 1.5rem;
        font-weight: normal;
        margin: 0;
      }
      .screening_value_ul {
        list-style: none;
        li {
          float: left;
          font-size: 0.9rem;
          padding: 0.3em 0.8rem;
          border: 1px solid #eee;
          color: #a1a1a1;
          margin: 0rem 0.3rem 0.8rem 0.9rem;
        }
        .border {
         border: 1px solid #a38d6b;
        }
      }
      .screening_title {
        width: 100%;
        height: 2rem;
        font-size: 1.2rem;
        margin-top: 5%;
        line-height: 2rem;
        float: left;
        text-indent: 1.5rem;
        margin-bottom: 1rem;
      }
      // 筛选2个按钮
      .screening_two_button {
        width: 100%;
        height: 3.2rem;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 100;
        border-top: 1px solid #a38d6b;
        padding: 0;
        .reset_button, .determine_button {
          width: 50%;
          height: 100%;
          float: left;
          text-align: center;
          line-height: 3.2rem;
          color: #a38d6b;
          font-size: 1.2rem;
        }
        .determine_button {
          background: #e66119;
          color: #fff;
        }
      }
    }
    // 筛选伪背景
    .screening_bg {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      background: #424242;
      z-index: 10;
      opacity: 0.7;
    }
}
.width {
  width: 70% !important;
}
.go_top {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  position: fixed;
  bottom: 7rem;
  line-height: 3rem;
  text-align: center;
  right: 1rem;
  background: #fff;
  border: 1px solid #e0e0e0;
  font-size: 2rem;
  transform: rotate(180deg);
  opacity: 0.8;
}
</style>

