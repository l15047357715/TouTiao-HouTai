<template>
  <div>
    <el-container>
      <el-aside style="background:#545c64" :style="{width: collapse ? '60px' : '200px '}">
        <layout-aside :style="{width: collapse ? '60px' : '200px '}"></layout-aside>
      </el-aside>
      <el-container>
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main style="padding: 0">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('openOrClose', or => {
      this.collapse = or
    })
  }
}
</script>

<style lang="less" scoped>
</style>
