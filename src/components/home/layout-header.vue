<template>
  <div class="layout-header">
    <el-row type="flex" justify="space-between" class="left">
      <el-col :span="7">
        <i class="icon" @click="openClose" :class="{'el-icon-s-fold':!or , 'el-icon-s-unfold':or}"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>

      <el-col :span="4" class="right">
        <img :src="userInfo.photo || defaultImg" class="user-head" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg'),
      or: false
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    },
    openClose () {
      this.or = !this.or
      eventBus.$emit('openOrClose', this.or)
    },
    handleCommand (command) {
      if (command === 'account') {
      } else if (command === 'git') {
      } else if (command === 'quit') {
        localStorage.clear()
        this.$route.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
    // 听电话  => 做动作
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
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

.layout-header {
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
    align-items: center;

    .user-head {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
