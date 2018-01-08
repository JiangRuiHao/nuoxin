<template>
  <div class="header-white2">
      <router-link to="/mine" class="el-icon-arrow-left back2"></router-link>
      {{title}}
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
  }
}
</script>

<style lang="less" scoped>
.header-white2 {
    width: 100%;
    height: 3.5rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 15;
    text-align: center;
    line-height: 3.5rem;
    font-size: 1rem;
    color: #a38d6b;
    border-bottom: 1px solid #d1c6af;
    background: #fff;
    .back2 {
        width: 10%;
        height: 100%;
        line-height: 3.5rem;
        text-align: center;
        position: absolute;
        left: 0;
        font-size: 1.1rem;
    }
    a {
        color: #a38d6b;
    }
}
a:hover, a:active {
    color: #a38d6b;
}
</style>

