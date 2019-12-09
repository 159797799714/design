<template>
  <div class="my-picker">
    <div class="pick-main" ref="main" :style="{'top': top + 'px'}" @mousedown="clickDowm"
        @touchstart="clickDowm" @mousemove="move" @touchmove="move" @mouseup="end">
      <div v-for="(item, index) in selectNav" :key="index" class="navLi" ref="navLi" :style="{'font-family': item.font}"  >{{item.font_name}}</div>
    </div>
    <div class="border-center"></div>
  </div>
</template>

<script>
  export default {
    name: 'my-picker',
    props: {
      selectNav: Array
    },
    data () {
      return {
        top: 0,
        clientHeight: '',
        itemHeight: '',
        pageY_default: '',
        pageY_new: '',
        time: 0
      }
    },
    mounted() {
      console.log(this.$refs.main.clientHeight)
      console.log(this.$refs.navLi[0].clientHeight)
      this.clientHeight = this.$refs.main.clientHeight
      this.itemHeight = this.$refs.navLi[0].clientHeight
    },
    methods: {
      // 过滤
      touch: function (event) {
        let touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        return touch
      },
      // 点击按住
      clickDowm () {
        let touch= this.touch(event)
        let oy
        console.log('点击了', touch, !this.pageY_default)
        if(!this.pageY_default) {
          this.pageY_default = touch.pageY
          oy = touch.pageY
        } else {
          oy = touch.pageY - this.pageY_default
        }
        this.pageY_new = touch.pageY
        // this.top = oy
         
      },
      // 鼠标移动或者手指移动
      move () {
        let touch= this.touch(event)
        // console.log('移动了', touch)
        let oy
        if(this.pageY_default) {
          oy = touch.pageY - this.pageY_default
        } else {
          oy = touch.pageY - this.pageY_new
        }
        
        console.log(oy)
        this.top = oy
      },
      end () {
        let touch= this.touch(event)
        console.log('结束了', touch)
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-picker{
    position: relative;
    max-height: 2.4rem;
    width: 100%;
    overflow: hidden;
    .pick-main{
      position: relative;
      height: 100%;
      width: 100%;
      z-index: 10;
      // transition: 500ms ease;
      .navLi {
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
      }
    }
    .border-center{
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      height: 0.8rem;
      width: 100%;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
</style>
