<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>

    <el-upload action :http-request="uploadHeadImg" :show-file-list="false">
      <img class="head-image" :src="userInfo.photo || defaultImg" alt />
    </el-upload>

    <el-form ref="form" :model="userInfo" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userInfo.name" style="width:300px"></el-input>
      </el-form-item>

      <el-form-item label="简介" prop="intro">
        <el-input v-model="userInfo.intro" style="width:300px"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email" style="width:300px"></el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="userInfo.mobile" style="width:300px" disabled></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus' // 公共的vue实例
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      defaultImg: require('../../assets/img/default-cover.jpg'),
      rules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 2, max: 8, message: '用户名长度必须为4-8位' }
        ],
        email: [
          {
            pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            message: '邮箱格式不正确'
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    },
    uploadHeadImg (params) {
      this.loading = true
      let FD = new FormData()
      FD.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data: FD
      }).then(() => {
        this.loading = false
        this.getUserInfo()
        eventBus.$emit('updateUserInfo') // 相当于打出了一个电话 电话号是updateUserInfo
      })
    },
    saveUserInfo () {
      this.$refs.form.validate(boolean => {
        if (boolean) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(() => {
            this.$message({
              type: 'success',
              message: '恭喜您保存用户信息成功'
            })
            eventBus.$emit('updateUserInfo') // 相当于打出了一个电话 电话号是updateUserInfo
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.head-image {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-left: 500px;
}
</style>
