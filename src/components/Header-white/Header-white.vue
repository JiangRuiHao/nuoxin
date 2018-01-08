<template>
  <div class="header-white">
    <div class="head_title">
      <!-- 定位 -->
      <div class="localize" @click="Locate_address_Bol = !Locate_address_Bol">
        <span class="glyphicon glyphicon-map-marker"></span>
        {{glyphicon}}
      </div>
      <p class="nuo_xin" v-show="nuo_xin_Bol">诺心LECAKE</p>
      <!-- 两个按钮 -->
      <div class="two_button" v-show="two_button_Bol">
        <router-link to="/cake" class="button_cake" :class="{ActiveButton: ActiveBol}">蛋糕馆</router-link>
        <router-link to="/gift" class="button_gift" :class="{ActiveButton: !ActiveBol}">礼品馆</router-link>
      </div>
      <!-- 筛选按钮(图标还没找到合适的,先暂替代) -->
      <div class="button_screening" v-show="button_screening_Bol" @click="changeScreeningBol">
        <span class="glyphicon glyphicon-map-marker"></span>
        筛选
      </div>
      <!-- 定位地址div -->
      <div class="Locate_address_div" v-show="Locate_address_Bol">
        <div class="address_detail">
          <h5>配送至</h5>
          <p class="Locate_city">当前定位城市 :</p>
          <div class="city_list">
              <div class="more_city">更多城市</div>
              <span class="city_name" v-for="(item, index) in citys" :key="index" :class="{color_brown: ActiveCityIndex === index}"
               @click="changeActiveCityIndex(item, index)">{{item.city}}</span>
          </div>
        </div>
      </div>
      <!-- 定位地址伪背景 -->
      <div class="address_bg" v-show="Locate_address_Bol" @click="Locate_address_Bol = !Locate_address_Bol"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['nuo_xin_Bol', 'two_button_Bol', 'button_screening_Bol', 'ActiveBol'],
  data () {
    return {
      // 控制定位地址显示隐藏
      Locate_address_Bol: false,
      // 控制激活的定位城市下标
      ActiveCityIndex: -1
    }
  },
  methods: {
    changeScreeningBol () {
      this.$store.dispatch('changeScreeningBol')
    },
    changeActiveCityIndex (item, index) {
      this.ActiveCityIndex = index
      this.$store.dispatch('changeGlyphicon', item)
      this.Locate_address_Bol = !this.Locate_address_Bol
    },
    top () {
      console.log(document.documentElement.scrollTop)
    }
  },
  computed: {
    citys () {
      return this.$store.state.citys
    },
    glyphicon () {
      return this.$store.state.glyphicon
    }
  }
}
</script>

<style lang="less" scoped>
.head_title {
    float: left;
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: #fff;
    border-bottom: 0.1rem solid #d1c6af;
    font-size: 0.9rem;
    color: #a38d6b;
    // 定位
    .localize {
        width: 20%;
        height: 100%;
        float: left;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        line-height: 3.5rem;
    }
    // 诺心LECAKE
    .nuo_xin {
        width: 100%;
        height: 100%;
        text-align: center;
        color: #f00;
        font-weight: bold;
        font-style: italic;
    }
    // 两个按钮(蛋糕馆,礼品馆)
    .two_button {
        width: 50%;
        height: 100%;
        margin-left: 25%;
        background: #fff;
        text-align: center;
        float: left;
        a:hover, a:active {
            text-decoration: none;
            color: #fd4f00;
        }
        .button_cake, .button_gift {
            width: 50%;
            height: 100%;
            float: left;
            color: #fd4f00;
        }
        .ActiveButton {
            background: #f9f9f9;
        }
    }
    // 筛选按钮
    .button_screening {
        width: 20%;
        float: right;
        text-align: center;
    }
    // 定位地址div
    .Locate_address_div {
        width: 70%;
        // height: 20rem;
        background: #fff;
        margin-left: 15%;
        z-index: 12;
        position: fixed;
        top: 10%;
        border-radius: 5px;
        font-size: 1rem;
        .address_detail {
            width: 100%;
            h5 {
                width: 100%;
                text-align: center;
                color: #515151;
                font-size: 1rem;
            }
            .Locate_city, .more_city {
                text-indent: 2rem;
                font-size: 1.1rem;
                color: #9b9b9b;
                margin: 0;
            }
            .city_list {
                width: 100%;
            }
            .city_name {
                width: 25%;
                float: left;
                text-align: center;
                font-size: 1.1rem;
                color: #515151;
            }
            .color_brown {
                color: #a38d6b;
            }
        }
    }
    // 定位地址伪背景
    .address_bg {
        width: 100%;
        height: 100%;
        background: #424242;
        position: fixed;
        z-index: 11;
        top: 0;
        opacity: 0.7;
    }
    .gotop {
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
}
</style>

