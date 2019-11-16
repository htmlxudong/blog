<template>
  <div class="about-wrap">
    <div class="container">
      <div class="content">
        <div class="wall">
          <div class="wall-wrap">
            <h5 class="all-tags"><span class="iconfont icon-dabai"></span>关于我——有梦想的程序猿？</h5>
            <div class="about-author">
              <p class="introduce one">
                介绍: 学名徐东，今年21岁，就读于湖南信息学院的计算机专业，前2年大学生活过得普普通通，接触了前端后，逐渐发现了敲代码的乐趣，
                被它炫酷的特效所吸引的同时也对算法发出感叹。
              </p>
              <p class="introduce two">
                业余生活: 听自己喜欢的Music，写自己喜欢的Code，看自己喜欢的Movie，看自己喜欢的B站up主，whatever、
                只要是自己热爱的,尝试做就完事儿了。
              </p>
              <p class="introduce well-known">
                Direction: 生活不止眼前的苟且，还有诗和远方！
              </p>
            </div>
          </div>
          <div class="connect-author">
            <h5 class="author">和博主一起学习？</h5>
            <div class="three-img">
              <div class="one">
                <img src="http://thgcgl.top/wx.jpg" alt="">
              </div>
            </div>
          </div>
          <div class="study-time">
            <h5 class="author">博客项目开发时间线</h5>
            <div class="time-line-wrap">
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :icon="activity.icon"
                  :size="activity.size"
                  :color="activity.color"
                  :timestamp="activity.timestamp">
                  {{activity.content}}
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
        <blogger/>
      </div>
    </div>
  </div>
</template>

<script>
import blogger from '../../components/blogger/blogger.vue'
export default {
  name: 'index.vue',
  data () {
    return {
      reverse: true,
      activities: [{
        content: '用VUE和Koa2开发个人博客',
        icon: 'el-icon-loading',
        timestamp: '2018-09-05',
        color: '#FF4500',
        size: 'large'
      }, {
        content: '博客开发完成',
        icon: 'el-icon-loading',
        size: 'large',
        color: '#409EFF',
        timestamp: '2018-09-26'
      }, {
        content: '用Nuxt重构博客',
        size: 'large',
        color: '#42b983',
        icon: 'el-icon-loading',
        timestamp: '2018-11-5'
      },{
          content: '博客重构完成，打包上线',
          icon: 'el-icon-more',
          size: 'large',
          color: '#909399',
           timestamp: '2018-10-13'
        }]
    }
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
    .about-wrap{
      background-color: #eee;
      width: 100%;
      position: relative;
      padding-top: 120px;
      padding-bottom: 30px;
      .container{
        width: 100%;
        overflow: hidden;
        .content{
          margin: 0 auto;
          overflow: hidden;
          width: 1200px;
          .wall{
            background-color: rgba(255,255,255,.9);
            width: 65%;
            float: left;
            .wall-wrap{
              width: 100%;
              height: 100%;
              .all-tags{
                margin-left: 40px;
                box-sizing: border-box;
                width: 93%;
                padding: 10px 0 20px 0px;
                font-size: 18px;
                border-bottom: 1px solid #DCDFE6;
                .iconfont{
                  display: inline-block;
                  margin-right: 5px;
                  color: #f39c12;
                }
              }
              .about-author{
                box-sizing: border-box;
                padding-top: 15px;
                width: 100%;
                height: 100%;
                .introduce{
                  letter-spacing: 1px;
                  box-sizing: border-box;
                  width: 100%;
                  padding: 10px 40px;
                  color: #aaa;
                  line-height: 26px;
                  font-size: 16px;
                }
              }
            }
            .connect-author{
              width: 100%;
              height: 420px;
              .author{
                width: 95%;
                margin-left: 30px;
                font-size: 18px;
                border-bottom: 1px solid #DCDFE6;
                padding: 10px 0 20px 0px;
              }
              .three-img{
                box-sizing: border-box;
                width: 100%;
                height: 340px;
                padding-top: 20px;
                .one{
                  margin-left: 25px;
                  width: 300px;
                  height: 300px;
                  img{
                    border-radius: 10px;
                    border: 4px solid rgba(255, 0, 0, 0.8);
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
            .study-time{
              width: 100%;
              .author{
                width: 95%;
                margin-left: 30px;
                font-size: 18px;
                border-bottom: 1px solid #DCDFE6;
                padding: 10px 0 20px 0px;
              }
              .time-line-wrap{
                width: 100%;
                height: 260px;
                box-sizing: border-box;
                padding: 10px 0 0 30px;
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 1200px ) and (min-width: 960px ) {
    .about-wrap{
      background-color: #eee;
      width: 100%;
      position: relative;
      padding-bottom: 30px;
      padding-top: 110px;
      .container{
        width: 100%;
        overflow: hidden;
        padding-left: 10px;
        box-sizing: border-box;
        .content{
          overflow: hidden;
          width: 960px;
          margin: 0 auto;
          .wall{
            background-color: rgba(255,255,255,.9);
            width: 65%;
            float: left;
            .wall-wrap{
              width: 100%;
              height: 100%;
              .all-tags{
                margin-left: 40px;
                box-sizing: border-box;
                width: 93%;
                padding: 10px 0 20px 0px;
                font-size: 18px;
                border-bottom: 1px solid #DCDFE6;
                .iconfont{
                  display: inline-block;
                  margin-right: 5px;
                  color: #f39c12;
                }
              }
              .about-author{
                box-sizing: border-box;
                padding-top: 15px;
                width: 100%;
                height: 100%;
                .introduce{
                  letter-spacing: 1px;
                  box-sizing: border-box;
                  width: 100%;
                  padding: 10px 40px;
                  color: #aaa;
                  line-height: 26px;
                  font-size: 16px;
                }
              }
            }
            .connect-author{
              width: 100%;
              height: 390px;
              .author{
                width: 95%;
                margin-left: 30px;
                font-size: 18px;
                border-bottom: 1px solid #DCDFE6;
                padding: 10px 0 20px 0px;
              }
              .three-img{
                box-sizing: border-box;
                width: 100%;
                height: 320px;
                padding-top: 20px;
                .one{
                  margin-left: 25px;
                  width: 270px;
                  height: 270px;
                  img{
                    border-radius: 10px;
                    border: 4px solid rgba(255, 0, 0, 0.8);
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
            .study-time{
              width: 100%;
              .author{
                width: 95%;
                margin-left: 30px;
                font-size: 18px;
                border-bottom: 1px solid #DCDFE6;
                padding: 10px 0 20px 0px;
              }
              .time-line-wrap{
                width: 100%;
                height: 280px;
                box-sizing: border-box;
                padding: 10px 0 0 30px;
              }
            }
          }
        }
      }
    }
  }
  @media all and (min-width: 768px ) and (max-width: 960px ) {
    .about-wrap{
      background-color: #eee;
      width: 100%;
      position: relative;
      padding-top: 110px;
      padding-bottom: 30px;
      .container{
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
        padding-left: 10px;
        .content{
          width: 768px;
          margin: auto;
          overflow: hidden;
          .wall{
            background-color: rgba(255,255,255,.9);
            width: 62%;
            float: left;
            .wall-wrap{
              width: 100%;
              height: 100%;
              .all-tags{
                margin-left: 40px;
                box-sizing: border-box;
                width: 93%;
                padding: 10px 0 15px 0;
                font-size: 16px;
                border-bottom: 1px solid #DCDFE6;
                .iconfont{
                  display: inline-block;
                  margin-right: 5px;
                  color: #f39c12;
                }
              }
              .about-author{
                box-sizing: border-box;
                padding-top: 15px;
                width: 100%;
                height: 100%;
                .introduce{
                  letter-spacing: 1px;
                  box-sizing: border-box;
                  width: 100%;
                  padding: 10px 40px;
                  color: #aaa;
                  line-height: 26px;
                  font-size: 14px;
                }
              }
            }
            .connect-author{
              width: 100%;
              height: 360px;
              .author{
                width: 95%;
                margin-left: 30px;
                font-size: 16px;
                border-bottom: 1px solid #DCDFE6;
                padding: 10px 0 15px 0;
              }
              .three-img{
                box-sizing: border-box;
                width: 100%;
                height: 300px;
                padding-top: 20px;
                .one{
                  margin-left: 23px;
                  width: 250px;
                  height: 250px;
                  img{
                    border-radius: 10px;
                    border: 4px solid rgba(255, 0, 0, 0.8);
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
            .study-time{
              width: 100%;
              .author{
                width: 95%;
                margin-left: 30px;
                font-size: 18px;
                border-bottom: 1px solid #DCDFE6;
                padding: 10px 0 20px 0px;
              }
              .time-line-wrap{
                width: 100%;
                height: 280px;
                box-sizing: border-box;
                padding: 10px 0 0 30px;
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 768px ) {
    .about-wrap{
      background-color: #eee;
      width: 100%;
      position: relative;
      z-index: 1;
      .container{
        width: 100%;
        padding-top: 2.5rem;
        overflow: hidden;
        .content{
          width: 100%;
          .wall{
            background-color: rgba(255,255,255,.9);
            width: 100%;
            .wall-wrap{
              width: 100%;
              height: 100%;
              .all-tags{
                margin-left: 1.1rem;
                box-sizing: border-box;
                width: 93%;
                padding: 0.3rem 0 0.5rem 0;
                font-size: 0.5rem;
                border-bottom: 1px solid #DCDFE6;
                .iconfont{
                  display: inline-block;
                  margin-right: 0.15rem;
                  color: #f39c12;
                }
              }
              .about-author{
                box-sizing: border-box;
                padding-top: 0.4rem;
                width: 100%;
                .introduce{
                  letter-spacing: 1px;
                  box-sizing: border-box;
                  width: 100%;
                  padding: 0.2rem 1.1rem;
                  color: #aaa;
                  line-height: 0.7rem;
                  font-size: 0.4rem;
                }
              }
            }
            .connect-author{
              width: 100%;
              .author{
                width: 95%;
                margin-left: 1rem;
                font-size: 0.5rem;
                border-bottom: 1px solid #DCDFE6;
                padding: 0.3rem 0 0.5rem 0;
              }
              .three-img{
                box-sizing: border-box;
                width: 100%;
                height: 8.5rem;
                padding-top: 0.6rem;
                .one{
                  margin-left: 0.9rem;
                  width: 7rem;
                  height: 7rem;
                  img{
                    border-radius: 0.3rem;
                    border: 0.1rem solid rgba(255, 0, 0, 0.8);
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
            .study-time{
              width: 100%;
              .author{
                width: 95%;
                margin-left: 1rem;
                font-size: 0.5rem;
                border-bottom: 1px solid #DCDFE6;
                padding: 0.3rem 0 0.5rem 0;
              }
              .time-line-wrap{
                width: 100%;
                height: 7rem;
                box-sizing: border-box;
                padding: 0.5rem 0 0 0.9rem;
              }
            }
          }
        }
      }
    }
  }
</style>
