<template>
  <div>
    <div class="user-info oh">
      <div class="user-img fl">
        <img src="@/assets/index/user.jpg" />
      </div>
      <div class="fl m-t-30 m-l-30 t-l">
        <div class="user-name f-36 onelist-hidden">{{info.name}}</div>
        <div class="sign m-t-10 f-22 onelist-hidden">个性签名：{{info.sign}}</div>
      </div>
    </div>
    <div class="myorder oh">
      <div class="fl">
        <i class="f-32">我的订单</i>
      </div>
      <div class="fr">
        <i class="f-28 col-9">全部订单</i>
        <em>></em>
      </div>
    </div>
    <div class="tabbar">
      <div v-for="(item, index) in tabList" :key="index" class="tab">
        <img :src="item.imgUrl" alt="">
        <div class="f-26 col-9">{{item.name}}</div>
      </div>
    </div>
    <div class="mydesign oh col-9">
      <div class="fl">
        <i class="f-28">我的设计作品</i>
      </div>
      <div class="fr">
        <i class="f-24">编辑</i>
      </div>
    </div>

    <!-- 作品列表 -->
    <goodList :artList="artList"></goodList>
  </div>
</template>

<script>
import goodList from '@/components/goodList.vue'
export default {
  components: {
    goodList: goodList
  },
  data () {
    return {
      info: {
        name: 'sunny',
        sign: '',
        imgUrl: require('@/assets/index/user.jpg')
      },
      tabList: [
        {
          name: '待付款',
          imgUrl: require('@/assets/images/order/icon1.png')
        }, {
          name: '待收货',
          imgUrl: require('@/assets/images/order/icon2.png')
        }, {
          name: '待评价',
          imgUrl: require('@/assets/images/order/icon3.png')
        }, {
          name: '退款/售后',
          imgUrl: require('@/assets/images/order/icon4.png')
        }
      ],
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
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  $color-33: #333;
  .user-info{
    padding: 0.29rem 0.6rem 0rem;
  }
  .user-img{
    height: 1.14rem;
    width: 1.14rem;
    border-radius: 100%;
    overflow: hidden;
    &>img{
      width: 100%;
    }
  }
  .myorder{
    padding: 0.44rem 0.6rem;
    line-height: 100%;
  }
  .tabbar{
    padding: 0 0.8rem 0.44rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1rem solid $color-33;
    .tab{
      &>img{
        margin-bottom: 0.06rem;
        height: .9rem;
        width: .9rem;
      }
    }
  }
  .mydesign{
    padding: 0.27rem 0.8rem;
  }
</style>
