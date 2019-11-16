<template>
  <div class="head-menu">
    <span class="login" @click="toLogin">登录</span>
    <span class="register" @click="toRegister">注册</span>
  </div>
</template>

<script>
export default {
  name: 'user-info.vue',
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
  @media all and (min-width: 960px ){
    .head-menu{
      position: absolute;
      right: 10%;
      top: 28%;
      line-height: 30px;
      width: 90px;
      font-size: 14px;
      cursor: pointer;
      height: 30px;
      span{
        margin-left: 8px;
        height: 30px;
        display: inline-block;
      }
      .login{
        color: rgba(255,69,0,.8);
      }
    }
  }
  @media all and (min-width: 768px)and (max-width: 960px ){
    .head-menu{
      position: absolute;
      right: 0;
      top: 32%;
      line-height: 30px;
      width: 85px;
      font-size: 14px;
      cursor: pointer;
      height: 30px;
      span{
        margin-left: 8px;
        height: 30px;
        display: inline-block;
      }
      .login{
        color: rgba(255,69,0,.8);
      }
    }
  }
  @media all and (max-width: 768px){
    .head-menu{
      float: right;
      width: 2.3rem;
      font-size: 0.38rem;
      cursor: pointer;
      height: 1.7rem;
      line-height: 1.8rem;
      span{
        display: inline-block;
      }
      .register{
        margin-left: 0.4rem;
      }
      .login{
        color: rgba(255,69,0,.8);
      }
    }
  }
</style>
