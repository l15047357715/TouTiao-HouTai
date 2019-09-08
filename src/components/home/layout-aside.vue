<template>
  <div class="layout-aside">
    <div class="logo">
      <img :src="collapse ? smallImg : bigImg" />
    </div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      :collapse="collapse"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/article">内容列表</el-menu-item>
          <el-menu-item index="/home/comment">评论管理</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/fansdata">图文数据</el-menu-item>
          <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
          <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
          <el-menu-item index="/home/fansimg">粉丝画像</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/home/account">
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false,
      smallImg: require('../../assets/img/toutiao.png'),
      bigImg: require('../../assets/img/logo_admin.png')
    }
  },
  created () {
    eventBus.$on('openOrClose', or => {
      this.collapse = or
    })
  }
}
</script>

<style lang="less" scoped>
.layout-aside {
  background: #545c64;
  height: 100vh;
  width: 200px;
  .logo {
    background: #2e2f32;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 40px;
    }
  }
}
</style>
