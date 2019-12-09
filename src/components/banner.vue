<template>
  <div class="banner">
    <van-swipe :autoplay="autoplay" :indicator-color="indicatorColor">
      <van-swipe-item v-for="(image, index) in imgList" :key="index" >
        <img :src="image"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  name: 'banner',
  props: {
    imgList: Array,
    indicatorColor: {
      type: String,
      default: 'white'
    },
    autoplay: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .banner{
    height: 100%;
    overflow: hidden;
  }
</style>
<style>
  .van-swipe{
    width: 100%;
    height: 100%;
  }
  .van-swipe-item{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .van-swipe-item>img{
    display: block;
    width: 100%;
  }
  .van-swipe__indicators{
    left: 100%;
    transform: translateX(-0.73rem);
  }
</style>
