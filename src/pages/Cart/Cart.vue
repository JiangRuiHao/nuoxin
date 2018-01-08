<template>
  <div class="cake">
    <div class="cake_main">
      <!-- 购物后没有商品时 -->
      <div class="no_Pro_div" v-show="!cartsShowBol">
        <img src="./images/empty.png" width="20%" class="no_pro_img">
        <p class="prompting">您还没有选购您的商品~</p>
        <!-- 推荐商品列表 -->
        <div class="cart_recommend">
          <div class="recommend_title">
            <p>推荐商品</p>
            <p>Sinerely Recommend</p>
          </div>
          <ul class="cart_recommend_ul" id="cart_recommend_ul">
            <router-link tag="li" :to="'/product-particulars/' + item.product_id" v-for="(item, index) in recommendPro" :key="item.product_id">
              <img v-lazy="item.imgs.big" width="100%">
              <p class="cake_Name">{{item.proName}}<span class="add_cake" @click.stop="add(item)">＋</span></p>
              <p class="cake_EName">{{item.proEName}}</p>
            </router-link>
          </ul>
        </div>
      </div>

      <!-- 购物后有商品时 -->
      <div class="have_Pro_div" v-show="cartsShowBol">
        <!-- 购物车商品列表 -->
        <ul class="cake_ul">
          <li v-for="(item, index) in carts" :key="item.product_id">
            <span class="check_button" :class="{select: item.selected}" @click="switchSelect(item)"></span>
            <img :src="item.imgs.big">
            <span class="cake_Name_h">{{item.proName}}</span>
            <span class="cake_EName_h" :class="{newStyle: item.giftProENameBol}">{{item.proEName}}</span>
            <span class="tableware" :class="{jpPrice: item.newClass}">{{item.thing1}}<span class="cakePrice">￥{{item.proPrice}}</span></span>
            <span class="candle" :class="{jpOldPrice: item.newClass}">{{item.thing2}}<span class="OldcakePrice">￥{{item.proPrice}}</span></span>
            <div class="add_sub_del_div" :class="{jpAddSubDel: item.newClass}">
              <div class="sub el-icon-minus" v-show="!item.proDelBol" @click.stop="sub(item)"></div>
              <div class="del el-icon-delete" v-show="item.proDelBol" @click.stop="del(item)"></div>
              <div class="add el-icon-plus" @click.stop="add(item)"></div>
              <div class="cake_pro_num">{{item.proNum}}</div>
            </div>
            <div class="wish" v-show="item.wishBol">
              <div class="birthday_card"><span></span>生日牌</div>
              <div class="birthday_wishes" @click="birthdayBlessing(item)">{{item.blessing}}</div>
            </div>
            <!-- 切成9份 -->
            <div class="cut" v-show="item.cut9Bol">
              <div class="cut_9"><span></span>切分 - 9份</div>
              <span class="cut_button"></span>
            </div>
          </li>
        </ul>
        <!-- 精品推荐 -->
        <div class="accessories">
          <p>精品配件</p>
          <p>The Accessories</p>
          <div class="accessories_pro_div">
            <ul class="accessories_pro_ul">
              <li v-for="(item, index) in boutiquePro" :key="item.product_id" @click="add(item)">
                <img v-lazy="item.imgs.big" width="100%">
                <p class="accessories_Name">{{item.proName}}</p>
                <p class="accessories_price">￥{{item.proPrice}}<span class="add_accessories">＋</span></p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 结算栏 -->
        <div class="clearing_div">
          <span class="select_all" :class="{'select_all-true': isAllSelect, 'select_all-false': !isAllSelect}" @click="allSelected()"></span>
          <span class="AllCheck">全选</span>
          <div class="accounts">
            <span class="total">￥{{total.toFixed(2)}}</span>
            <div class="account_button" @click="goAccount()">结算</div>
          </div>
        </div>
        <!-- 选择生日祝福的div -->
        <div class="wish_div" :class="{width: wishDivShowBol}">
          <div class="rrp2">
            <span class="el-icon-arrow-left back" @click="goBack()"></span>
            生日牌
          </div>
          <div class="greeting">
            <div class="greeting_title">祝福语</div>
              <div class="wishInput">
                <input type="text" placeholder="自定义祝福语" class="input" v-model="customWish">
                <span class="confirm" @click="confirm()">确定</span>
              </div>
            <div class="shortcut input" @click="shortcut1()">{{wish1}}</div>
            <div class="shortcut input" @click="shortcut2()">{{wish2}}</div>
            <div class="shortcut input" @click="shortcut3()">{{wish3}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wishDivShowBol: false,
      wish1: '无',
      wish2: '生日快乐~',
      wish3: 'Happy Birthday',
      customWish: '',
      product_id: ''
    }
  },
  computed: {
    boutiquePro () {
      return this.$store.state.boutiquePro
    },
    recommendPro () {
      return this.$store.state.recommendPro
    },
    userInfo () {
      let userInfo = this.$store.state.userInfo
      if (userInfo.id) {
        return userInfo
      } else {
        userInfo.selectedSite = {}
        return userInfo
      }
    },
    // 购物车中的数据
    carts () {
      return this.$store.state.carts
    },
    cartsShowBol () {
      return this.$store.state.cartsShowBol
    },
    isAllSelect () {
      return this.$store.getters.isAllSelect
    },
    total () {
      return this.$store.getters.total
    },
    // 购物车勾选的商品数据
    cartsSelectPro () {
      return this.$store.state.cartsSelectPro
    },
    glyphicon () {
      return this.$store.state.glyphicon
    }
  },
  methods: {
    add (item) {
      if (this.userInfo.id) {
        this.$store.dispatch('addPro', item)
      } else {
        // console.log('没有用户登录时添加商品(不操作数据库的)')
        this.$store.dispatch('no_user_add', item)
      }
    },
    sub (item) {
      // this.$store.dispatch('subPro', item)
      if (this.userInfo.id) {
        // console.log('有用户登录时减少商品(操作数据库的)')
        this.$store.dispatch('subPro', item)
      } else {
        // console.log('没有用户登录时添加商品(不操作数据库的)')
        this.$store.dispatch('no_user_sub', item)
      }
    },
    // 删除商品事件
    del (item) {
      if (this.userInfo.id) {
        this.$msg({
          title: '提示',
          message: '是否移除该商品?',
          showCancelButton: true
        })
          .then(res => {
            if (res === 'cancel') {
            } else {
              this.$store.dispatch('delPro', item)
            }
          })
      } else {
        this.$msg({
          title: '提示',
          message: '是否移除该商品?',
          showCancelButton: true
        })
          .then(res => {
            if (res === 'cancel') {
            } else {
              this.$store.dispatch('no_user_del', item)
            }
          })
      }
    },
    switchSelect (item) {
      // this.$store.dispatch('getCartsSelectPro')
      this.$store.dispatch('switchSelect', item)
    },
    allSelected () {
      // this.$store.dispatch('getCartsSelectPro')
      this.$store.dispatch('allSelected')
    },
    goBack () {
      this.$router.push('/cart')
      this.wishDivShowBol = false
    },
    // 生日祝福事件
    birthdayBlessing (item) {
        //   console.log(item.product_id)
        //   console.log(item)
      this.product_id = item.product_id
      this.wishDivShowBol = true
      this.customWish = ''
    },
    // 自定义祝福语的事件
    confirm () {
      let reg = /^.{0,15}$/
      if (!reg.test(this.customWish)) {
        this.$msg('提示', '祝福语限制在0-15个字符')
      } else {
        this.wishDivShowBol = false
        //   console.log(this.product_id)
        for (let i = 0; i < this.carts.length; i++) {
          if (this.carts[i].product_id === Number(this.product_id)) {
            if (this.customWish === '') {
              this.carts[i].blessing = this.carts[i].blessing
            } else {
              this.carts[i].blessing = this.customWish
            }
            break
          }
        }
        this.customWish = ''
      }
    },
    // 点击生日牌无的事件
    shortcut1 () {
      console.log('您没有选择祝福语,恢复初始')
      this.wishDivShowBol = false
      for (let i = 0; i < this.carts.length; i++) {
        if (this.carts[i].product_id === Number(this.product_id)) {
          this.carts[i].blessing = '填写生日祝福'
          break
        }
      }
    },
    // 点击生日牌生日快乐~事件
    shortcut2 () {
      this.wishDivShowBol = false
      for (let i = 0; i < this.carts.length; i++) {
        if (this.carts[i].product_id === Number(this.product_id)) {
          this.carts[i].blessing = this.wish2
          break
        }
      }
    },
    // 点击生日牌Happy Birthday事件
    shortcut3 () {
      this.wishDivShowBol = false
      for (let i = 0; i < this.carts.length; i++) {
        if (this.carts[i].product_id === Number(this.product_id)) {
          this.carts[i].blessing = this.wish3
          break
        }
      }
    },
    // 结算事件
    goAccount () {
      this.$store.dispatch('getCartsSelectPro')
      // console.log(this.cartsSelectPro)
      if (this.cartsSelectPro.length <= 0) {
        this.$msg('提示', '选择至少一样商品')
      } else if (this.glyphicon === '定位') {
        this.$msg({
          title: '提示',
          message: '您还没有定位',
          showCancelButton: true
        })
          .then(res => {
            if (res === 'cancel') {
            } else {
              this.$router.push('/')
            }
          })
      } else if (!this.userInfo.id) {
        // this.$router.push('/account')
        this.$msg('提示', '请登录')
          .then(res => {
            this.$router.push('/login')
          })
      } else {
        this.$router.push('/account')
      }
    }
  }
}
</script>

<style lang="less" scoped>
img[lazy=loading]{
  background: url("../../assets/loading.gif") center center no-repeat;
  -webkit-background-size: 2rem 2rem;
  background-size: 2rem 2rem;
}
.cake_main {
    width: 100%;
    margin-bottom: 5.5rem;
    // 没有商品时的样式
    .no_Pro_div {
      width: 100%;
      text-align: center;
      .no_pro_img {
        margin: 20% 0 1rem 0;
      }
      .prompting {
        font-size: 1rem;
        color: #9c9c9c;
      }
      .cart_recommend {
        width: 90%;
        margin: 10% 0 0 5%;
        border-top: 1px solid #d1c6af;
        .recommend_title {
          line-height: 1.5rem;
          font-size: 1rem;
          padding-top: 1rem;
          color:#a38d6b;
          text-align: center;
          p {
            margin: 0;
          }
        }
        // 推荐商品列表样式
        .cart_recommend_ul {
          margin-top: 1rem;
          list-style: none;
          text-align: left;
          font-size: 0;  
          li {
            width: 48%;
            display: inline-block;
            margin:0 4% 2% 0;
            img {
              margin-bottom: 0.5rem;
            }
            .cake_Name {
              margin: 0;
              font-size: 1rem;
              color: #444;
              .add_cake {
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                background: orangered;
                color:#fff;
                text-align: center;
                line-height: 1.2rem;
                font-size: 1rem;
                float: right;
              }
            }
            .cake_EName {
              margin: 0;
              font-size: 1rem;
            }
          }
        }
      }
    }
    #cart_recommend_ul > li:nth-child(2n) {
      margin-right: 0;
    }
    // 有商品时的样式
    .have_Pro_div {
      // 购物车商品列表
      .cake_ul {
        width: 100%;
        list-style: none;
        li {
          position: relative;
          width: 90%;
          margin: 5%;
          border-bottom: 1px solid #ff4001;
          .check_button {
            display: inline-block;
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
            border: 1px solid #9c9c9c;
          }
          .select {
            background-image: url('./images/checkbox-selectd.png');
            background-size: contain;
            border: none;
          }
          img {
            width: 35%;
            height: 8rem;
            margin: 0 5% 5% 2%;
          }
          .cake_Name_h {
            font-size: 1rem;
            position: absolute;
            left: 48%;
            top: 1%;
            color: #3e3e3e;
          }
          .cake_EName_h {
            font-size: 1rem;
            position: absolute;
            left: 48%;
            top: 8%;
            color: #9c9c9c;
          }
          .newStyle {
            top: 14%;
          }
          .tableware {
            width: 51%;
            font-size: 1rem;
            position: absolute;
            left: 48%;
            top: 16%;
            color: #9c9c9c;
          }
          .jpPrice {
            top: 30%;
          }
          .candle {
            width: 51%;
            font-size: 1rem;
            position: absolute;
            left: 48%;
            top: 24%;
            color: #9c9c9c;
          }
          .jpOldPrice {
            top: 40%;
          }
          .cakePrice {
            float: right;
            color: #ff4001;
          }
          .OldcakePrice {
            float: right;
            text-decoration: line-through;
          }
          .add_sub_del_div {
            width: 52%;
            height: 2.5rem;
            position: absolute;
            right: 0;
            top: 35%;
            font-size: 1rem;
            .sub, .del {
              width: 30%;
              height: 100%;
              background: #f9f9f9;
              line-height: 2.5rem;
              text-align: center;
              color: #a38d6b;
            }
            .sub {
              float: left;
            }
            .add {
              width: 30%;
              height: 100%;
              float: right;
              background: #f9f9f9;
              text-align: center;
              line-height: 2.5rem;
              color: #a38d6b;
            }
            .cake_pro_num {
              width: 40%;
              height: 100%;
              background: #fff;
              float: right;
              font-size: 1rem;
              text-align: center;
              line-height: 2.5rem;
            }
          }
          .jpAddSubDel {
            top: 58%;
          }
          .wish, .cut {
            width: 95%;
            height: 3rem;
            background: #f9f9f9;
            margin:0 0 1% 5%;
            font-size: 1rem;
            position: relative;
            .birthday_card, .cut_9 {
              width: 40%;
              height: 100%;
              font-size: 1rem;
              line-height: 3rem;
              text-align: center;
              color: #424242;
              float: left;
            }
            .birthday_wishes {
              width: 60%;
              height: 100%;
              font-size: 1rem;
              color:#9c9c9c;
              line-height: 3rem;
              text-align: left;
              text-indent: 1.5rem;
              float: right;
            }
          }
          .cut {
            background: #fff;
            display: flex;
            align-items: center;
            .cut_button {
              width: 1.1rem;
              height: 1.1rem;
              border: 1px solid #ccc;
              position: absolute;
              right: 0.1rem;
            }
          }
        }
      }
      // 精品推荐
      .accessories {
        width: 90%;
        margin-left: 5%;
        text-align: center;
        font-size: 1rem;
        border-top: 1px solid #d1c6af;
        padding-top: 1.5rem;
        p {
          margin: 0;
          line-height: 1.5rem;
          color: #a38d6b;
        }
        .accessories_pro_div {
          margin-top: 5%;
          width: 100%;
          .accessories_pro_ul {
            list-style: none;
            overflow: hidden;
            overflow-x: auto;
            white-space: nowrap;
            li {
              width: 33%;
              display: inline-block;
              margin-right: 2%;
              .accessories_Name {
                font-size: 0.9rem;
                color: #000;
              }
              .accessories_price {
                width: 100%;
                color: #000;
                .add_accessories {
                  float: right;
                  margin-right: 10%;
                  width: 1.1rem;
                  height: 1.1rem;
                  background: orangered;
                  color: #fff;
                  text-align: center;
                  line-height: 1.1rem;
                }
              }
            }
          }
        }
      }
      // 结算栏
      .clearing_div {
          width: 100%;
          height: 4rem;
          float: left;
          display: flex;
          align-items: center;
          position: fixed;
          bottom: 4.5rem;
          left: 0;
          border-top: 1px solid #a38d6b;
          background: #fff;
          .select_all {
            width: 1.1rem;
            height: 1.1rem;
            box-sizing: border-box;
            display: block;
            box-sizing: border-box;
            border-radius: 50%;
            border: 1px solid #9c9c9c;
            margin-left: 3%;
            float: left;
          }
          .select_all-false{
            background-image: url("./images/checkbox.png");
            background-size: contain;  
            border: none;  
          }
          .select_all-true{
            background-image: url('./images/checkbox-selectd.png');
            background-size: contain;
            border: none;    
          }
          .AllCheck {
            font-size: 1rem;
            margin-left: 3%;
            color: #424242;
            float: left;
          }
          .accounts {
            width: 50%;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            .total {
              width: 50%;
              text-align: center;
              font-size: 1rem;
              line-height: 4rem;
              float: left;
              color: #ff4001;
            }
            .account_button {
              width: 50%;
              height: 100%;
              float: right;
              line-height: 4rem;
              font-size: 1rem;
              color: #fff;
              text-decoration: none;
              text-align: center;
              background: #ff4001;
            }
          }
      }
      // 选择生日祝福的div
      .wish_div {
        width: 0;
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 10;
        background: #f9f9f9;
        transition: all 0.3s;
        .rrp2 {
            width: 100%;
            height: 4rem;
            background: #fff;
            text-align: center;
            line-height: 4rem;
            font-size: 1rem;
            position: relative;
            border-bottom: 0.1rem solid #a38d6b;
            color: #a38d6b;
            .back {
              position: absolute;
              left: 0;
              width: 10%;
              height: 100%;
              line-height: 4rem;
              text-align: center;
              font-size: 1.1rem;
            }
        }
        .greeting {
            width: 100%;
            height: 20rem;
            margin-top: 1rem;
            border-top: 0.1rem solid #a38d6b;
            border-bottom: 0.1rem solid #a38d6b;
            background: #fff;
            .greeting_title {
              font-size: 1rem;
              width: 100%;
              height: 4rem;
              line-height: 4rem;
              text-align: center;
            }
            .wishInput {
              width: 60%;
              margin-left: 20%;
              border: 0.1rem solid #ededed;  
            }
            .input {
              width: 80%;
              height: 2.5rem;
              line-height: 2.5rem;
              font-size: 0.9rem;
              text-indent: 1rem;
              outline: none;
              border: none;
              color: #9c9c9c;
            }
            .confirm {
              float: right;
              width: 20%;
              height: 100%;
              font-size: 0.9rem;
              line-height: 2.5rem;
              text-align: center;
              color: #a38d6b;
            }
            .shortcut {
              width: 60%;
              margin-left: 20%;
              margin-top: 0.5rem;
              border: 0.1rem solid #ededed;
            }
        }
      }
    }
}
// 隐藏滚动条
::-webkit-scrollbar {
    width: 0;
    height: 0;
}
.width {
    width: 100% !important;
}
</style>

