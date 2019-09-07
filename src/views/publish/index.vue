<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>

    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>

      <el-form-item prop="content" label="内容">
        <quill-editor v-model="formData.content" style="height:500px;width:1000px"></quill-editor>
      </el-form-item>

      <el-form-item label="封面" style="margin-top:120px" prop="cover">
        <el-radio-group v-model="formData.cover.type" @change="changeCoverType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <cover-image @transCover="receive" :transPublish="formData.cover.images"></cover-image>
      </el-form-item>

      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option
            v-for="(item,index) in channels"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="publish(false)" type="primary">发表文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      if (value.type === 1) {
        value.images.length === 1 && value.images[0]
          ? callBack()
          : callBack(new Error('对不起,您未设置单图的封面'))
      } else if (value.type === 3) {
        if (
          value.images.length === 3 &&
          value.images[0] &&
          value.images[1] &&
          value.images[2]
        ) {
          callBack()
        } else {
          callBack(new Error('对不起,您未设置全三图的封面'))
        }
      } else {
        // 无图或者自动 []
        if (value.images.length > 0) {
          callBack(new Error('对不起,您的封面设置有误'))
        } else {
          callBack()
        }
      }
    }
    return {
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [],
      rules: {
        title: [
          { required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题不能为5到30之间' }
        ],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }],
        cover: [{ validator: validator }]
      }
    }
  },
  methods: {
    getArticleId (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        this.formData = res.data
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    changeCoverType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    receive (url, index) {
      let imgArr = this.formData.cover.images
      let newArr = imgArr.map(function (item, i) {
        if (i === index) {
          return url
        }
        return item
      })
      this.formData.cover.images = newArr
      // 更新了 当前images => props 传给 cover-image
    },
    publish (draft) {
      this.$refs.from.validate(boolean => {
        if (boolean) {
          let id = this.$route.params.id
          this.$axios({
            url: id ? `/articles/${id}` : '/articles',
            method: id ? 'put' : 'post',
            params: { draft }, // draft 为true时 就是草稿
            data: this.formData
          }).then(() => {
            this.$router.push('/home/article')
          })
        }
      })
    }
  },
  created () {
    this.getChannels()
    let id = this.$route.params.id
    if (id) {
      this.getArticleId(id)
    }
  }
}
</script>

<style>
</style>
