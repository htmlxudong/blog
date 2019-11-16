<template>
  <div class="search-wrap">
    <div class="container">
      <div class="content">
        <div class="input-wrap">
          <div class="input">
            <el-input
              placeholder="请输入内容"
              v-model="value"
              clearable>
            </el-input>
          </div>
          <div class="btn">
            <button class="search" @click="searchArticle">搜索</button>
          </div>
        </div>
        <div class="content-wrap">
          <ul class="file-list">
            <li class="item-file" v-for="(blog, index) in queryList" :key="index">
              <div class="file-name">
                <div class="pull-left">
                  <div class="logo-box">
                    <img src="http://thgcgl.top/photo.jpg" alt="">
                  </div>
                  <div class="right-font">
                    <nuxt-link to="/about" class="author">徐东 </nuxt-link>
                    <span class="publish">in</span>
                    <span class="tags-nme">{{blog.tags}}</span>
                  </div>
                </div>
                <span class="pull-right">{{blog.time}}</span>
              </div>
              <p class="blog-title"><a href="#" @click="toBlogDetail(blog)">{{blog.blogTitle}}</a> </p>
              <div class="link">
                <div class="link-left">
                  <span class="comments">{{blog.comment}} 评论 </span>  |  <span class="browse">{{blog.browse}} 浏览</span>
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
  </div>
</template>

<script>
import format from 'date-fns/format'
import { mapState } from  'vuex'
import { _query } from '../../common/api'
export default {
  name: 'index.vue',
  data () {
    return {
      value: '',
      queryList: []
    }
  },
  computed: {
    ...mapState(['blogList'])
  },
  created () {
    this.value = this.$route.query.name.trim()
    if(this.value) {
      // 调用搜索功能
      this.searchArticle()
    }
  },
  methods: {
   async searchArticle () {
     let res = await _query(this.value)
       if(res.code === 0){
           this.queryList = res.data
           this.queryList.forEach(item => {
           item.time = format(item.time,'yyyy-MM-dd')
         })
       }
    },
    toBlogDetail (blog) {
      let index = this.blogList.findIndex((item) => {
        return blog.id === item.id
      })
      this.$router.push('/blogDetail?id='+index)
    }
  }
}
</script>

<style lang="less" scoped>
  @media all and (min-width: 1200px) {
    .search-wrap{
      width: 100%;
      overflow: hidden;
      min-height: 98vh;
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
          padding: 10px 0 10px 0;
          min-height: 500px;
          background-color: rgba(255,255,255,.9);
          box-sizing: border-box;
          width: 900px;
          overflow: hidden;
          .input-wrap{
            box-sizing: border-box;
            padding-top: 40px;
            width: 880px;
            height: 120px;
            .input{
              padding-left: 20px;
              float: left;
              width: 720px;
            }
            .btn{
              float: right;
              width: 100px;
              height: 50px;
              .search{
                color: #404040;
                border-radius: 5px;
                background-color: transparent;
                border: 1px solid #aaa;
                cursor: pointer;
                font-size: 18px;
                width: 100%;
                height: 40px;
                line-height: 40px;
                &:hover{
                  color: #aaa;
                }
              }
            }
          }
          .content-wrap{
            box-sizing: border-box;
            padding-left: 20px;
            width: 880px;
            .file-list{
              width: 84%;
              .item-file{
                box-sizing: border-box;
                margin-bottom: 20px;
                padding: 10px;
                width: 100%;
                height: 135px;
                border: 1px solid #ececec;
                box-shadow: 0 1px 4px rgba(0,0,0,.04);
                color: #404040;
                .file-name{
                  width: 100%;
                  height: 40px;
                  .pull-left{
                    width: 400px;
                    height: 40px;
                    float: left;
                    display: flex;
                    line-height: 40px;
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
                        color: rgba(0,0,0,.38);
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
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    color: #c7c7c7;
                    display: block;
                    float: right;
                  }
                }
                .blog-title{
                  cursor: pointer;
                  display: inline-block;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  a{
                    color: #404040;
                    text-decoration: none;
                  }
                  color: #404040;
                  box-sizing: border-box;
                  padding: 10px 15px 5px 5px;
                  height: 40px;
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
                  height: 50px;
                  padding-top: 5px;
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
                    cursor: pointer;s
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
  @media all and (max-width: 1200px ) and (min-width: 960px) {
    .search-wrap{
      background-color: #eee;
      width: 100%;
      min-height: 100vh;
      position: relative;
      padding-top: 110px;
      padding-bottom: 30px;
      box-sizing: border-box;
      .container{
        margin: 0 auto;
        box-sizing: border-box;
        padding: 10px 50px 20px 20px;
        width: 800px;
        position: relative;
        left: -40px;
        min-height: 500px;
        background-color: rgba(255,255,255,.9);
        .content{
          .input-wrap{
            box-sizing: border-box;
            padding-top: 20px;
            width: 100%;
            height: 100px;
            .input{
              float: left;
              width: 600px;
            }
            .btn{
              float: right;
              width: 90px;
              height: 50px;
              .search{
                color: #404040;
                border-radius: 5px;
                background-color: transparent;
                border: 1px solid #aaa;
                cursor: pointer;
                font-size: 18px;
                width: 100%;
                height: 40px;
                line-height: 40px;
                &:hover{
                  color: #aaa;
                }
              }
            }
          }
          .content-wrap{
            width: 710px;
            .file-list{
              margin: 0 auto;
              width: 100%;
              .item-file{
                box-sizing: border-box;
                margin-bottom: 20px;
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
                    width: 400px;
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
                        color: rgba(0,0,0,.38);
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
                    font-size: 14px;
                    color: #c7c7c7;
                    display: block;
                    float: right;
                  }
                }
                .blog-title{
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  cursor: pointer;
                  a{
                    color: #404040;
                    text-decoration: none;
                  }
                  color: #404040;
                  padding: 10px 15px 10px 5px;
                  height: 40px;
                  box-sizing: border-box;
                  display: inline-block;
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
                  padding: 10px 0 0 5px;
                  width: 100%;
                  height: 40px;
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
  @media all and (max-width:  960px) and (min-width: 768px) {
    .search-wrap{
      width: 100%;
      padding-bottom: 30px;
      padding-top: 110px;
      .container{
        margin: 0 auto;
        padding: 0 20px 10px 20px;
        box-sizing: border-box;
        width: 85%;
        background-color: rgba(255,255,255,.9);
        min-height: 500px;
        .content{
          .input-wrap{
            box-sizing: border-box;
            padding-top: 30px;
            width: 100%;
            height: 100px;
            .input{
              float: left;
              width: 81%;
            }
            .btn{
              float: right;
              width: 90px;
              height: 50px;
              .search{
                color: #555;
                border-radius: 5px;
                background-color: transparent;
                border: 1px solid #aaa;
                cursor: pointer;
                font-size: 16px;
                font-weight: 550;
                width: 100%;
                height: 40px;
                line-height: 40px;
                &:hover{
                  color: #aaa;
                }
              }
            }
          }
          .content-wrap{
            width: 100%;
            .file-list{
              margin: 0 auto;
              width: 100%;
              .item-file{
                margin-bottom: 20px;
                box-sizing: border-box;
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
                    width: 380px;
                    height: 30px;
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
                        color: rgba(0,0,0,.38);
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
                    font-size: 14px;
                    color: #c7c7c7;
                    display: block;
                    float: right;
                  }
                }
                .blog-title{
                  display: inline-block;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  a{
                    color: #404040;
                    text-decoration: none;
                  }
                  color: #404040;
                  cursor: pointer;
                  box-sizing: border-box;
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
                  height: 50px;
                  padding-top: 5px;
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
  @media all and (max-width: 768px) {
    .search-wrap{
      width: 100%;
      .container{
        padding: 2rem 0 1rem 0;
        width: 100%;

        .content{
          box-sizing: border-box;
          padding: 0.5rem 0.35rem 0.1rem 0.35rem;
          width: 100%;
          min-height: 12rem;
          background-color: rgba(255,255,255,.9);
          .input-wrap{
            box-sizing: border-box;
            width: 100%;
            height: 2rem;
            .input{
              float: left;
              width: 75%;
            }
            .btn{
              float: right;
              width: 2rem;
              height: 40px;
              .search{
                color: #404040;
                border-radius: 5px;
                background-color: transparent;
                border: 1px solid #aaa;
                cursor: pointer;
                font-size: 0.4rem;
                font-weight: 550;
                width: 100%;
                height: 40px;
                line-height: 40px;
                &:hover{
                  color: #aaa;
                }
              }
            }
          }
          .content-wrap{
            width: 100%;
            .file-list{
              width: 95%;
              .item-file{
                margin-bottom: 0.5rem;
                box-sizing: border-box;
                padding: 10px;
                width: 100%;
                height: 3.4rem;
                border: 1px solid #ececec;
                box-shadow: 0 1px 4px rgba(0,0,0,.04);
                color: #404040;
                .file-name{
                  width: 100%;
                  height: 1rem;
                  line-height: 1rem;
                  display: flex;
                  .pull-left{
                    width: 6rem;
                    height: 1rem;
                    display: flex;
                    align-items: center;
                    .logo-box{
                      width: 0.8rem;
                      height: 0.8rem;
                      img{
                        width: 0.8rem;
                        border-radius: 0.4rem;
                        height: 0.8rem;
                      }
                    }
                    .right-font{
                      margin-left: 0.3rem;
                      width: 5rem;
                      a{
                        color: rgba(0,0,0,.38);
                        display: inline-block;
                        text-decoration: none;
                        font-size: 0.4rem;
                        width: 1rem;
                        height: 0.8rem;
                      }
                      .publish{
                        display: inline-block;
                        color: #c7c7c7;
                        font-size: 0.35rem;
                      }
                      .tags-nme{
                        font-size: 0.4rem;
                        margin-left: 0.2rem;
                        display: inline-block;
                      }
                    }
                  }
                  .pull-right{
                    text-align: right;
                    line-height: 1rem;
                    width: 2.5rem;
                    font-size: 0.35rem;
                    color: #c7c7c7;
                    display: block;
                  }
                }
                .blog-title{
                  width: 100%;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  a{
                    color: #404040;
                    text-decoration: none;
                  }
                  color: #404040;
                  height: 1rem;
                  line-height:1rem;
                  font-size: 0.4rem;
                }
                .link{
                  box-sizing: border-box;
                  width: 100%;
                  height: 1rem;
                  padding-top: 0.2rem;
                  font-size: 0.35rem;
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
</style>
