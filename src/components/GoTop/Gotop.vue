<template>
  <div class="gotop el-icon-download" @click="gotop()" v-show="goTopBol"></div>
</template>

<script>
export default {
  data () {
    return {
      goTopBol: false
    }
  },
  methods: {
    gotop () {
      let top = document.documentElement.scrollTop
      var num = 150
      if (top >= 1500) {
        num = 400
      }
      var timer = setInterval(function () {
        top = top - num
        if (top <= 0) {
          top = 0
          clearInterval(timer)
        }
        document.documentElement.scrollTop = top
      }, 10)
    },
    menu () {
      // console.log(document.documentElement.scrollTop)
      if (document.documentElement.scrollTop >= 1000) {
        this.goTopBol = true
      } else {
        this.goTopBol = false
      }
    }
  },
  mounted () {
    // console.log(document.documentElement.scrollTop)
    window.addEventListener('scroll', this.menu)
  }
}
</script>

<style lang="less" scoped>
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
    border: 1px solid #cfcfcf;
    font-size: 2.1rem;
    transform: rotate(180deg);
    opacity: 0.8;
}
</style>

