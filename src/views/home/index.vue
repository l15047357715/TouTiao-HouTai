<template>
  <div>
    <el-container>
      <el-aside style="background:#323745;width:200px">
        <layout-aside></layout-aside>
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
export default {}
</script>

<style lang="less" scoped>
</style>
