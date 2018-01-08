<template>
  <div class="login">
    <input type="text" class="phone" placeholder="请输入您的手机号" v-model="phone" autofocus>
    <input type="text" class="yzm" placeholder="短信验证码" v-model="YZM">
    <el-button type="info" class="yzmBtn" @click="yzm()">{{check}}</el-button>
    <p class="title">首次使用手机号登录将自动为您注册</p>
    <div class="loginBtnDiv">
      <el-button type="danger" class="LoginBtn" @click="login()">登录LOGIN</el-button>
    </div>
    <div class="qqLogin">
      <div class="kuai">
        <p>快捷登录</p>
        <img src="./images/qq.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var newStr = ''
    for (let i = 0; i < 4; i++) {
      var num = parseInt(Math.random() * str.length)
      newStr += str.charAt(num)
    }
    this.check = newStr
  },
  data () {
    return {
      phone: '',
      check: '',
      YZM: ''
    }
  },
  methods: {
    login () {
      let reg = /^1[3578]\d{9}$/
      if (!reg.test(this.phone)) {
        this.$msg('提示', '手机号码有误')
        console.log(this.YZM, this.check)
      } else if (this.YZM !== this.check) {
        this.$msg('提示', '验证码有误')
      } else {
        this.$store.dispatch('login', this.phone)
        .then(res => {
          return this.$msg('提示', res)
        })
          .then(res => {
            this.$router.push('/')
          })
      }
    },
    yzm () {
      var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      var newStr = ''
      for (let i = 0; i < 4; i++) {
        var num = parseInt(Math.random() * str.length)
        newStr += str.charAt(num)
      }
      this.check = newStr
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    .phone {
        width: 90%;
        margin: 10% 0 0 5%;
        height: 2rem;
        border: none;
        text-indent: 1.3rem;
        border-bottom: 1px solid #a38d6b;
        font-size: 1rem;
        background: url('./images/ys.jpg') no-repeat left center;
        -webkit-background-size: auto 1rem;
        background-size: auto 1rem;
        outline: none;
    }
    .yzm {
        width: 65%;
        margin: 10% 0 0 5%;
        height: 2rem;
        border: none;
        text-indent: 1.3rem;
        border-bottom: 1px solid #a38d6b;
        font-size: 1rem;
        background: url('./images/phone.jpg') no-repeat left center;
        -webkit-background-size: auto 1rem;
        background-size: auto 1rem;
        outline: none;
    }
    .yzmBtn {
        width: 25%;
        padding: 0.6rem;
        font-size: 1.1rem;
    }
    .title {
        width: 100%;
        height: 1rem;
        margin-top: 5%;
        font-size: 0.8rem;
        color: #424242;
        text-indent: 8%;
        background: url('./images/xing.jpg') no-repeat 5% center;
        -webkit-background-size: auto 1rem;
        background-size: auto 1rem;
    }
    .loginBtnDiv {
        width: 100%;
        height: 10rem;
        margin-top: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .LoginBtn {
            font-size: 1rem;
            padding: 1rem 2rem;
        }
    }
    .qqLogin {
        width: 100%;
        height: 10rem;
        display: flex;
        margin-top: 5rem;
        justify-content: center;
        align-items: center;
        .kuai {
            text-align: center;
            line-height: 2rem;
            p {
                font-size: 1rem;
                color: red;
            }
            img {
                width: 2.5rem;
            }
        }
    }
}
</style>

