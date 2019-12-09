<template>
  <div :class="{'type-box': true, 'border-99': isSelect}" ref="moveDiv" :style="{'transform': 'rotate(' + rotate + 'deg)', 'height': height + 'px', 'width': width + 'px'}" @mousedown="down" @touchstart="down" @mousemove="move" @touchmove="move" @mouseup="end"
    @touchend="end" @touchmove.prevent>
    <span v-if="isSelect" class="z-index" @click="controlLevel">层</span>
    <span v-if="isSelect" class="del" @click="delDom">删</span>
    <span v-if="isSelect" class="rotate" @mousedown="rotateDown" @touchstart="rotateDown" @mousemove="rotateMove" @touchmove="rotateMove" @mouseup="end" @touchmove.prevent>转</span>
    <span v-if="isSelect" class="expand" @mousedown="scaleDown" @touchstart="scaleDown" @mousemove="scaleMove" @touchmove="scaleMove" @mouseup="end" @touchmove.prevent>大</span>
    <slot name="content" />
  </div>
</template>

<script>
export default {
  name: 'pop',
  props: {
    isSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      flags: false, // 是否在拖拽中
      position: {
        x: 0,
        y: 0
      },
      nx: '',
      ny: '',
      dx: '',
      dy: '',
      xPum: '',
      yPum: '',

      rotate: 0,

      isRotate: false, // 是否在旋转中
      offsetX: '', // 可移动盒子距离左边的距离
      offsetY: '', // 可移动盒子距离顶部的距离
      clientWidth: '', // 可移动盒子宽度
      clientHeight: '', // 可移动盒子高度

      height: '', // 变化高度
      width: '', // 变化宽度

      isScale: false, // 是否在缩放
      scaleX: 1,
      scaleY: 1,     // 垂直方向缩放
      
      timer: null

    }
  },
  methods: {
    // 关闭
    controlLevel () {
      this.$emit('controlLevel', '')
    },
    // 取消选中
    close () {
      this.$emit('closeEdit', false)
    },
    // 实现整个盒子拖拽
    down () {
      console.log('点击了点击了点击了', this.timer)
      this.timer = null
      if (!this.isRotate && !this.isScale) {
        this.flags = true
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }

        this.position.x = touch.clientX
        this.position.y = touch.clientY
        this.dx = this.$refs.moveDiv.offsetLeft
        this.dy = this.$refs.moveDiv.offsetTop
      }
    },
    move () {
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }

        this.nx = touch.clientX - this.position.x
        this.ny = touch.clientY - this.position.y
        this.xPum = this.dx + this.nx
        this.yPum = this.dy + this.ny

        this.$refs.moveDiv.style.left = this.xPum + 'px'
        this.$refs.moveDiv.style.top = this.yPum + 'px'
        // 阻止页面的滑动默认事件
        document.addEventListener('touchmove', function () { // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
          // event.preventDefault(); //jq 阻止冒泡事件
          event.stopPropagation() // 如果没有引入jq 就用 stopPropagation()
        }, false)
      }
    },
    // 鼠标释放时候的函数
    end () {
      this.flags = false
      this.isRotate = false
      this.isScale = false
      this.timer = setTimeout(function () {
        this.close()
        console.log('执行了延时器')
      }.bind(this), 2000)
    },

    // 点击旋转
    rotateDown () {
      if (!this.flags && !this.isScale) {
        this.isRotate = true
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        console.log('222', touch, this.$refs.moveDiv.offsetLeft)
        this.offsetX = this.$refs.moveDiv.offsetLeft
        this.offsetY = this.$refs.moveDiv.offsetTop

        this.offsetX = this.$refs.moveDiv.offsetLeft
        this.offsetY = this.$refs.moveDiv.offsetTop
      }
    },
    rotateMove () {
      if (this.isRotate) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }

        var mouseX = touch.pageX // 计算出鼠标相对于画布顶点的位置,无pageX时用clientY + body.scrollTop - body.clientTop代替,可视区域y+body滚动条所走的距离-body的border-top,不用offsetX等属性的原因在于，鼠标会移出画布
        var mouseY = touch.pageY
        var ox = mouseX - this.offsetX - this.$refs.moveDiv.clientWidth / 2  // cx,cy为圆心
        var oy = mouseY - this.offsetY - this.$refs.moveDiv.clientWidth / 2
        var to = Math.abs(ox / oy)
        var angle = Math.atan(to) / (2 * Math.PI) * 360 // 鼠标相对于旋转中心的角度

        if (ox < 0 && oy < 0) { // 相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系
          angle = -angle
        } else if (ox < 0 && oy > 0) { // 左下角,3象限
          angle -= 180
        } else if (ox > 0 && oy < 0) { // 右上角，1象限
          
        } else if (ox > 0 && oy > 0) { // 右下角，2象限
          angle = 180 - angle
        }
        this.rotate = angle + 141

        // 阻止页面的滑动默认事件
        document.addEventListener('touchmove', function () { // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
          // event.preventDefault(); //jq 阻止冒泡事件
          event.stopPropagation() // 如果没有引入jq 就用 stopPropagation()
        }, false)
      }
    },

    // 点击缩放
    scaleDown () {
      if (!this.flags && !this.isRotate) {
        this.isScale = true
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.offsetX = touch.pageX
        this.offsetY = touch.pageY
        this.height = this.$refs.moveDiv.clientHeight
        this.width = this.$refs.moveDiv.clientWidth

        this.clientHeight = this.height
        this.clientWidth = this.width
      }
    },
    scaleMove () {
      if (this.isScale) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        console.log('333', touch.pageX, this.offsetX, touch.pageY)
        if(touch.pageX > this.offsetX) {
          this.width = touch.pageX / this.offsetX * this.clientWidth
        }
        if(touch.pageY > this.offsetY) {
          this.height = touch.pageY / this.offsetY * this.clientHeight
        }

        // 阻止页面的滑动默认事件
        document.addEventListener('touchmove', function () { // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
          // event.preventDefault(); //jq 阻止冒泡事件
          event.stopPropagation() // 如果没有引入jq 就用 stopPropagation()
        }, false)
      }
    },
    delDom () {
      console.log('点击了删除')
      this.$emit('delDom', null)
    }
  }
}
</script>

<style lang="scss" scoped>
  .type-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-1.12rem);
    height: 2.25rem;
    width: 2.25rem;
    border: 1px solid #fff;
  }
  .border-99{
    border: 1px dashed #999;
  }

  .z-index,
  .del,
  .expand,
  .rotate {
    display: block;
    height: 0.4rem;
    width: 0.4rem;
    border-radius: 100%;
    border: 0.01rem solid #999;
    color: #131313;
    text-align: center;
    font-size: 0.36rem;
    line-height: 0.4rem;
  }

  .z-index {
    position: absolute;
    left: -0.4rem;
    top: -0.4rem;
  }

  .del {
    position: absolute;
    right: -0.4rem;
    top: -0.4rem;
  }

  .expand {
    position: absolute;
    bottom: -0.4rem;
    right: -0.4rem;
  }

  .rotate {
    position: absolute;
    left: -0.4rem;
    bottom: -0.4rem;
  }
</style>
