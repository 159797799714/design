<template>
  <div class="content dis-flex flex-box flex-dir-col flex-x-between">
    <div class="center-main">
      <router-view></router-view>
    </div>
    <div class="footerNav dis-flex">
      <div v-for="(item, index) in tabList" :key="index" :class="{'navLi col-9': true, selected: index === selectIndex}" @click="clickFooter(index)">
        <img :src="index === selectIndex ? item.icon2: item.icon1" class="icon"/>
        <h3 class="f-20"> {{ item.title}} </h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabList: [
        {
          title: '首页',
          name: 'index',
          icon1: require('@/assets/images/tabbar/index1.png'),
          icon2: require('@/assets/images/tabbar/index2.png')
        }, {
          title: '定制',
          name: 'design',
          icon1: require('@/assets/images/tabbar/design1.png'),
          icon2: require('@/assets/images/tabbar/design2.png')
        }, {
          title: '购物车',
          name: 'shopcar',
          icon1: require('@/assets/images/tabbar/shopcar1.png'),
          icon2: require('@/assets/images/tabbar/shopcar2.png')
        }, {
          title: '我的',
          name: 'mine',
          icon1: require('@/assets/images/tabbar/mine1.png'),
          icon2: require('@/assets/images/tabbar/mine2.png')
        }
      ],
      selectIndex: 0
    }
  },
  mounted () {
    let that= this,
      name= this.$route.name
    this.tabList.map((item, index) => {
      if(item.name === name) {
       that.selectIndex= index
      }
    })
  },
  beforeUpdate() {
    let that= this,
      name= this.$route.name
    this.tabList.map((item, index) => {
      if(item.name === name) {
       that.selectIndex= index
      }
    })
  },
  methods: {
    clickFooter (index) {
      this.$router.push({ name: this.tabList[index].name })
      this.selectIndex = index
    }
  }

}
</script>

<style lang="scss" scoped>
.content{
  .head-title{
    height: .44rem;
    width: 100%;
    line-height: .44rem;
    text-align: center;
    color: #000000;
    font-size: .19rem;
    font-weight: bold;
  }
  .center-main{
    flex: 1;
    overflow: auto;
  }
  .footerNav{
    height: 1.12rem;
    .navLi{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .icon{
        height: .42rem;
        width: .42rem;
        margin: 0 auto 0.1rem;
      }
    }
  }
  .selected{
    color: #fff;
  }
}
</style>
