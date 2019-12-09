<template>
  <div class="substance dis-flex flex-dir-col">
    <div class="flex-box" ref="imageDom" id="imageDom">
      <span class="close-btn dis-block f-60 col-9 f-w" @click="goBack" style="transform: rotate(45deg);">+</span>
      <!-- 可拖动弹窗 -->
      <drag v-for="(item, index) in dragList" :key="index" @controlLevel="openLevel" @closeEdit="closeEdit(index)" @delDom="delElement(index)" :isSelect="item.isSelect">
        <template v-slot:content>
          <div class="drag-content"  @mousedown="selectDrag(index)" @touchstart="selectDrag(index)">
            <img :src="item.imgurl" alt="">
          </div>
        </template>
      </drag>

      <div @click="clickGeneratePicture" class="m-t-10 b-f0f col-f">生成</div>
    </div>
    <div class="footerNav b-13 dis-flex">
      <div v-for="(item, index) in tabList" :key="index" :class="{'navLi col-9': true, selected: index === selectIndex}"
        @click="clickFooter(index)">
        <img :src="index === selectIndex ? item.icon2: item.icon1" class="icon" />
        <h3 class="f-20"> {{ item.title}} </h3>
      </div>
    </div>

    <!-- 弹窗 -->
    <!-- <h1 @click="ispop = true">显示</h1> -->
    <pop :isshow="ispop" :bgcolor="'#131313'" :opacity="0.5" @open="showpop">
      <template v-slot:content>

        <!-- 款式 -->
        <div v-if="selectIndex === 0">
          <ul class="type-list oh">
            <li v-for="(item, index) in menuList" :key="index" class="type-item border-box t-c f-28 col-9" ref="typeItem"
              @click="selectType(index)">{{item}}</li>
            <span class="dis-block sliper b-f0f" :style="{'left': sliperLeft + 'px'}"></span>
          </ul>
          <div class="style-main">
            <div v-for="(item, index) in styleList" :key="index" class="style-plate">
              <div class="style-title border-box b-33 f-26 col-9">{{item.name}}（共{{item.num}}款）</div>
              <div class="p-30">
                <li v-for="(li, num) in item.list" :key="num" class="style-item b-f"></li>
              </div>
            </div>
          </div>
        </div>

        <!-- 图案 -->
        <div v-else-if="selectIndex === 1">
          <ul class="type-list oh">
            <li v-for="(item, index) in menuList2" :key="index" class="type-item border-box t-c f-28 col-9" ref="bannerItem"
              @click="selectBanner(index)">{{item}}</li>
            <span class="dis-block sliper b-f0f" :style="{'left': sliperLeft + 'px'}"></span>
          </ul>
          <div class="style-main">
            <div class="p-30">
              <li v-for="(item, index) in menuList2" :key="index" class="style-item b-f"></li>
            </div>
          </div>
        </div>

        <!-- 相册 -->
        <div v-else-if="selectIndex === 2">
          <div class="photo">
            <div class="item t-c fl">
              <img src="../../assets/images/design/item5.png" alt="">
              <div class="m-t-30 f-28 col-9">相册导入照片</div>
               <!-- <input class="uploadImg" type="file" name="file" multiple id="file" ref="imgFile" @change="fileChange" accept="image/png,image/jpeg,image/jpg"> -->
            </div>
            <div class="item t-c fl">
              <img src="../../assets/images/design/item5.png" alt="">
              <div class="m-t-30 f-28 col-9">直接拍照</div>
            </div>
          </div>
        </div>

        <!-- 文字 -->
        <div v-else-if="selectIndex === 3">
          <ul class="type-list oh">
            <li v-for="(item, index) in menuList3" :key="index" class="type-item border-box t-c f-28 col-9" ref="fontItem"
              @click="selectFont(index)">{{item}}</li>
            <span class="dis-block sliper b-f0f" :style="{'left': sliperLeft + 'px'}"></span>
          </ul>
          <!-- 字体 -->
          <div v-if="fontIndex === 0" class="font-box">
            <picker :selectNav="selectNav"></picker>
          </div>
          
          <material-picker v-model="colors" />
          
        </div>
      </template>
    </pop>

    <!-- 图层 -->
    <pop :isshow="!ispop && isLevel" :bgcolor="'#fff'" :blankOpacity="0.5" @open="showLevel">
      <template v-slot:content>
        <div class="level-cover">
          <div class="title f-32 col-f0f">图层编辑</div>
          <li class="bar f-28 col-13">上移一层</li>
          <li class="bar f-28 col-13">下移一层</li>
          <li class="bar f-28 col-13">水平翻转</li>
          <li class="bar f-28 col-13">垂直翻转</li>
          <li class="bar f-28 col-13">删除</li>
          <li class="bar f-28 col-13">取消</li>
        </div>
      </template>
    </pop>
  </div>
</template>

<script>
import pop from '@/components/pop.vue'
import drag from '@/components/drag.vue'
import picker from '@/components/picker.vue'
import html2canvas from 'html2canvas'

import { material } from 'vue-color'
export default {
  components: {
    pop: pop,
    drag: drag,
    picker: picker,
    'material-picker': material
  },
  title: '忘记',
  data () {
    return {
      colors: { h: 150, s: 0.66, v: 0.30 },
      ispop: false, // 弹窗显/隐/ 底部导航弹窗,
      isLevel: false, // 图层弹窗/显示/隐
      dragList: [{
        z_index: 1,
        rotate: ['45deg', '90deg', '75deg'],
        imgurl: require('@/assets/images/design/item1.png'),
        isSelect: false
      }, {
        z_index: 2,
        rotate: ['45deg', '90deg', '75deg'],
        imgurl: require('@/assets/images/design/item4.png'),
        isSelect: false
      }], // 可以动元素列表
      dragIndex: '', // 选中的可移动元素索引值
      tabList: [{
        title: '款式',
        icon1: require('@/assets/images/design/item1.png'),
        icon2: require('@/assets/images/design/item2.png')
      }, {
        title: '图案',
        icon1: require('@/assets/images/design/item3.png'),
        icon2: require('@/assets/images/design/item4.png')
      }, {
        title: '相册',
        icon1: require('@/assets/images/design/item5.png'),
        icon2: require('@/assets/images/design/item6.png')
      }, {
        title: '文字',
        icon1: require('@/assets/images/design/item7.png'),
        icon2: require('@/assets/images/design/item8.png')
      }], // 底部导航菜单
      selectIndex: 0, // 底部导航菜单选中索引值
      menuList: ['长袖花里胡哨的', '短袖', '背心', '汉服', '长袖', '短袖'], // 款式菜单
      menuIndex: 0, // 款式选中索引值
      sliperLeft: 0, // 款式距离左边的距离
      styleList: [{
        name: '女款',
        num: 100,
        list: ['', '', '', '', '', '']
      }, {
        name: '男款',
        num: 100,
        list: ['', '', '', '', '', '']
      }],
      menuList2: ['花儿', '恐龙', '超人', '帅哥', '花儿', '恐龙', '超人', '帅哥'], // 图案菜单
      menuList3: ['字体', '添加文字', '颜色'], // 字体
      fontIndex: 0, // 选中的索引
      selectNav: [{
        font: 'design',
        font_name: '佛系字体'
      }, {
        font: 'design',
        font_name: '个性字体'
      }, {
        font: 'design',
        font_name: '佛系字体'
      }, {
        font: 'design',
        font_name: '个性字体'
      }]
    }
  },
  watch: {
    selectIndex (val) {
      console.log('点击了底部的导航', val)
      let that = this
      switch (val) {
        case 0:
          setTimeout(function () {
            that.selectType(0)
          }, 500)
          break
        case 1:
          setTimeout(function () {
            that.selectBanner(0)
          }, 500)
          break
        case 3:
          setTimeout(function () {
            that.selectFont(0)
          }, 500)
          break
      }
    }
  },
  mounted () {
    let that = this
    that.selectType(0)
    // 第一次进入默认选中款式，弹窗弹出
    that.ispop = true
  },
  methods: {
    fileChange (that) {
      console.log('file发生了变化', that, this.$refs.imgFile.files)
    },
    // 生成图片 并下载
    clickGeneratePicture () {
      html2canvas(this.$refs.imageDom).then(canvas => {
        // 转成图片，生成图片地址
        this.imgUrl = canvas.toDataURL('image/png') // 可将 canvas 转为 base64 格式
        var imgURL = this.imgUrl
        // 图片下载png到本地
        var dlLink = document.createElement('a')
        dlLink.download = '图片'
        dlLink.href = imgURL
        dlLink.dataset.downloadurl = ['image/png', dlLink.download, dlLink.href].join(':')
        document.body.appendChild(dlLink)
        dlLink.click()
        document.body.removeChild(dlLink)
      })
    },
    // 选择可移动元素
    selectDrag (index) {
      this.dragIndex = index
      this.dragList.map((item, index) => {
        item.isSelect = false
      })
      this.dragList[index].isSelect = true
    },
    // 取消选中编辑
    closeEdit (index) {
      this.dragList[index].isSelect = false
    },
    // 删除可移动元素
    delElement (index) {
      console.log('点击了删除index', index)
      this.dragList.splice(index, 1)
    },
    // 点击图层
    openLevel () {
      this.ispop = false
      this.isLevel = true
    },
    // 点击左上角x退出
    goBack () {
      this.$router.go(-1)
    },
    showpop () {
      this.ispop = false
    },
    showLevel () {
      this.isLevel = false
    },
    selectType (index) {
      let that = this
      console.log('选择了款式index为', index, that.$refs.typeItem[index].offsetLeft, that.$refs.typeItem[index].offsetWidth)
      that.sliperLeft = that.$refs.typeItem[index].offsetLeft + that.$refs.typeItem[index].offsetWidth / 2 - 10
    },
    selectBanner (index) {
      let that = this
      console.log('选择了图案index为', index, that.$refs.bannerItem)
      that.sliperLeft = that.$refs.bannerItem[index].offsetLeft + that.$refs.bannerItem[index].offsetWidth / 2 - 10
    },
    selectFont (index) {
      let that = this
      console.log('选择了图案index为', index, that.$refs.fontItem)
      if (index !== 1) {
        that.sliperLeft = that.$refs.fontItem[index].offsetLeft + that.$refs.fontItem[index].offsetWidth / 2 - 10
      }
      that.fontIndex = index
    },
    clickFooter (index) {
      this.$router.push({
        name: this.tabList[index].name
      })
      this.selectIndex = index
      this.ispop = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .z-index,
  .del,
  .expand,
  .rotate {
    display: block;
    maxheight: 0.4rem;
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
    left: -0.2rem;
    top: -0.2rem;
  }

  .del {
    position: absolute;
    right: -0.2rem;
    top: -0.2rem;
  }

  .expand {
    position: absolute;
    bottom: -0.2rem;
    right: -0.2rem;
  }

  .rotate {
    position: absolute;
    left: -0.2rem;
    bottom: -0.2rem;
  }

  .substance {
    position: relative;
    height: 100%;
    width: 100%;
    background: #fff;
  }

  .close-btn {
    position: absolute;
    top: .2rem;
    left: .3rem;
    z-index: 100;
  }
  .drag-content{
    height: 100%;
    width: 100%;
    &>img{
      height: 100%;
      width: 100%;
    }
  }

  // 款式
  .type-list {
    position: relative;
    height: 1rem;
    width: 100%;
    white-space: nowrap;
    overflow: auto;

    .type-item {
      display: inline-block;
      min-width: 1.5rem;
      padding: 0.36rem 0.15rem;
    }

    .sliper {
      position: absolute;
      bottom: 0.2rem;
      height: 0.04rem;
      width: 20px;
      transition: 0.5s;
    }
  }

  // 图案
  .style-main {
    max-height: 6rem;
    width: 100%;
    text-align: left;
    overflow: auto;

    .style-title {
      height: 0.65rem;
      width: 100%;
      padding: 0 0.6rem;
      box-sizing: border-box;
      line-height: 0.65rem;
    }

    .style-item {
      height: 1.6rem;
      width: 1.6rem;
      margin-right: 0.16rem;
      margin-bottom: 0.17rem;
      display: inline-block;
    }

    .style-item:nth-child(4n) {
      margin-right: 0;
    }
  }

  // 相册
  .photo {
    height: 5rem;
    width: 100%;
    .item {
      margin-top: 1.3rem;
      width: 50%;
      &>img {
        height: 1.8rem;
        width: 1.8rem;
      }
    }
  }

  .font-box {
    width: 100%;
    .selectNav {
      height: 0.8rem;
      .navLi {
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
      }
    }
  }
  .level-cover{
    padding: 0.72rem;
    .title{
      padding: 0 0 0.88rem;
      border-bottom: 2px solid #ccc;
    }
    .bar{
      height: 0.48rem;
      line-height: 0.48rem;
      border-bottom: 2px solid #ccc;
    }
  }

  // 底部导航
  .footerNav {
    height: 1.12rem;
    font-family: "design";

    .navLi {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .icon {
        height: .42rem;
        width: .42rem;
        margin: 0 auto 0.1rem;
      }
    }
  }

  .selected {
    color: #fff;
  }
</style>
