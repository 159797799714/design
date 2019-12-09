<template>
  <div id="app">
    <div v-if="istitle" class="head-title b-00 f-38 col-f">{{ title }}</div>
    <div class="main b-00">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  // name: 'App',
  computed: {
    title: function () {
      if (this.$route.meta.title) {
        return this.$route.meta.title
      } else {
        return ''
      }
    },
    istitle: function () {
      if (!this.$route.meta.istitle) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  line-height: 1;
  .head-title{
    height: .88rem;
    width: 100%;
    line-height: .88rem;
    text-align: center;
  }
  .main{
    flex: 1;
    overflow: hidden;
    display: flex;
  }
}
</style>
