<template>
  <div class="container t-l col-9">
    <!-- <div class="topBar b-13 col-f f-38 t-l flex-x-between">
      <i class="font-30">编辑</i>
    </div> -->
    <div v-if="goodList.length > 0" class="border-box">
      <div v-for="(item, index) in goodList" :key="index" class="store bg-white">
        <div class="brand dis-flex t-l f-28 col-9">
          <input type="radio" :value="item.brand_id" class="radio-btn"/>
          <div class="brand-name" @click="goDetail">
            <div class="f-28 col-9">{{item.brand}}</div>
          </div>
        </div>
        <div v-for="(good, num) in item.goodArr" :key="num" :class="{'item f-44': true, 'b-top': num !== 0}">
          <div class="left-box">
            <input type="radio" :value="good.goods_sku_id" class="radio-btn item-radio"/>
            <div class="img" @click="goDetail">
              <img :src="good.goods_image" />
            </div>
          </div>
          <div class="right-box">
            <div class="good-name f-26 twolist-hidden" @click="goDetail">{{ good.goods_name }}</div>
            <div class="foot f-30">
              <i class="price col-fof">￥{{ good.goods_price }}</i>
              <div class="control-num m-t-10 t-r">
                <i class="cart" @click="controlNum(good, num, 'cut')">-</i>
                <span class="num t-c b-9 f-24 col-13">{{ good.total_num }}</span>
                <i class="add" @click="controlNum(good, num, 'add')">+</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="checked_sum > 0 && list[0].goodArr.length > 0 || isEdit" class="settle dis-flex flex-x-between p-fix border-box t-center bg-white">
      <div class="all_radio_btn font-26" @click="selAllRadio">
        <radio value="all" :checked="all_checked" color="#F4433D" />全选
      </div>
      <div v-if="!isEdit" class="all col-3d font-36">
        <i class="font-26 col-66">总计：</i>￥{{ total_price }}
      </div>
      <div v-if="!isEdit" class="settle-btn font-30 col-f bg-3d" @click="toSureOrder">去计算({{ checked_sum }})</div>
      <div v-if="isEdit" class="settle-btn font-30 col-f bg-13" @click="delGood">删除</div>
    </div> -->
    <!-- 购物车为空 -->
    <div v-if="goodList.length < 1" class="blank font-99">
      <i class="iconfont font-160">&#xe715;</i>
      <div class="font-36 font-99 t-center">空空如也~</div>
      <div class="shopping my-button font-30" @click="goShopping">去购物</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEdit: false,
      goodList: [{
        brand: '即刻定制',
        brand_id: 'aaa',
        goodArr: [{
          goods_image: require('@/assets/index/user.jpg'),
          goods_name: '方法哦就更尔股份偷耳机哦机构按规范奇偶估计够呛·',
          goods_price: 1888,
          total_num: 2,
          goods_sku_id: 1111
        }, {
          goods_image: require('@/assets/index/user.jpg'),
          goods_name: '方法哦就更尔股份偷耳机哦机构按规范奇偶估计够呛·',
          goods_price: 1888,
          total_num: 2,
          goods_sku_id: 2222
        }]
      }]
    }
  },
  methods: {
    goDetail () {
      console.log('点击了进入详情')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 0 0.3rem;
  }
  .radio-btn {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    margin-right: 0.24rem;
  }
  // 单选框默认样式修改
  input[type="radio"]{
   position: relative;
  }
  .item-radio{
    top: 50%;
    transform: translateY(-50%);
  }

  input[type="radio"]::before {
    content: ""; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    width: .32rem;
    height: .32rem;
    box-sizing: border-box;
    margin-right: .24rem;
    border-radius: 50%;
    border: 2px solid #999;
    background: #131313;
    text-indent: 0.15rem;
    line-height: 1;
  }
  input[type="radio"]:checked::after {
    content: '✓';
    position: absolute;
    left: 0;
    top: 0;
    background-clip: content-box;
    width: .32rem;
    height: .32rem;
    text-align: center;
    line-height: 0.32rem;
    background-color: #ff00ff;
    border-radius: 100%;
    color: #131313;
    box-sizing: border-box;
    // padding: .02rem;
  }
  .item {
    display: flex;
    margin-bottom: .06rem;
    padding-top: .35rem;

    .left-box {
      display: flex;
      .img {
        height: 1.8rem;
        width: 1.8rem;
        overflow: hidden;
        &>img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .right-box {
      flex: 1;
      margin-left: .3rem;

      .good-name {
        height: 1rem;
        margin-top: -0.05rem;
        line-height: .36rem;
        white-space: wrap;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .control-num{
        line-height: 1;
        .cart,.add{
          display: inline-block;
          padding: 0 .1rem;
        }
        .num{
          display: inline-block;
          height: .4rem;
          width: .7rem;
          border-radius: .05rem;
          line-height: .4rem;
        }
      }

      // .foot {
      //   margin-top: .27rem;
      //   height: .4rem;
      //   display: flex;
      //   justify-content: space-between;

      //   .price {
      //     margin-top: 14rem;
      //     font-weight: bold;
      //     line-height: 26rem;
      //   }

      //   .num {
      //     display: flex;
      //     height: 40rem;
      //     font-size: $font-24;
      //     text-align: center;
      //     line-height: 40rem;
      //     justify-content: flex-end;

      //     &>text {
      //       height: 40rem;
      //       width: 70rem;
      //       background: $color-f5;
      //     }

      //     .icon {
      //       height: 40rem;
      //       width: 50rem;
      //       text-align: center;

      //       .iconfont {
      //         font-size: $font-24;
      //       }
      //     }
      //   }
      // }
    }
  }
</style>
