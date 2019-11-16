<template>
  <div class="app-container">
    <HeadWrap/>
    <transition name="fade">
      <nuxt />
    </transition>
    <vue-progress-bar></vue-progress-bar>
    <HomeFooter/>
    <transition name="footTop">
      <div class="toTop" v-show="gotop">
        <span class="iconfont icon-huidaodingbu" @click="toTop"></span>
      </div>
    </transition>
  </div>
</template>


<script>
  import goTop from '../common/mixin/gotop.js'
  import HomeFooter from '../components/home-footer/home-footer.vue'
  import HeadWrap from '../components/head-nav/head-nav.vue'
  export default {
    name: 'default',
    mixins: [goTop],
    mounted () {
      this.$Progress.start()
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          this.$Progress.parseMeta(meta)
        }
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish()
      })
    },
    components : {
      HomeFooter,
      HeadWrap
    }
  }
</script>

<style lang="less">
  .fade-enter-active, .fade-leave-active{
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .footTop-enter-active, .footTop-leave-active{
    transition: transform .5s cubic-bezier(.535,0,0,1) 0s;
    transform: translateX(0);
  }
  .footTop-enter,.footTop-leave-to{
    transform: translateX(200px);
  }
.app-container{
  width: 100%;
  height: 100%;
  background-color: #eee;
}
  @media all and (min-width: 1200px) {
    .toTop{
      position: fixed;
      bottom: 80px;
      right: 50px;
      width: 50px;
      height: 50px;
      .iconfont{
        cursor: pointer;
        font-size: 35px;
        color: orangered;
        display: inline-block;
      }
    }
  }
  @media all and (max-width: 1200px ) and (min-width: 960px){
    .toTop{
      position: fixed;
      bottom: 80px;
      right: 50px;
      width: 50px;
      height: 50px;
      .iconfont{
        cursor: pointer;
        font-size: 35px;
        color: orangered;
        display: inline-block;
      }
    }
  }
  @media all and (max-width: 960px ) and (min-width: 768px){
    .toTop{
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 50px;
      height: 50px;
      .iconfont{
        cursor: pointer;
        font-size: 35px;
        color: orangered;
        display: inline-block;
      }
    }
  }
  @media all and (max-width: 768px) {
    .toTop{
      position: fixed;
      bottom: 80px;
      right: 0;
      width: 50px;
      height: 50px;
      z-index: 100;
      .iconfont{
        cursor: pointer;
        font-size: 35px;
        color: orangered;
        display: inline-block;
      }
    }
  }

</style>
