<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="全部素材" name="all">
      <div class="img-list">
        <div class="img-item" v-for="item in list" :key="item.id">
          <img @click="selectImg(item.url)" :src="item.url" alt />
        </div>
      </div>

      <el-row type="flex" justify="center">
        <el-pagination
          :current-page="page.page"
          :page-size="page.pageSize"
          :total="page.total"
          @current-change="currentChange"
          layout="prev, pager, next"
        ></el-pagination>
      </el-row>
    </el-tab-pane>

    <el-tab-pane label="上传图片" name="upload">
      <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="upload">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    selectImg (url) {
      this.$emit('transSelect', url)
    },
    upload (params) {
      let FD = new FormData()
      FD.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: FD
      }).then(res => {
        this.$emit('transSelect', res.data.url)
      })
    },
    currentChange (newPage) {
      this.page.page = newPage
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-item {
    margin: 10px;
    width: 150px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
