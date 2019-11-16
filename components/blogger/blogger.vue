<template>
  <div class="search-right">
    <div class="search-title-wrap">
      <h4 class="search-title">搜索文章</h4>
    </div>
    <div class="input-wrap">
      <input type="text" placeholder="输入关键字搜索" v-model="article">
      <span class="iconfont icon-sousuo" @click="toSearch"></span>
    </div>
    <div class="bloger-wrap">
      <div class="bloger-title-wrap">
        <h4 class="bloger-title">博客信息</h4>
      </div>
      <div class="bloger-bottom">
        <div class="img-wrap">
          <img src="http://thgcgl.top/photo.jpg" alt="">
          <div class="connect">
            <a href="https://github.com/dashboard" class="iconfont icon-github" target="_blank"></a>
            <a href="https://github.com/dashboard" class="iconfont icon-youxiang" target="_blank"></a>
          </div>
        </div>
        <div class="bloger-info">
          <span class="info cursor-hand" @click="toHome"> <span class="font-color article">{{ blogList.length}}</span> 文章</span>
          <span class="info"> <span class="font-color comment">{{totalComment}}</span> 评论</span>
          <span class="info"> <span class="font-color watch">{{totalBrowse}}</span> 浏览</span>
          <span class="info"> <span class="font-color now-watch">1</span> 当前浏览</span>
        </div>
      </div>
    </div>
    <div class="most-comments-wrap" v-show="blogList && blogList.length">
      <div class="comments-title-wrap">
        <h4 class="comments-title">访问最多的文章</h4>
      </div>
      <ul class="comments">
        <li class="comment" v-for="(blog,index) in mostBrowses" :key="index" @click="toBlogDetail(index)">
          {{blog && blog.blogTitle}}
        </li>
      </ul>
    </div>
    <h4 class="admin" @click="toAdmin" v-if="userInfo.isAdmin">管理博客</h4>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'blogger.vue',
  data () {
    return {
      article: ''
    }
  },
  computed: {
    ...mapState(['userInfo', 'blogList']),
    totalBrowse () {
      return this.$store.getters.totalBrowse || 0
    },
    totalComment () {
      return this.$store.getters.totalComment || 0
    },
    mostBrowses () {
      if (!this.blogList){
        return
      }
      let sortArr = this.blogList.slice().sort((a, b) => {
        return b.browse - a.browse
      })
      let result = []
      result[0] = sortArr[0]
      result[1] = sortArr[1]
      result[2] = sortArr[3]
      return result.filter((value) => {
        return value
      })
    }
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
    toAdmin () {
      this.$router.push('/admin')
    },
    toBlogDetail (index) {
      this.$router.push('/blogDetail?id='+index)
    },
    toSearch () {
      let name = this.article
      this.$router.replace('/search?name='+name)
    }
  }
}
</script>

<style lang="less" scoped>
  .w-h-f(@w,@h,@f){
    width: @w;
    height: @h;
    float: @f;
  }
  @media all and (min-width: 1200px){
    .search-right{
      width: 32%;
      float: right;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 0 10px 40px;
      .search-title-wrap{
        border-bottom: 1px solid rgba(0,0,0,0.0785);
        width: 65%;
        font-size: 18px;
        .search-title{
          color: rgba(0,0,0,.8);
          padding-bottom: 10px;
          width: 80px;
          border-bottom: 1px solid #2c3e50;
        }
      }
      .input-wrap{
        height: 30px;
        margin: 25px 0;
        width: 65%;
        position: relative;
        input{
          padding: 2px 0;
          border: 1px solid #eee;
          width: 100%;
          height: 100%;
          text-indent: 10px;
          font-size: 14px;
          border-radius: 3px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          &:focus{
            border: 1px solid #409EFF;
          }
        }
        .iconfont{
          width: 35px;
          text-align: center;
          height: 33px;
          font-size: 16px;
          line-height: 33px;
          position: absolute;
          right: -1px;
          top: 1px;
          background: rgba(255,255,255,1);
          cursor: pointer;
        }
      }
      .bloger-wrap{
        width: 65%;
        height: 220px;
        font-size: 18px;
        .bloger-title-wrap{
          border-bottom: 1px solid rgba(0,0,0,0.0785);
          width: 100%;
          font-size: 18px;
          .bloger-title{
            color: rgba(0,0,0,.8);
            padding-bottom: 10px;
            width: 80px;
            border-bottom: 1px solid #2c3e50;
          }
        }
        .bloger-bottom{
          margin-top: 25px;
          width: 100%;
          height: 150px;
          .img-wrap{
            width: 100px;
            height: 130px;
            float: left;
            .connect{
              margin-top: 15px;
              width: 80px;
              height: 30px;
              text-align: center;
              border-bottom: 1px solid rgba(0, 0, 0, 0.0785);
              a{
                font-size: 20px;
                display: inline-block;
                color: black;
                &:last-child{
                  margin-left: 15px;
                }
              }
            }
            img{
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }
          }
          .bloger-info{
            .w-h-f(100px,100px,right);
            .info{
              display: block;
              font-size: 16px;
              color: #aaa;
              .font-color{
                color: black;
              }
              .article{
                color: #fdcb6e;
              }
              .comment{
                color: #55efc4;
              }
              .now-watch{
                color: #f35626;
              }
            }
            .cursor-hand{
              &:hover{
                cursor: pointer;
                color: orangered;
              }
            }
          }
        }
      }
      .most-comments-wrap{
        width: 65%;
        min-height: 150px;
        .comments-title-wrap{
          border-bottom: 1px solid rgba(0,0,0,0.0785);
          width: 100%;
          font-size: 18px;
          .comments-title{
            color: rgba(0,0,0,.8);
            padding-bottom: 10px;
            width: 150px;
            position: relative;
            &:after{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 80px;
              content: "";
              display: block;
              border-bottom: 1px solid #2c3e50;
            }
          }
        }
        .comments{
          width: 100%;
          .comment{
            cursor: pointer;
            padding: 10px 0;
            color: #404040;
            font-size: 14px;
            border-bottom: 1px solid rgba(0,0,0,0.0785);
            &:hover{
              color: rgba(255, 69, 0, 0.8);
            }
          }
        }
      }
      .admin{
        border-bottom: 1px solid transparent;
        font-size: 18px;
        padding-bottom: 10px;
        width: 80px;
        cursor: pointer;
        transition: border-bottom .5s;
        &:hover{
          border-bottom: 1px solid rgba(0,0,0,0.185);
        }
      }
    }
  }
  @media all and (min-width: 960px) and (max-width: 1200px){
    .search-right{
      background-color: rgba(255, 255, 255, 0.9);
      box-sizing: border-box;
      width: 32%;
      float: right;
      padding: 10px 0 10px 40px;
      margin-right: 10px;
      .search-title-wrap{
        border-bottom: 1px solid rgba(0,0,0,0.0785);
        width: 80%;
        font-size: 18px;
        .search-title{
          color: rgba(0,0,0,.8);
          padding-bottom: 10px;
          width: 80px;
          border-bottom: 1px solid #2c3e50;
        }
      }
      .input-wrap{
        height: 30px;
        margin: 25px 0;
        width: 80%;
        position: relative;
        input{
          padding: 2px 0;
          border: 1px solid #eee;
          width: 100%;
          height: 100%;
          text-indent: 10px;
          font-size: 14px;
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          &:focus{
            border: 1px solid #409EFF;
          }
        }
        .iconfont{
          width: 35px;
          text-align: center;
          height: 33px;
          font-size: 16px;
          line-height: 33px;
          position: absolute;
          right: -1px;
          top: 1px;
          background: rgba(255,255,255,1);
          cursor: pointer;
        }
      }
      .bloger-wrap{
        width: 80%;
        font-size: 18px;
        .bloger-title-wrap{
          border-bottom: 1px solid rgba(0,0,0,0.0785);
          width: 100%;
          font-size: 18px;
          .bloger-title{
            color: rgba(0,0,0,.8);
            padding-bottom: 10px;
            width: 80px;
            border-bottom: 1px solid #2c3e50;
          }
        }
        .bloger-bottom{
          margin-top: 25px;
          width: 100%;
          height: 150px;
          .img-wrap{
            width: 80px;
            height: 130px;
            float: left;
            .connect{
              margin-top: 15px;
              width: 80px;
              height: 30px;
              text-align: center;
              border-bottom: 1px solid rgba(0, 0, 0, 0.0785);
              a{
                font-size: 20px;
                display: inline-block;
                color: black;
                &:last-child{
                  margin-left: 15px;
                }
              }
            }
            img{
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }
          }
          .bloger-info{
            .w-h-f(100px,100px,right);
            .info{
              display: block;
              font-size: 16px;
              color: #aaa;
              .font-color{
                color: black;
              }
              .article{
                color: #fdcb6e;
              }
              .comment{
                color: #55efc4;
              }
              .now-watch{
                color: #f35626;
              }
            }
            .cursor-hand{
              &:hover{
                cursor: pointer;
                color: orangered;
              }
            }
          }
        }
      }
      .most-comments-wrap{
        width: 80%;
        margin-top: 20px;
        .comments-title-wrap{
          border-bottom: 1px solid rgba(0,0,0,0.0785);
          width: 100%;
          font-size: 18px;
          .comments-title{
            color: rgba(0,0,0,.8);
            padding-bottom: 10px;
            width: 150px;
            position: relative;
            &:after{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 80px;
              content: "";
              display: block;
              border-bottom: 1px solid #2c3e50;
            }
          }
        }
        .comments{
          width: 100%;
          .comment{
            cursor: pointer;
            padding: 10px 0;
            color: #404040;
            font-size: 13px;
            border-bottom: 1px solid rgba(0,0,0,0.0785);;
          }
        }
      }
      .admin{
        border-bottom: 1px solid transparent;
        font-size: 18px;
        padding: 20px 0 10px 0;
        width: 80px;
        cursor: pointer;
        transition: border-bottom .5s;
        &:hover{
          border-bottom: 1px solid rgba(0,0,0,0.185);
        }
      }
    }
  }
  @media all and (max-width: 960px) and (min-width: 768px){
    .search-right{
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 0 10px 20px;
      box-sizing: border-box;
      width: 32%;
      float: right;
      .search-title-wrap{
        border-bottom: 1px solid rgba(0,0,0,0.0785);
        width: 85%;
        font-size: 16px;
        .search-title{
          color: rgba(0,0,0,.8);
          padding-bottom: 10px;
          width: 80px;
          border-bottom: 1px solid #2c3e50;
        }
      }
      .input-wrap{
        height: 30px;
        margin: 25px 0;
        width: 85%;
        position: relative;
        input{
          padding: 2px 0;
          border: 1px solid #eee;
          width: 100%;
          height: 100%;
          text-indent: 10px;
          font-size: 13px;
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          &:focus{
            border: 1px solid #409EFF;
          }
        }
        .iconfont{
          width: 35px;
          text-align: center;
          height: 33px;
          font-size: 16px;
          line-height: 33px;
          position: absolute;
          right: -1px;
          top: 1px;
          background: rgba(255,255,255,1);
          cursor: pointer;
        }
      }
      .bloger-wrap{
        width: 85%;
        padding-bottom: 10px;
        font-size: 16px;
        .bloger-title-wrap{
          border-bottom: 1px solid rgba(0,0,0,0.0785);
          width: 100%;
          font-size: 16px;
          .bloger-title{
            color: rgba(0,0,0,.8);
            padding-bottom: 10px;
            width: 80px;
            border-bottom: 1px solid #2c3e50;
          }
        }
        .bloger-bottom{
          margin-top: 10px;
          width: 100%;
          .img-wrap{
            width: 90%;
            height: 130px;
            .connect{
              margin-top: 15px;
              width: 80px;
              height: 30px;
              text-align: center;
              border-bottom: 1px solid rgba(0, 0, 0, 0.0785);
              a{
                font-size: 20px;
                display: inline-block;
                color: black;
                &:last-child{
                  margin-left: 15px;
                }
              }
            }
            img{
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }
          }
          .bloger-info{
            padding-left: 10px;
            margin-top: 10px;
            width: 90%;
            height: 80px;
            .info{
              display: block;
              font-size: 16px;
              color: #aaa;
              .font-color{
                color: black;
              }
              .article{
                color: #fdcb6e;
              }
              .comment{
                color: #55efc4;
              }
              .now-watch{
                color: #f35626;
              }
            }
            .cursor-hand{
              &:hover{
                cursor: pointer;
                color: orangered;
              }
            }
          }
        }
      }
      .most-comments-wrap{
        width: 85%;
        margin-top: 20px;
        padding-bottom: 10px;
        .comments-title-wrap{
          border-bottom: 1px solid rgba(0,0,0,0.0785);
          width: 100%;
          font-size: 16px;
          .comments-title{
            color: rgba(0,0,0,.8);
            padding-bottom: 10px;
            width: 150px;
            position: relative;
            &:after{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 80px;
              content: "";
              display: block;
              border-bottom: 1px solid #2c3e50;
            }
          }
        }
        .comments{
          width: 100%;
          .comment{
            cursor: pointer;
            padding: 10px 0;
            color: #404040;
            font-size: 12px;
            border-bottom: 1px solid rgba(0,0,0,0.0785);;
          }
        }
      }
      .admin{
        border-bottom: 1px solid transparent;
        font-size: 16px;
        padding: 10px 0 10px 0;
        width: 70px;
        cursor: pointer;
        transition: border-bottom .5s;
        color: rgba(0, 0, 0, 0.8);
        &:hover{
          border-bottom: 1px solid rgba(0,0,0,0.185);
        }
      }
    }
  }
  @media all and (max-width: 768px){
    .search-right{
      background-color: rgba(255, 255, 255, 0.9);
      box-sizing: border-box;
      width: 100%;
      padding: 0.8rem 0 1rem 0.6rem;
      margin-right: 10px;
      .search-title-wrap{
        border-bottom: 1px solid rgba(0,0,0,0.0785);
        width: 85%;
        font-size: 0.45rem;
        .search-title{
          color: rgba(0,0,0,.8);
          padding-bottom: 0.3rem;
          width: 2.9rem;
          border-bottom: 1px solid #2c3e50;
        }
      }
      .input-wrap{
        height: 0.9rem;
        margin: 0.7rem 0;
        width: 85%;
        position: relative;
        z-index: 1;
        input{
          padding: 0.1rem 0;
          border: 1px solid #eee;
          width: 100%;
          height: 100%;
          text-indent: 0.3rem;
          font-size: 0.4rem;
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          &:focus{
            border: 1px solid #409EFF;
          }
        }
        .iconfont{
          width: 1.02rem;
          text-align: center;
          height: 1rem;
          font-size: 0.5rem;
          line-height: 1rem;
          position: absolute;
          right: -0.01rem;
          top: 0.02rem;
          background: rgba(255,255,255,1);
          cursor: pointer;
        }
      }
      .bloger-wrap{
        padding: 0.2rem 0;
        width: 85%;
        .bloger-title-wrap{
          border-bottom: 1px solid rgba(0,0,0,0.0785);
          width: 100%;
          font-size: 0.45rem;
          .bloger-title{
            color: rgba(0,0,0,.8);
            padding-bottom: 0.3rem;
            width: 2.5rem;
            border-bottom: 1px solid #2c3e50;
          }
        }
        .bloger-bottom{
          margin-top: 0.7rem;
          width: 100%;
          overflow: hidden;
          .img-wrap{
            float: left;
            width: 40%;
            height: 3.5rem;
            .connect{
              margin-top: 0.4rem;
              width: 2rem;
              height: 0.8rem;
              text-align: center;
              border-bottom: 1px solid rgba(0, 0, 0, 0.0785);
              a{
                font-size: 0.5rem;
                display: inline-block;
                color: black;
                &:last-child{
                  margin-left: 0.35rem;
                }
              }
            }
            img{
              width: 2.15rem;
              height: 2.15rem;
              border-radius: 1.075rem;
            }
          }
          .bloger-info{
            font-size: 0.4rem;
            float: left;
            width: 40%;
            height: 80px;
            .info{
              display: block;
              font-size: 16px;
              color: #aaa;
              .font-color{
                color: black;
              }
              .article{
                color: #fdcb6e;
              }
              .comment{
                color: #55efc4;
              }
              .now-watch{
                color: #f35626;
              }
            }
            .cursor-hand{
              &:hover{
                cursor: pointer;
                color: orangered;
              }
            }
          }
        }
      }
      .most-comments-wrap{
        margin-top: 0.3rem;
        width: 85%;
        .comments-title-wrap{
          border-bottom: 1px solid rgba(0,0,0,0.0785);
          width: 100%;
          font-size: 0.45rem;
          .comments-title{
            color: rgba(0,0,0,.8);
            padding-bottom: 0.3rem;
            width: 5rem;
            position: relative;
            &:after{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 2.5rem;
              content: "";
              display: block;
              border-bottom: 1px solid #2c3e50;
            }
          }
        }
        .comments{
          width: 100%;
          .comment{
            cursor: pointer;
            padding: 0.3rem 0;
            color: #404040;
            font-size: 0.35rem;
            border-bottom: 1px solid rgba(0,0,0,0.0785);;
          }
        }
      }
    }
  }
</style>
