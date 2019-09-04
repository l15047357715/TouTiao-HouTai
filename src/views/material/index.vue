<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all">
        <el-card v-for="(item,index) in imgList" :key="index">
          <img :src="item.url" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">收藏图片</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      imgList: [],
      pages: {
        page: 1,
        per_page: 10,
        total: 0
      },
      activeName: 'all'
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.pages.page,
          per_page: this.pages.per_page
          // collect: this.activeName === 'collect'
        }
      }).then(res => {
        console.log(res)
        this.imgList = res.data.results
        this.pages.total = res.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style>
</style>
