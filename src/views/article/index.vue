<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>

    <el-form style="margin-left:40px">
      <el-form-item label="文章状态:">
        <el-radio-group v-model="searchForm.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道列表:">
        <el-select v-model="searchForm.channel_id" @change="changeCondition">
          <el-option
            v-for="(item,index) in channels"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间选择:">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchForm.dateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeCondition"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <div class="total-info">共找到{{page.total}}条符合条件的内容</div>

    <div class="article-list">
      <div class="article-item" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />

          <div class="info">
            <span class="title">{{item.title}}</span>
            <el-tag :type="item.status | statusType" style="width:80px">{{item.status | statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>

        <div class="right">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="delOne(item.id)">
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </div>
    </div>

    <el-row type="flex" justify="center" style="margin:10px 0">
      <el-pagination
        @current-change="currentChange"
        :current-page="page.page"
        :page-size="page.per_page"
        :total="page.total"
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      channels: [],
      list: [],
      page: {
        page: 1,
        per_page: 10,
        total: 0
      },
      defaultImg: require('../../assets/img/default-cover.jpg')
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    changeCondition () {
      this.page.page = 1
      this.getCondition()
    },
    getCondition () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate:
          this.searchForm.dateRange.length > 0
            ? this.searchForm.dateRange[0]
            : null,
        end_pubdate:
          this.searchForm.dateRange.length > 1
            ? this.searchForm.dateRange[1]
            : null,
        page: this.page.page,
        per_page: this.page.per_page
      }
      this.getArticles(params)
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    delOne (id) {
      this.$confirm('您是否要删除此文章?', '提示').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          console.log(22)
          this.getCondition()
        })
      })
    },
    currentChange (newPage) {
      this.page.page = newPage
      this.getCondition()
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  },
  filters: {
    statusType: function (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          break
      }
    },
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    }
  }
}
</script>

<style lang='less' scoped>
.total-info {
  border-bottom: 1px dashed #ccc;
  padding: 15px 0;
  color: #323745;
  font-size: 14px;
}
.article-list {
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f2f3f5;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        height: 100px;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        justify-content: space-around;
        .title {
          color: #333;
          font-size: 14px;
        }
        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      font-size: 12px;
      span {
        margin-right: 8px;
        cursor: pointer;
        color: #333;
      }
    }
  }
}
</style>
