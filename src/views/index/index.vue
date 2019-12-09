<template>
  <div class="content">
    <div class="swiper">
      <Banner :imgList="imgList" :autoplay="3000" :indicatorColor="'#fff'"></Banner>
    </div>

    <!-- 商品列表 -->
    <goodList :artList="artList"></goodList>
  </div>
</template>

<script>
import Banner from '@/components/banner.vue'
import goodList from '@/components/goodList.vue'
export default {
  components: {
    Banner: Banner,
    goodList: goodList
  },
  title: '首页',
  data () {
    return {
      imgList: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
      artList: [{
        imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        goods_name: '简欧风是奇偶及发家of积分简欧风是奇偶及发家of积分简欧风是奇偶及发家of积分',
        sellpoint: '底价促销',
        price: 1999,
        line_price: 2999
      }, {
        imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        goods_name: '简欧风是奇偶及发家of积分简欧风是奇偶及发家of积分简欧风是奇偶及发家of积分',
        sellpoint: '底价促销',
        price: 1999,
        line_price: 2999
      }, {
        imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        goods_name: '简欧风是奇偶及发家of积分简欧风是奇偶及发家of积分简欧风是奇偶及发家of积分',
        sellpoint: '底价促销',
        price: 1999,
        line_price: 2999
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    .swiper {
      height: 4.05rem;
      width: 100vw;
      margin-bottom: 0.3rem;
      box-sizing: border-box;
      padding: 0 0.3rem;
    }
  }
</style>
