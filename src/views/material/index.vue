<template>
  <el-card class="material">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>

    <el-upload class="upload" :show-file-list="false" :http-request="upload" action>
      <el-button size="small" type="primary">上传图片</el-button>
    </el-upload>

    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="全部素材" name="all">
        <div class="list">
          <div v-for="(item,index) in imgList" :key="index" class="every">
            <img :src="item.url" />

            <div class="icon">
              <i
                class="el-icon-star-on"
                @click="collectCancel(item)"
                :style="{color:item.is_collected ? 'red':''}"
              ></i>
              <i class="el-icon-delete-solid" @click="delImg(item)"></i>
            </div>
          </div>
        </div>

        <el-row type="flex" justify="center">
          <el-pagination
            :current-page="page.page"
            :page-size="page.per_page"
            :total="page.total"
            @current-change="currentChange"
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="收藏图片" name="collect">
        <div class="list">
          <div v-for="(item,index) in imgList" :key="index" class="every">
            <img :src="item.url" />
          </div>
        </div>

        <el-row type="flex" justify="center">
          <el-pagination
            :current-page="page.page"
            :page-size="page.per_page"
            :total="page.total"
            @current-change="currentChange"
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      imgList: [],
      page: {
        page: 1,
        per_page: 10,
        total: 0
      }
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.page,
          per_page: this.page.per_page,
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        this.imgList = res.data.results
        this.page.total = res.data.total_count
      })
    },
    tabClick () {
      this.page.page = 1
      this.getMaterial()
    },
    collectCancel (item) {
      let or = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${or}收藏这张图片?`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: `/user/images/${item.id}`,
          data: { collect: !item.is_collected }
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    upload (img) {
      let FD = new FormData()
      FD.append('image', img.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: FD
      }).then(() => {
        this.getMaterial()
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

<style lang="less" scoped>
.material {
  .upload {
    position: absolute;
    right: 10px;
    margin-top: -10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .every {
      margin: 20px;
      justify-content: center;
      width: 180px;

      img {
        width: 180px;
        height: 180px;
      }
      .icon {
        background: #f4f5f6;
        height: 30px;
        font-size: 18px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
}
</style>
