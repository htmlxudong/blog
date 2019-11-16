<template>
  <div class="admin-wrap">
    <el-container>
      <el-header>博客后台管理系统</el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="1" @click.native="toBlog">
              <i class="el-icon-menu"></i>
              <span slot="title">博客管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click.native="toUser">
              <i class="el-icon-document"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click.native="toFile">
              <i class="el-icon-setting"></i>
              <span slot="title">链接管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click.native="toComment">
              <i class="el-icon-setting"></i>
              <span slot="title">评论管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <nuxt-child/>
        </el-main>
      </el-container>
    </el-container>
    <span class="iconfont icon-back" @click="toBack"> <span class="back">返回</span></span>
  </div>
</template>

<script>
export default {
  name: 'admin',
  middleware: 'auth',
  methods: {
    toBlog () {
      this.$router.replace('/admin/adminBlog')
    },
    toUser () {
      this.$router.replace('/admin/adminUser')
    },
    toFile () {
      this.$router.replace('/admin/adminFile')
    },
    toComment () {
      this.$router.replace('/admin/adminComment')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toBack () {
      this.$router.replace('/')
    },
  }
}
</script>

<style lang="less" scoped>
.admin-wrap{
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: #fff;
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
    overflow: hidden;
    text-align: center;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 650px;
  }
  .icon-back{
    cursor: pointer;
    color: black;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    font-size: 18px;
    font-weight: 500;
    .back{
      padding-left: 3px;
    }
    &:hover{
      color: rgba(255, 69, 0, 0.8);
    }
  }
}
</style>
