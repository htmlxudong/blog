<template>
  <div class="nav-wrap">
    <div class="head-nav">
      <div class="content-left">
        <nuxt-link tag="span" to="/" class="iconfont icon-mingyanjingju"><span class="author-title">徐东的个人博客</span></nuxt-link>
        <userInfo v-if="!username"/>
      </div>
      <div class="btn">
        <div class="circle" :class="{'bor' :showNav }" @click="toToggle">
          <div class="linetop" :class="{'top' :showNav }"></div>
          <div class="linebottom" :class="{'bottom' :showNav }"></div>
        </div>
      </div>
      <transition name="fade">
        <div class="po-wrap" v-show="showNav">
          <ul class="nav">
            <nuxt-link class="item" tag="li" to="/" @click.native="toClose"><span class="iconfont icon-yemian-copy"></span>首页</nuxt-link>
            <nuxt-link class="item" tag="li" to="/file" @click.native="toClose"><span class="iconfont icon-boke"></span>分享</nuxt-link>
            <nuxt-link class="item" tag="li" to="/about" @click.native="toClose"><span class="iconfont icon-guanyu"></span>关于我</nuxt-link>
            <nuxt-link class="item" tag="li" to="/tags" @click.native="toClose"><span class="iconfont icon-biaoqian"></span>标签墙</nuxt-link>
            <nuxt-link class="item" tag="li" to="/write" v-if="userInfo && userInfo.isAdmin"><span class="iconfont icon-yumao"></span>写博客</nuxt-link>
          </ul>
        </div>
      </transition>
    </div>
    <div class="userinfo-wrap"  v-if="username">
      <div class="logo-wrap"  slot="reference" @click="toLogout">
        <img src="../../common/img/logo.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import { _logout } from '../../common/api'
  import { mapState  } from 'vuex'
  import userInfo from '../user-info/user-info.vue'
  export default {
    name: 'head-nav',
    data () {
      return {
        showNav: false
      }
    },
    computed: {
      ...mapState(['userInfo']),
      username() {
        if(this.userInfo.hasOwnProperty('logo')){
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      toClose () {
        this.showNav = false
      },
      async toLogout () {
        let res = await _logout()
        this.$store.commit('setUserInfo', { userInfo: {}})
      },
      toToggle () {
        this.showNav = ! this.showNav
      }
    },
    components: {
      userInfo
    }
  }
</script>

<style lang="less" scoped>
  .nuxt-link-exact-active{
    color: rgba(255,69,0,.7);
  }
  @media all and (min-width: 1200px) {
    .nav-wrap{
      font-weight: 550;
      color: #999999;
      width: 100%;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 12;
      box-shadow: 0 1px 5px rgba(0,0,0,0.1);
      .userinfo-wrap{
        position: absolute;
        right: 10px;
        top: 10px;
        width: 80px;
        height: 50px;
        .logo-wrap{
          position: relative;
          border-radius: 50%;
          cursor: pointer;
          width: 50px;
          height: 50px;
          img{
            display: block;
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
        }
      }
      .head-nav{
        font-size: 14px;
        margin: 0 auto;
        box-sizing: border-box;
        padding-left: 30px;
        width: 1000px;
        height: 65px;
        line-height: 65px;
        .content-left{
          box-sizing: border-box;
          width: 300px;
          height: 100%;
          float: left;
          letter-spacing: 1px;
          position: relative;
          .icon-mingyanjingju{
            cursor: pointer;
            color: orangered;
            display: inline-block;
            font-size: 20px;
            .author-title{
              padding-left: 10px;
              color: #999999;
              display: inline-block;
              font-size: 14px;
            }
          }
        }
        .po-wrap{
          display: block !important;
          width: 100%;
          height: 100%;
          .nav{
            float: right;
            width: 460px;
            overflow: hidden;
            .item{
              float: left;
              padding: 0 12px;
              cursor: pointer;
              .icon-boke,.icon-guanyu,.icon-biaoqian, .icon-yemian-copy,.icon-yumao{
                font-size: 16px;
                padding-right: 10px;
              }
              &:hover{
                color: orangered;
              }
            }
          }
        }
      }
    }
  }
  @media all and (min-width: 960px) and (max-width: 1200px) {
    .nav-wrap{
      color: #999999;
      font-weight: 550;
      width: 100%;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 12;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      .userinfo-wrap{
        z-index: 12;
        position: absolute;
        right: 0;
        top: 10px;
        width: 55px;
        height: 55px;
        .logo-wrap{
          border-radius: 50%;
          cursor: pointer;
          width: 50px;
          height: 50px;
          img{
            display: block;
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
        }
      }
      .head-nav{
        font-size: 14px;
        padding-left: 20px;
        box-sizing: border-box;
        margin: 0 auto;
        width: 900px;
        height: 65px;
        line-height: 65px;
        .content-left{
          box-sizing: border-box;
          width: 300px;
          height: 100%;
          float: left;
          letter-spacing: 1px;
          position: relative;
          .icon-mingyanjingju{
            padding-right: 5px;
            color: orangered;
            display: inline-block;
            font-size: 20px;
            cursor: pointer;
            .author-title{
              padding-left: 10px;
              color: #999999;
              display: inline-block;
              font-size: 14px;
            }
          }
        }
        .po-wrap{
          display: block !important;
          width: 100%;
          height: 100%;
          .nav{
            float: right;
            width: 440px;
            overflow: hidden;
            .item{
              float: left;
              padding: 0 12px;
              cursor: pointer;
              .icon-boke,.icon-guanyu,.icon-biaoqian, .icon-yemian-copy{
                font-size: 16px;
                padding-right: 5px;
              }
              &:hover{
                color: rgba(255,69,0,.8);
              }
            }
          }
        }
      }
    }
  }
  @media all and (min-width: 768px) and (max-width: 960px) {
    .nav-wrap{
      color: #999999;
      font-weight: 550;
      width: 100%;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 12;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      .userinfo-wrap{
        z-index: 12;
        position: absolute;
        right: 0;
        top: 10px;
        width: 50px;
        height: 50px;
        .logo-wrap{
          position: relative;
          border-radius: 50%;
          cursor: pointer;
          width: 50px;
          height: 50px;
          img{
            display: block;
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
        }
      }
      .head-nav{
        font-size: 14px;
        margin: 0 auto;
        width: 700px;
        height: 65px;
        line-height: 65px;
        .content-left{
          box-sizing: border-box;
          width: 240px;
          height: 100%;
          float: left;
          letter-spacing: 1px;
          position: relative;
          .icon-mingyanjingju{
            padding-right: 5px;
            color: orangered;
            display: inline-block;
            font-size: 20px;
            cursor: pointer;
            .author-title{
              padding-left: 10px;
              color: #999999;
              display: inline-block;
              font-size: 14px;
            }
          }
        }
        .po-wrap{
          display: block !important;
          width: 100%;
          height: 100%;
          .nav{
            float: right;
            width: 400px;
            margin-right: 10px;
            .item{
              float: left;
              padding: 0 10px;
              cursor: pointer;
              .icon-boke,.icon-guanyu,.icon-biaoqian, .icon-yemian-copy{
                font-size: 16px;
                padding-right: 5px;
              }
              &:hover{
                color: orangered;
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 768px) {
    .fade-enter-active, .fade-leave-active{
      transition: all .5s cubic-bezier(.535,0,0,1) 0s;
      transform: translateX(0)
    }
    .fade-enter, .fade-leave-to {
      transform: translateX(-100% )
    }
    .nav-wrap{
      color: #999999;
      font-weight: 550;
      position: fixed;
      top: 0;
      left: 0;
      background: #fff;
      width: 100%;
      z-index: 190;
      height: 1.733rem;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      .userinfo-wrap{
        z-index: 12;
        position: absolute;
        right: 0;
        top: 0.35rem;
        width: 1.5rem;
        height: 1.5rem;
        .logo-wrap{
          position: relative;
          border-radius: 1.5rem;
          cursor: pointer;
          width: 1.067rem;
          height: 1.067rem;
          img{
            display: block;
            border-radius: 1.5rem;
            width: 1.067rem;
            height: 1.067rem;
          }
        }
      }
      .head-nav{
        font-size: 14px;
        width: 100%;
        height: 1.733rem;
        .content-left{
          margin: 0 auto;
          box-sizing: border-box;
          padding-left: 0.2rem;
          width: 6.5rem;
          line-height: 1.8rem;
          height: 1.7rem;
          letter-spacing: 1px;
          font-size: 0.4rem;
          .icon-mingyanjingju{
            color: #EA2027;
            font-size: 0.4rem;
            .author-title{
              padding-left: 0.2rem;
              color: #999999;
              display: inline-block;
              font-size: 0.4rem;
            }
          }
        }
        .btn{
          position: absolute;
          left: 0;
          top: 0;
          box-sizing: border-box;
          padding: 0.35rem 0 0.3rem 0.4rem;
          width: 2rem;
          height: 2rem;
          .bor{
            border:  1px solid #999999 !important; ;
          }
          .circle{
            position: relative;
            z-index: 100;
            cursor: pointer;
            width: 1.067rem;
            height: 1.067rem;
            border: 1px solid #202020;
            border-radius: 1.067rem;
            transition: border .5s cubic-bezier(.535,0,0,1) 0s;
            .top{
              background-color: #999999 !important;
              transform: translateY(0) rotate(225deg) !important;
            }
            .bottom{
              background-color: #999999 !important;
              transform: translateY(0) rotate(-225deg) !important;
            }
            &>.linetop,&>.linebottom{
              width: 0.5rem;
              height: 1px;
              background: #202020;
              display: block;
              content: "";
              left: 50%;
              position: absolute;
              top: 50%;
              margin-left: -0.25rem;
              margin-top: -1px;
              transition: all .5s cubic-bezier(.535,0,0,1) 0s;
            }
            .linetop{
              transform: translateY(3px) rotate(0);
            }
            .linebottom{
              transform: translateY(-3px) rotate(0);
            }
          }
        }
        .po-wrap{
          box-sizing: border-box;
          width: 100%;
          min-height: 5.3rem;
          position: absolute;
          top: 1.733rem;
          left: 0;
          background-color: #f7f7f2;
          .nav{
            width: 100%;
            .item{
              height: 1.3rem;
              border-bottom: 1px solid #DCDFE6;
              text-align: center;
              padding: 0.33rem 0;
              box-sizing: border-box;
              .icon-boke,.icon-guanyu,.icon-biaoqian, .icon-yemian-copy,.icon-yumao{
                font-size: 0.5rem;
                padding-right: 0.15rem;
              }
            }
          }
        }
      }
      .mask{
        width: 50%;
        height: 100vh;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 200;
        background-color: rgba(0,0,0,.1);
      }
    }
  }
</style>

