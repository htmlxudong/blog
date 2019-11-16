<template>
  <div class="home-wrap">
    <div class="container">
      <div class="content">
        <div class="home-blog-wrap">
          <div class="two-blog" v-for="(blog,index) in blogList" :key="index" @click="toBlogDetail(index)">
            <div class="record-left">
              <div class="p-wrap">
                <p class="date"><span class="iconfont icon-shijian"></span> {{blog.time }}</p>
                <p class="watch"><span class="iconfont icon-liulan1"></span>{{blog.browse}}&nbsp;浏览</p>
                <p class="comment"><span class="iconfont icon-pinglun"></span>{{blog.comment}}&nbsp;评论</p>
              </div>
            </div>
            <div class="img-wrap">
              <img :src="blog.imageUrl" alt="">
            </div>
            <div class="right-content">
              <h4 class="title">{{blog.blogTitle}}</h4>
              <p class="date-tags-wrap"><span class="tag-two iconfont icon-biaoqian1"></span>{{blog.tags}}</p>
              <div class="word-content" v-html="blog.blogDesc"></div>
              <span class="diyFont iconfont icon-GraphCompute-blue"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState  } from 'vuex'
  export default {
    name: 'index.vue',
    computed: {
      ...mapState(['blogList'])
    },
    methods: {
      toBlogDetail (id) {
        this.$router.push('/blogDetail?id='+id)
      }
    }
  }
</script>

<style lang="less">
  .left-nav{
    display: none;
  }
  @media all and (min-width: 1200px) {
    .home-wrap{
      background-color: #eee;
      box-sizing: border-box;
      width: 100%;
      padding-top: 120px;
      .container{
        box-sizing: border-box;
        width: 100%;
        color: #999999;
        .content{
          width: 900px;
          position: relative;
          margin: 0 auto;
          .home-blog-wrap{
            width: 100%;
            min-height: 600px;
            margin: 0 auto;
            padding-bottom: 40px;
            .two-blog{
              background-color: rgba(255,255,255,1);
              width: 97%;
              height: 210px;
              margin-bottom: 1px;
              border-left: solid 4px #fff;
              .record-left{
                border-radius: 5px 0 0 5px;
                float: left;
                width: 26%;
                height: 100%;
                .p-wrap{
                  text-align: left;
                  .iconfont{
                    padding-right: 5px;
                  }
                  p{
                    font-size: 16px;
                    width: 80%;
                    height: 50px;
                    line-height: 50px;
                    margin: 10px auto;
                    border-bottom: 1px solid #DCDFE6;
                  }
                }
              }
              .img-wrap{
                box-sizing: border-box;
                float: left;
                width: 250px;
                height: 100%;
                padding: 10px;
                img{
                  border-radius: 5px;
                  width: 100%;
                  height: 100%;
                }
              }
              .right-content{
                float: right;
                width: 43%;
                height: 100%;
                position: relative;
                .title{
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  color: #555;
                  font-size: 18px;
                  width: 98%;
                  height: 30px;
                  padding-top: 15px;
                  text-align: center;
                }
                .date-tags-wrap{
                  color: #aaa;
                  font-size: 13px;
                  width: 100%;
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  .iconfont{
                    font-size: 13px;
                    padding-right: 5px;
                  }
                }
                .word-content{
                  h1,h2,h3,h4,h5,strong{
                    font-weight: 400;
                    font-size: 14px;
                  }
                  overflow: hidden;
                  width: 95%;
                  box-sizing: border-box;
                  line-height: 30px;
                  height: 45%;
                  color: #999;
                  font-size: 13px;
                  padding: 10px 30px;
                }
                .diyFont{
                  color: #aaa;
                  position: absolute;
                  right: 10px;
                  bottom: 10px;
                  font-size: 22px;
                }
              }
              &:hover{
                border-left: solid 4px rgba(255, 69, 0, 0.7);
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 1200px ) and (min-width: 960px) {
    .home-wrap{
      width: 100%;
      background-color: #eee;
      box-sizing: border-box;
      padding-top: 110px;
      .container{
        color: #999999;
        width: 100%;
        .content{
          width: 800px;
          position: relative;
          margin: 0 auto;
          .home-blog-wrap{
            width: 100%;
            min-height: 600px;
            margin: 0 auto;
            padding-bottom: 30px;
            .two-blog{
              background-color: rgba(255,255,255,1);
              margin-bottom: 1px;
              border-left: solid 4px #fff;
              width: 97%;
              height: 210px;
              transition: .3s transform,.3s box-shadow;
              .record-left{
                border-radius: 5px 0 0 5px;
                float: left;
                width: 20%;
                height: 100%;
                .p-wrap{
                  text-align: left;
                  .iconfont{
                    padding-right: 5px;
                  }
                  p{
                    font-size: 16px;
                    width: 80%;
                    height: 50px;
                    line-height: 50px;
                    margin: 10px auto;
                    border-bottom: 1px solid #DCDFE6;
                  }
                }
              }
              .img-wrap{
                box-sizing: border-box;
                float: left;
                width: 250px;
                height: 100%;
                padding: 10px;
                img{
                  border-radius: 5px;
                  width: 100%;
                  height: 100%;
                }
              }
              .right-content{
                float: right;
                width: 43%;
                height: 100%;
                position: relative;
                .title{
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  color: #555;
                  font-size: 18px;
                  width: 98%;
                  height: 30px;
                  padding-top: 15px;
                  text-align: center;
                }
                .date-tags-wrap{
                  color: #999;
                  font-size: 12px;
                  width: 100%;
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  .iconfont{
                    padding-right: 10px;
                  }
                }
                .word-content{
                  h2,h1,h4,h3,h5{
                    font-weight: 400;
                    font-size: 14px;
                  }
                  ol>li,ul>li{
                    list-style: none;
                  }
                  overflow: hidden;
                  height: 45%;
                  color: #aaa;
                  line-height: 30px;
                  font-size: 14px;
                  padding: 10px 30px;
                }
                .diyFont{
                  color: #aaa;
                  position: absolute;
                  right: 10px;
                  bottom: 10px;
                  font-size: 22px;
                }
              }
              &:hover{
                border-left: solid 4px rgba(255, 69, 0, 0.7);
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 960px ) and (min-width: 768px){
    .home-wrap{
      box-sizing: border-box;
      width: 100%;
      padding-top: 110px;
      background-color: #eee;
      .container{
        box-sizing: border-box;
        width: 100%;
        color: #999999;
        .content{
          width: 680px;
          position: relative;
          margin: 0 auto;
          .home-blog-wrap{
            width: 100%;
            min-height: 600px;
            padding-bottom: 30px;
            margin: 0 auto;
            .two-blog{
              border-left: solid 4px #f7f7f2;
              background-color: rgba(255,255,255,1);
              margin-bottom: 1px;
              width: 100%;
              height: 210px;
              .record-left{
                float: left;
                width: 20%;
                height: 100%;
                background-color: #f7f7f2;
                .p-wrap{
                  text-align: left;
                  .iconfont{
                    padding-right: 5px;
                  }
                  p{
                    font-size: 15px;
                    width: 80%;
                    height: 50px;
                    line-height: 30px;
                    margin: 20px auto;
                    border-bottom: 1px solid #DCDFE6;
                  }
                }
              }
              .img-wrap{
                box-sizing: border-box;
                float: left;
                width: 210px;
                height: 200px;
                padding: 30px 10px 10px 10px;
                img{
                  border-radius: 5px;
                  width: 100%;
                  height: 100%;
                }
              }
              .right-content{
                float: right;
                width: 43%;
                height: 100%;
                color: rgba(0,0,0,0.7);
                position: relative;
                .title{
                  margin: 0 auto;
                  font-size: 16px;
                  width: 95%;
                  height: 30px;
                  padding-top: 15px;
                  text-align: center;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .date-tags-wrap{
                  font-size: 12px;
                  width: 100%;
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  .iconfont{
                    padding-right: 10px;
                  }
                }
                .word-content{
                  h2,h1,h4,h3,h5{
                    font-weight: 400;
                    font-size: 14px;
                  }
                  ol>li,ul>li{
                    list-style: none;
                  }
                  overflow: hidden;
                  height: 39%;
                  color: #aaa;
                  line-height: 30px;
                  font-size: 14px;
                  padding: 10px 30px;
                }
                .diyFont{
                  color: #aaa;
                  position: absolute;
                  right: 10px;
                  bottom: 5px;
                  font-size: 22px;
                }
              }
              &:hover{
                border-left: solid 4px rgba(255, 69, 0, 0.7);
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 768px){
    .home-wrap{
      box-sizing: border-box;
      width: 100%;
      position: relative;
      z-index: 10;
      background-color: #eee;
      .container{
        box-sizing: border-box;
        width: 100%;
        color: #999999;
        .content{
          width: 90%;
          margin: 1rem auto;
          .home-blog-wrap{
            width: 100%;
            min-height: 600px;
            margin: 0 auto;
            padding-top: 0.3rem;
            .two-blog{
              overflow: hidden;
              border-radius: 5px;
              background-color: rgba(255,255,255,1);
              margin-top: 1.2rem;
              width: 100%;
              height: 8.5rem;
              .record-left{
                width: 100%;
                border-radius: 5px 5px 0 0;
                height: 1rem;
                background-color: #f7f7f2;
                .p-wrap{
                  display: flex;
                  align-items: center;
                  .iconfont{
                    padding-right: 0.2rem;
                  }
                  p{
                    text-align: center;
                    font-size: 0.28rem;
                    width: 100%;
                    height: 1rem;
                    line-height: 1rem;
                  }
                }
              }
              .img-wrap{
                margin: 0.4rem auto;
                box-sizing: border-box;
                width: 70%;
                height: 4rem;
                img{
                  border-radius: 5px;
                  width: 100%;
                  height: 100%;
                }
              }
              .right-content{
                overflow: hidden;
                width: 80%;
                height: 2.4rem;
                margin: 0 auto;
                color: rgba(0,0,0,0.7);
                .title{
                  margin-left: 0.37rem;
                  font-size: 0.38rem;
                  width: 85%;
                  height: 0.8rem;
                  padding-top: 0.28rem;
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .date-tags-wrap{
                  font-size: 0.3rem;
                  width: 90%;
                  height: 0.5rem;
                  text-align: center;
                  .iconfont{
                    padding-right: 0.3rem;
                  }
                }
                .word-content{
                  h2,h1,h4,h3,h5{
                    font-weight: 400;
                    font-size: 0.33rem;
                  }
                  ol>li,ul>li{
                    list-style: none;
                  }
                  height: 53%;
                  color: #aaa;
                  line-height: 0.9rem;
                  font-size: 0.35rem;
                  padding: 0.2rem 0.3rem 0 0.35rem;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
