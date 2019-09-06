<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>

    <el-table :data="tableData">
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态" :formatter="formatter"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="o">
          <el-button type="text" size="small">修改评论</el-button>
          <el-button
            type="text"
            size="small"
            :style="{color:o.row.comment_status?'#E6A23C':'#409EFF'}"
            @click="openClose(obj.row)"
          >{{o.row.comment_status?'关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-pagination
        :current-page="pages.page"
        :page-size="pages.per_page"
        :total="pages.total"
        @current-change="currentChange"
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pages: {
        page: 1,
        per_page: 10,
        total: 0
      },
      loading: false
    }
  },
  methods: {
    getComments () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.pages.page,
          per_page: this.pages.per_page
        }
      }).then(res => {
        this.loading = false
        this.tableData = res.data.results
        this.pages.total = res.data.total_count
      })
    },
    formatter (row, column, cellValue, index) {
      console.log(row)
      console.log(column)
      console.log(cellValue)
      console.log(index)
      return row.total ? '正常' : '关闭'
    },
    openClose (row) {
      let or = row.comment_status ? '正常' : '关闭'
      this.$confirm(`您是否要${or}评论?`, '提示').then(res => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          this.getComments()
        })
      })
    },
    currentChange (newPage) {
      this.pages.page = newPage
      this.getComments()
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style lang="less" scoped>
</style>
