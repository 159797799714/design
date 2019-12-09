<template>
  <div :class="{'pop-main': true, 'show': !isshow}">
    <div class="pop-white" :style="{'background-color': blankbgcolor, 'opacity': blankOpacity}" @click="closePop"></div>
    <div class="pop-content" :style="{'background-color': bgcolor}">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pop',
  props: {
    isshow: {
      type: Boolean,
      default: false
    },
    blankbgcolor: {
      type: String,
      default: '#131313'
    },
    bgcolor: {
      type: String,
      default: '#131313'
    },
    blankOpacity: {
      type: Number,
      default: 0.5
    }
  },
  data () {
    return {

    }
  },
  methods: {
    closePop () {
      this.$emit('open', '')
    }
  }
}
</script>

<style lang="scss" scoped>
  .pop-main{
    position: fixed;
    top: 0;
    left:0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    transition: 1s;
    z-index: 10;
    .pop-white{
      flex: 1;
    }
    .pop-content{
      min-height: 2rem;
      max-height: 90%;
      width: 100%;
    }
  }
  .show{
    top: 100%;
    left: 0;
  }
</style>
