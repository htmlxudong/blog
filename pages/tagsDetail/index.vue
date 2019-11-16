<template>
  <div class="tags-detail-wrap">
    <div class="container">
      <div class="content">
        <div class="wall">
          <div class="wall-wrap">
            <h5 class="tags-title"> <span class="title-name">{{name}} </span><span class="count">总共 <span class="total">{{count}}</span>篇文章</span> </h5>
            <div class="link-detail-wrap">
              <ul class="file-list">
                <li class="item-file" v-for="(blog, index) in tagsBlog" :key="index">
                  <div class="file-name">
                    <div class="pull-left">
                      <div class="logo-box">
                        <img src="http://thgcgl.top/photo.jpg" alt="">
                      </div>
                      <div class="right-font">
                        <a href="/" class="author">徐东 </a>
                        <span class="publish">in</span>
                        <span class="tags-nme">{{name}}</span>
                      </div>
                    </div>
                    <span class="pull-right">{{blog.time}}</span>
                  </div>
                  <p class="blog-title" @click="toBlogDetail(blog)"><a href="#">{{blog.blogTitle}}</a> </p>
                  <div class="link">
                    <div class="link-left">
                      <span class="comments">{{blog.comment}} 评论 </span>  |  <span class="browse">{{blog.browse }} 浏览</span>
                    </div>
                    <div class="link-right" @click="toBlogDetail(blog)">
                      阅读全文
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
       <blogger/>
      </div>
    </div>
  </div>
</template>

<script>
import  { mapState } from 'vuex'
import blogger from '../../components/blogger/blogger.vue'
export default {
  name: 'tags-detail.vue',
  data () {
    return {
      name: '',
      count: 0
    }
  },
  computed: {
    ...mapState(['blogList','userInfo']),
    tagsBlog () {
      let result = this.blogList&&this.blogList.filter((item) => {
        return item.tags === this.name
      })
      return result
    }
  },
  mounted () {
    this.name = this.$route.query.name
    this.count = this.$route.query.count
  },
  methods: {
    toBlogDetail (blog) {
      let index = this.blogList.findIndex((item) => {
        return blog.id === item.id
      })
      this.$router.push('/blogDetail?id='+index)
    }
  },
  components: {
    blogger
  }
}
</script>

<style lang="less" scoped>
  // less 混合
  // 宽高和浮动的混合
  .w-h-f(@w,@h,@f){
    width: @w;
    height: @h;
    float: @f;
  }
@media all and (min-width: 1200px) {
  .tags-detail-wrap{
    width: 100%;
    padding-bottom: 30px;
    .container{
      width: 100%;
      padding-top: 120px;
      overflow: hidden;
      padding-left: 10px;
      box-sizing: border-box;
      margin: 0 auto;
      .content{
        margin: 0 auto;
        width: 1200px;
        overflow: hidden;
        .wall{
          background-color: rgba(255,255,255,.9);
          width: 65%;
          min-height: 620px;
          float: left;
          .tags-title{
            color: rgba(0, 0, 0, 0.8);
            box-sizing: border-box;
            font-size: 18px;
            height: 50px;
            padding: 12px 0;
            width: 95%;
            margin-left: 20px;
            .title-name{
              font-size: 16px;
              display: inline-block;
              font-weight: 550;
              color: #555;
            }
            .count{
              display: inline-block;
              font-size: 14px;
              width: 200px;
              margin-left: 10px;
              color: #aaa;
              .total{
                padding: 0 4px 0 2px;
                color: rgba(249,166,51,.9);
                font-size: 18px;
                display: inline-block;
              }
            }
          }
          .link-detail-wrap{
            background-color: rgba(255,255,255,.9);
            margin-top: 10px;
            width: 100%;
            height: 500px;
            .file-list{
              margin: 0 auto;
              width: 95%;
              .item-file{
                box-sizing: border-box;
                margin-top: 10px;
                padding: 10px;
                width: 100%;
                height: 150px;
                border: 1px solid #ececec;
                box-shadow: 0 1px 4px rgba(0,0,0,.04);
                color: #404040;
                .file-name{
                  width: 100%;
                  height: 40px;
                  line-height: 30px;
                  .pull-left{
                    width: 350px;
                    height: 35px;
                    float: left;
                    display: flex;
                    .logo-box{
                      width: 30px;
                      height: 30px;
                      img{
                        width: 30px;
                        border-radius: 50%;
                        height: 30px;
                      }
                    }
                    .right-font{
                      margin-left: 10px;
                      width: 270px;
                      letter-spacing: 1px;
                      a{
                        color: #404040;
                        display: inline-block;
                        text-decoration: none;
                        font-size: 16px;
                        width: 40px;
                        height: 40px;
                      }
                      .publish{
                        display: inline-block;
                        color: #c7c7c7;
                        font-size: 14px;
                      }
                      .tags-nme{
                        font-size: 16px;
                        margin-left: 5px;
                        display: inline-block;
                      }
                    }
                  }
                  .pull-right{
                    font-size: 16px;
                    color: #c7c7c7;
                    display: block;
                    float: right;
                  }
                }
                .blog-title{
                  box-sizing: border-box;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  display: inline-block;
                  cursor: pointer;
                  a{
                    color: #404040;
                    text-decoration: none;
                  }
                  color: #404040;
                  padding: 10px 15px 10px 5px;
                  height: 45px;
                  font-size: 18px;
                  position: relative;
                  &:after{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: #eaeaea;
                    transition:width .3s;
                  }
                  &:hover{
                    &:after{
                      width: 100%;
                    }
                  }
                }
                .link{
                  box-sizing: border-box;
                  width: 100%;
                  height: 40px;
                  padding: 10px 0 0 5px;
                  font-size: 14px;
                  .link-left{
                    float: left;
                    color: #404040;
                    .comments{
                      display: inline-block;
                      padding-right: 5px;
                    }
                    .browse{
                      display: inline-block;
                    }
                  }
                  .link-right{
                    cursor: pointer;
                    color: #404040;
                    float: right;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
@media all and (max-width: 1200px ) and (min-width: 960px) {
    .tags-detail-wrap{
      width: 100%;
      height: 100%;
      background-color: #eee;
      padding-top: 110px;
      padding-bottom: 30px;
      overflow-y: auto;
      .container{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding-left: 10px;
        margin: 0 auto;
        .content{
          width: 960px;
          overflow: hidden;
          .wall{
            margin-left: 30px;
            background-color: rgba(255,255,255,.9);
            width: 60%;
            min-height: 620px;
            float: left;
            .tags-title{
              color: rgba(0, 0, 0, 0.8);
              box-sizing: border-box;
              font-size: 18px;
              height: 50px;
              padding: 11px 0;
              width: 95%;
              margin-left: 20px;
              .title-name{
                font-size: 16px;
                display: inline-block;
                font-weight: 550;
                color: #555;
              }
              .count{
                display: inline-block;
                font-size: 14px;
                width: 200px;
                margin-left: 10px;
                color: #aaa;
                .total{
                  padding: 0 4px 0 2px;
                  color: rgba(249,166,51,.9);
                  font-size: 18px;
                  display: inline-block;
                }
              }
            }
            .link-detail-wrap{
              background-color: rgba(255,255,255,.9);
              width: 100%;
              .file-list{
                margin: 0 auto;
                width: 95%;
                .item-file{
                  box-sizing: border-box;
                  margin-top: 10px;
                  padding: 10px;
                  width: 100%;
                  height: 150px;
                  border: 1px solid #ececec;
                  box-shadow: 0 1px 4px rgba(0,0,0,.04);
                  color: #404040;
                  .file-name{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    .pull-left{
                      align-items: center;
                      width: 350px;
                      height: 35px;
                      float: left;
                      display: flex;
                      .logo-box{
                        width: 30px;
                        height: 30px;
                        img{
                          width: 30px;
                          border-radius: 50%;
                          height: 30px;
                        }
                      }
                      .right-font{
                        margin-left: 10px;
                        width: 270px;
                        letter-spacing: 1px;
                        a{
                          color: #404040;
                          display: inline-block;
                          text-decoration: none;
                          font-size: 16px;
                          width: 40px;
                          height: 40px;
                          &:hover{
                            color: orangered;
                          }
                        }
                        .publish{
                          display: inline-block;
                          color: #c7c7c7;
                          font-size: 14px;
                        }
                        .tags-nme{
                          font-size: 16px;
                          margin-left: 5px;
                          display: inline-block;
                        }
                      }
                    }
                    .pull-right{
                      font-size: 16px;
                      color: #c7c7c7;
                      display: block;
                      float: right;
                    }
                  }
                  .blog-title{
                    width: 100%;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: inline-block;
                    cursor: pointer;
                    a{
                      color: #404040;
                      text-decoration: none;
                    }
                    color: #404040;
                    padding: 10px 15px 10px 5px;
                    height: 45px;
                    font-size: 18px;
                    position: relative;
                    &:after{
                      content: '';
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      width: 0;
                      height: 1px;
                      background: #eaeaea;
                      transition: width .3s;
                    }
                    &:hover{
                      &:after{
                        width: 100%;
                      }
                    }
                  }
                  .link{
                    box-sizing: border-box;
                    width: 100%;
                    height: 40px;
                    padding: 10px 0 0 5px;
                    font-size: 14px;
                    .link-left{
                      float: left;
                      color: #404040;
                      .comments{
                        display: inline-block;
                        padding-right: 5px;
                      }
                      .browse{
                        display: inline-block;
                      }
                    }
                    .link-right{
                      cursor: pointer;
                      color: #404040;
                      float: right;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
@media all and (max-width: 960px ) and (min-width: 768px) {
    .tags-detail-wrap{
      width: 100%;
      height: 100%;
      background-color: #eee;
      overflow-y: auto;
      padding-top: 110px;
      padding-bottom: 30px;
      .container{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding-left:10px;
        margin: 0 auto;
        .content{
          width: 768px;
          overflow: hidden;
          .wall{
            margin-left: 10px;
            background-color: rgba(255,255,255,.9);
            width: 60%;
            min-height: 750px;
            float: left;
            .tags-title{
              color: rgba(0, 0, 0, 0.8);
              box-sizing: border-box;
              font-size: 18px;
              height: 50px;
              padding: 11px 0;
              width: 95%;
              margin-left: 20px;
              .title-name{
                font-size: 16px;
                display: inline-block;
                font-weight: 550;
                color: #555;
              }
              .count{
                display: inline-block;
                font-size: 14px;
                width: 200px;
                margin-left: 10px;
                color: #aaa;
                .total{
                  padding: 0 4px 0 2px;
                  color: rgba(249,166,51,.9);
                  font-size: 18px;
                  display: inline-block;
                }
              }
            }
            .link-detail-wrap{
              width: 100%;
              background-color: rgba(255,255,255,.9);
              .file-list{
                margin: 0 auto;
                width: 95%;
                .item-file{
                  box-sizing: border-box;
                  margin-top: 10px;
                  padding: 10px;
                  width: 100%;
                  height: 140px;
                  border: 1px solid #ececec;
                  box-shadow: 0 1px 4px rgba(0,0,0,.04);
                  color: #404040;
                  .file-name{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    .pull-left{
                      width: 290px;
                      height: 40px;
                      float: left;
                      display: flex;
                      align-items: center;
                      .logo-box{
                        width: 30px;
                        height: 30px;
                        img{
                          width: 30px;
                          border-radius: 50%;
                          height: 30px;
                        }
                      }
                      .right-font{
                        margin-left: 10px;
                        width: 300px;
                        a{
                          color: #404040;
                          display: inline-block;
                          text-decoration: none;
                          font-size: 16px;
                          width: 40px;
                          height: 40px;
                          &:hover{
                            color: orangered;
                          }
                        }
                        .publish{
                          display: inline-block;
                          color: #c7c7c7;
                          font-size: 14px;
                        }
                        .tags-nme{
                          font-size: 14px;
                          margin-left: 5px;
                          display: inline-block;
                        }
                      }
                    }
                    .pull-right{
                      font-size: 14px;
                      color: #c7c7c7;
                      display: block;
                      float: right;
                    }
                  }
                  .blog-title{
                    width: 100%;
                    display: inline-block;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    a{
                      color: #404040;
                      text-decoration: none;
                    }
                    box-sizing: border-box;
                    padding: 10px 15px 5px 5px;
                    height: 45px;
                    font-size: 16px;
                    position: relative;
                    &:after{
                      content: '';
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      width: 0;
                      height: 1px;
                      background: #eaeaea;
                      transition: width .3s;
                    }
                    &:hover{
                      &:after{
                        width: 100%;
                      }
                    }
                  }
                  .link{
                    box-sizing: border-box;
                    width: 100%;
                    height: 30px;
                    padding: 10px 0 0 5px;
                    font-size: 14px;
                    .link-left{
                      float: left;
                      color: #404040;
                      .comments{
                        display: inline-block;
                        padding-right: 5px;
                      }
                      .browse{
                        display: inline-block;
                      }
                    }
                    .link-right{
                      cursor: pointer;
                      color: #404040;
                      float: right;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
@media all and (max-width: 768px) {
    .tags-detail-wrap{
      width: 100%;
      height: 100%;
      background-color: #eee;
      overflow-y: auto;
      .container{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding: 2.5rem 0.3rem 0.3rem 0.3rem;
        .content{
          width: 100%;
          overflow: hidden;
          .wall{
            background-color: rgba(255,255,255,.9);
            width: 100%;
            min-height: 10rem;
            .tags-title{
              color: rgba(0, 0, 0, 0.8);
              box-sizing: border-box;
              font-size: 0.45rem;
              height: 1.5rem;
              padding: 0.32rem 0;
              width: 95%;
              margin-left: 0.45rem;
              .count{
                display: inline-block;
                font-size: 0.4rem;
                width: 4rem;
                margin-left: 10px;
                color: #aaa;
                .total{
                  padding: 0 0.1rem 0 0.08rem;
                  color: rgba(249,166,51,.9);
                  font-size: 0.5rem;
                  display: inline-block;
                }
              }
            }
            .link-detail-wrap{
              background-color: rgba(255,255,255,.9);
              width: 100%;
              .file-list{
                margin: 0 auto;
                width: 95%;
                .item-file{
                  border-radius: 0.08rem;
                  box-sizing: border-box;
                  padding: 0.3rem;
                  width: 100%;
                  height: 4.1rem;
                  border: 1px solid #ececec;
                  box-shadow: 0 1px 4px rgba(0,0,0,.04);
                  color: #404040;
                  .file-name{
                    width: 100%;
                    height: 1.4rem;
                    .pull-left{
                      width: 6rem;
                      height: 1.5rem;
                      float: left;
                      display: flex;
                      align-items: center;
                      .logo-box{
                        width: 1.1rem;
                        height: 1.5rem;
                        img{
                          width: 1.1rem;
                          border-radius: 1.1rem;
                          height: 1.1rem;
                        }
                      }
                      .right-font{
                        margin-left: 0.25rem;
                        a{
                          color: #404040;
                          display: inline-block;
                          text-decoration: none;
                          font-size: 0.5rem;
                          width: 1.333rem;
                          height: 1.1rem;
                          &:hover{
                            color: orangered;
                          }
                        }
                        .publish{
                          display: inline-block;
                          color: #c7c7c7;
                          font-size: 0.45rem;
                        }
                        .tags-nme{
                          font-size: 0.45rem;
                          margin-left: 0.2rem;
                          display: inline-block;
                        }
                      }
                    }
                    .pull-right{
                      font-size: 0.4rem;
                      color: #c7c7c7;
                      display: block;
                      float: right;
                      height: 1.5rem;
                      line-height: 1.2rem;
                    }
                  }
                  .blog-title{
                    width: 95%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    a{
                      color: #404040;
                      text-decoration: none;
                    }
                    margin-top: 0.3rem;
                    height: 1rem;
                    font-size: 0.45rem;
                  }
                  .link{
                    box-sizing: border-box;
                    width: 100%;
                    height: 50px;
                    padding-top: 5px;
                    font-size: 0.4rem;
                    .link-left{
                      float: left;
                      color: #404040;
                      .comments{
                        display: inline-block;
                        padding-right: 5px;
                      }
                      .browse{
                        display: inline-block;
                      }
                    }
                    .link-right{
                      cursor: pointer;
                      color: #404040;
                      float: right;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
