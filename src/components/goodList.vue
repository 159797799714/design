<template>
  <div class="artwork oh">
    <div v-for="(item, index) in artList" :key="index" class="art-item b-f t-l">
      <div class="good-img">
        <img :src="item.imgUrl"/>
      </div>
      <div class="good-name onelist-hidden f-24 col-13">{{item.goods_name}}</div>
      <div>
        <div class="sellpoint m-t-10 b-c3f f-24 col-f">{{item.sellpoint}}</div>
      </div>
      <div class="good-price m-t-10 f-24 col-f3c">粉丝价￥<i class="f-30 col-f3c">{{item.price}}</i></div>
      <div class="line-price m-t-10 f-18 col-9 t-line">{{item.line_price}}</div>
    </div>
  </div>
</template>

<script>
export default {
  neme: 'goodList',
  props: {
    artList: Array
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .artwork{
    padding-bottom: 0.3rem;
    .art-item{
      float: left;
      padding: .25rem .18rem;
      width: calc(50% - 0.45rem);
      box-sizing: border-box;
      margin: 0 0 .2rem .3rem;
      .good-img{
        height: 2.95rem;
        width: 100%;
        overflow: hidden;
        &>img{
          width: 100%;
          max-height: 100%;
        }
      }
      .sellpoint{
        display: inline-block;
        padding: .03rem .09rem;
        border-radius: .15rem;
        -webkit-transform-origin-x: 0;
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
        -mox-transform: scale(0.8);
      }
    }
  }
</style>
