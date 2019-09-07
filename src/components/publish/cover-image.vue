<template>
  <div class="cover-image">
    <div
      class="image-item"
      @click="showDialog(index)"
      v-for="(item,index) in transPublish"
      :key="index"
    >
      <img :src="item ? item : defaultImg" alt />
    </div>
    <el-dialog @close="hideDialog" :visible="visbile">
      <select-image @transSelect="receive"></select-image>
    </el-dialog>
  </div>
</template>

<script>
// 根据images 来渲染页面
// images ['']
// images ['','','']
// images []
export default {
  props: ['transPublish'],
  data () {
    return {
      visbile: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      selectIndex: -1
    }
  },
  methods: {
    showDialog (index) {
      this.visbile = true
      this.selectIndex = index // 将当前点击的索引赋值给data中一个变量
    },
    hideDialog () {
      this.visbile = false
    },
    receive (url) {
      // url 不能在cover-image中修改 要在publish中修改
      // 要再次将url 传给父组件
      this.$emit('transCover', url, this.selectIndex)
      this.visbile = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  .image-item {
    padding: 10px;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
