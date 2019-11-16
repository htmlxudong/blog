<template>
  <div class="file-wrap">
    <div class="container">
      <div class="content">
        <div class="wall">
          <h5 class="title"> <span class="iconfont icon-lianjie-"></span>我的分享</h5>
          <div class="wall-wrap">
            <ul class="file-list">
              <li class="item-file" v-for="(file, index) in fileList" :key="index">
                <h4 class="file-name"><a :href="file.link"> #  {{file.filename}}</a></h4>
                <p class="desc">文档说明:  {{file.desc}}</p>
                <p class="link">站点地址:  <a :href="file.link" target="_blank">{{file.link}}</a></p>
              </li>
            </ul>
          </div>
        </div>
        <blogger/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState  } from 'vuex'
import blogger from '../../components/blogger/blogger.vue'
export default {
  name: 'index.vue',
  computed: {
    ...mapState(['fileList'])
  },
  components: {
    blogger
  }
}
</script>

<style lang="less" scoped>
  .w-h-f(@w,@h,@f){
    width: @w;
    height: @h;
    float: @f;
  }
  @media all and (min-width: 1200px) {
    .file-wrap{
      width: 100%;
      background-color: #eee;
      box-shadow: 0 1px 4px rgba(0,0,0,.04);
      padding-top: 120px;
      padding-bottom: 30px;
      box-sizing: border-box;
      .container{
        width: 100%;
        overflow: hidden;
        padding-left: 10px;
        box-sizing: border-box;
        .content{
          width: 1200px;
          margin: 0 auto;
          overflow: hidden;
          .wall{
            background-color: rgba(255,255,255,.8);
            float: left;
            width: 65%;
            min-height: 680px;
            .title{
              width: 95%;
              height: 30px;
              margin: 0 auto;
              font-size: 18px;
              padding: 10px 0;
              .iconfont{
                padding-right: 10px;
                color: #CA9A83;
              }
            }
            .wall-wrap{
              width: 95%;
              margin: 15px 0 15px 20px;
              .file-list{
                width: 98%;
                .item-file{
                  box-sizing: border-box;
                  margin-top: 10px;
                  padding: 10px;
                  width: 100%;
                  height: 95px;
                  border: 1px solid #ececec;
                  box-shadow: 0 1px 4px rgba(0,0,0,.04);
                  color: rgba(0,0,0,.6);
                  .file-name{
                    display: inline-block;
                    a{
                      text-decoration: none;
                      color: #42b983;
                    }
                    font-size: 18px;
                  }
                  .desc{
                    padding: 5px 0;
                    font-size: 14px;
                  }
                  .link{
                    font-size: 14px;
                    a{
                      color: rgba(0,0,0,.6);
                      &:hover{
                        color: #f35626;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
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
  }
  @media all and (max-width: 1200px ) and (min-width: 960px) {
    .file-wrap{
      width: 100%;
      background-color: #eee;
      box-shadow: 0 1px 4px rgba(0,0,0,.04);
      padding-top: 110px;
      padding-bottom: 30px;
      .container{
        width: 100%;
        overflow: hidden;
        padding-left: 10px;
        box-sizing: border-box;
        margin: 0 auto;
        .content{
          width: 960px;
          overflow: hidden;
          .wall{
            background-color: rgba(255,255,255,.8);
            float: left;
            width: 65%;
            min-height: 680px;
            .title{
              width: 95%;
              height: 30px;
              margin: 0 auto;
              font-size: 18px;
              padding: 10px 0;
              .iconfont{
                padding-right: 10px;
                color: #CA9A83;
              }
            }
            .wall-wrap{
              width: 95%;
              margin: 15px 0 15px 20px;
              .file-list{
                width: 98%;
                .item-file{
                  margin-top: 10px;
                  padding: 10px;
                  box-sizing: border-box;
                  width: 100%;
                  height: 95px;
                  border: 1px solid #ececec;
                  box-shadow: 0 1px 4px rgba(0,0,0,.04);
                  color: rgba(0,0,0,.6);
                  .file-name{
                    display: inline-block;
                    a{
                      text-decoration: none;
                      color: #42b983;
                    }
                    font-size: 18px;
                  }
                  .desc{
                    padding: 5px 0;
                    font-size: 14px;
                  }
                  .link{
                    font-size: 14px;
                    a{
                      color: rgba(0,0,0,.6);
                      &:hover{
                        color: #f35626;
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
  }
  @media all and (max-width: 960px ) and (min-width: 768px) {
    .file-wrap{
      width: 100%;
      padding-top: 110px;
      padding-bottom: 30px;
      background-color: #eee;
      box-shadow: 0 1px 4px rgba(0,0,0,.04);
      .container{
        width: 100%;
        overflow: hidden;
        margin: 0 auto;
        padding-left: 10px;
        box-sizing: border-box;
        .content{
          overflow: hidden;
          width: 768px;
          .wall{
            background-color: rgba(255,255,255,.8);
            float: left;
            min-height: 680px;
            width: 65%;
            .title{
              width: 95%;
              height: 30px;
              margin: 0 auto;
              font-size: 18px;
              padding: 10px 0;
              .iconfont{
                padding-right: 10px;
                color: #CA9A83;
              }
            }
            .wall-wrap{
              width: 95%;
              margin: 15px 0 15px 20px;
              .file-list{
                width: 98%;
                .item-file{
                  margin-top: 10px;
                  padding: 10px;
                  width: 100%;
                  height: 95px;
                  box-sizing: border-box;
                  border: 1px solid #ececec;
                  box-shadow: 0 1px 4px rgba(0,0,0,.04);
                  color: rgba(0,0,0,.6);
                  .file-name{
                    display: inline-block;
                    a{
                      text-decoration: none;
                      color: #42b983;
                    }
                    font-size: 18px;
                  }
                  .desc{
                    padding: 5px 0;
                    font-size: 14px;
                  }
                  .link{
                    font-size: 14px;
                    a{
                      color: rgba(0,0,0,.6);
                      &:hover{
                        color: #f35626;
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
  }
  @media all and (max-width: 768px) {
    .file-wrap{
      position: relative;
      z-index: 1;
      width: 100%;
      padding-top: 60px;;
      background-color: #eee;
      .container{
        width: 100%;
        overflow: hidden;
        padding-top: 30px;
        .tags-title{
          text-align: center;
          font-size: 26px;
          font-weight: 400;
        }
        .content{
          box-shadow: 0 1px 4px rgba(0,0,0,.04);
          width: 100%;
          .wall{
            background-color: rgba(255,255,255,.8);
            width: 100%;
            .title{
              width: 95%;
              height: 0.8rem;
              margin: 0 auto;
              font-size: 0.5rem;
              padding: 0.3rem 0;
              .iconfont{
                padding-right: 0.3rem;
                color: #CA9A83;
              }
            }
            .wall-wrap{
              width: 95%;
              margin: 0.42rem 0 0.35rem 0.5rem;
              .file-list{
                width: 95%;
                padding-bottom: 0.5rem;
                .item-file{
                  margin-top: 0.4rem;
                  padding: 0.3rem 0 0.3rem 0.3rem;
                  width: 100%;
                  height: 1.9rem;
                  border: 1px solid #ececec;
                  box-shadow: 0 1px 4px rgba(0,0,0,.04);
                  color: rgba(0,0,0,.6);
                  .file-name{
                    display: inline-block;
                    a{
                      text-decoration: none;
                      color: #42b983;
                    }
                    font-size: 0.45rem;
                  }
                  .desc{
                    padding: 5px 0;
                    font-size: 0.4rem;
                  }
                  .link{
                    font-size: 14px;
                    a{
                      color: rgba(0,0,0,.6);
                      &:hover{
                        color: #f35626;
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
  }
</style>
