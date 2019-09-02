<template>
  <div>
    <el-row type="flex" class="layout-header" justify="space-between">
      <el-col :span="7" class="left">
        <i class="el-icon-s-unfold icon"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>

      <el-col :span="4" class="right">
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" class="user-head" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link user-name">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="account">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="quit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      let token = localStorage.getItem('token')
      this.$axios({
        url: '/user/profile',
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        console.log(res)
        this.userInfo = res.data
      })
    },
    handleCommand (command) {
      if (command === 'account') {
        // 账户信息
      } else if (command === 'git') {
        // git地址
      } else if (command === 'quit') {
        localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.layout-header {
  line-height: 40px;
  padding-top: 10px;
  .left {
    display: flex;
    align-items: center;
    .icon {
      font-size: 22px;
    }
  }
  .right {
    display: flex;
    .user-head {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
