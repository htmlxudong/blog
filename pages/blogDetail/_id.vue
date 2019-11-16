<template>
  <div class="detail-wrap">
    <div class="container">
      <div class="position-box" v-show="blog._id">
        <div class="detail-content">
          <div class="blog-detail-title">
            <h4 class="blog-title">{{blog.blogTitle}}</h4>
            <span class="time">徐东&nbsp;&nbsp;发表于 {{blog.time}}</span>
            <div class="tags-box">博客标签: &nbsp;&nbsp;<span class="right-tags"><span class="iconfont icon-biaoqian1"></span> {{blog.tags}}</span></div>
          </div>
          <div class="img-wrap">
            <img :src="blog.imageUrl">
          </div>
          <div class="content">
            <div class="content-one" v-html="blog.blogContent" v-highlight ref="blogsContent">

            </div>
          </div>
          <div class="support">
            <div class="super-btn" @click="toSupport">打赏</div>
            <transition name="fadeIn">
              <div class="wx-img-wrap" v-show="showSupport">
                <div class="img-super">
                  <img src="http://thgcgl.top/wx-money.jpg" alt="">
                  <p class="tool">微信打赏</p>
                </div>
                <div class="img-super">
                  <img src="http://thgcgl.top/zfb.jpg" alt="">
                  <p class="tool">支付宝打赏</p>
                </div>
              </div>
            </transition>
          </div>
          <div class="toggle-wrap">
            <div class="prev-wrap">
              <span class="prev">上一篇:  </span>
              <span class="article-title" @click="toToggleArticle('prev')">{{ prevTitle.blogTitle }}</span>
            </div>
            <div class="next-wrap">
              <span class="prev">下一篇: </span>
              <span class="article-title" @click="toToggleArticle('next')">{{ nextTitle.blogTitle }}</span>
            </div>
          </div>
        </div>
        <div class="user-comment-wrap">
          <h5 class="article-comment">发表评论</h5>
          <div class="input-wrap clearfix">
            <el-tooltip class="item" effect="light" content="请登录后再留言" :disabled = "!disabled" placement="top">
              <el-input
                type="textarea"
                :rows="4"
                :disabled = disabled
                placeholder="欢迎各位小伙伴留言(๑•̀ㅂ•́)و✧"
                v-model="content">
              </el-input>
            </el-tooltip>
            <div class="btn-wrap">
              <el-button @click="toComment" class="btn">畅言一下</el-button>
            </div>
          </div>
          <div class="container-comment" v-show="comments && comments.length">
            <div class="comment-count">
              <span class="new-comment">
                评论
              </span>
              <span class="right-count">
                {{comments && comments.length}} 条评论
              </span>
            </div>
            <ul class="comment-list">
              <li class="item-comment" v-for="(comment, index) in comments" :key="index">
                <div class="user-img-wrap">
                  <img :src="comment.logo" alt="">
                </div>
                <div class="user-content">
                  <p class="user-name">{{comment.username }}  <span class="time">  {{ comment.commentTime}}</span> </p>
                  <p class="user-comment-content">
                    {{comment.content}}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <aside class="recommend-article comment-version" v-show="blog._id">
        <div class="up-wrap">
          <h3 class="up-title">喜欢的博主</h3>
          <ul class="up-list">
            <li class="up-item">
              <a href="https://juejin.im/user/59a3d3f851882524241a703d" target="_blank">超级索尼</a>
            </li>
            <li class="up-item">
              <a href="https://juejin.im/user/59df61ec51882578ce26ee6e" target="_blank">前端小智</a>
            </li>
            <li class="up-item">
              <a href="https://juejin.im/user/59be059c5188256c6d77cf2e" target="_blank">Neal_yang</a>
            </li>
            <li class="up-item">
              <a href="https://juejin.im/user/5c25eae2e51d4573c84905c6" target="_blank">裂泉</a>
            </li>
          </ul>
        </div>
        <div class="recommend-article-wrap" v-if="recommendArticle.length">
          <h3 class="recommend-title">相关文章</h3>
          <ul class="recommend-list">
            <li class="recommend-item" v-for="item in recommendArticle" :key="item._id">
                <span class="img-wrap">
                  <img :src="item.imageUrl" alt="">
                </span>
              <span class="right-title">
                  <span class="text" @click="selectArticle(item)">{{item.blogTitle}}</span>
                  <span class="right-time">{{item.time}}</span>
                  <span class="watch">{{item.browse}}次浏览</span>
                </span>
            </li>
          </ul>
        </div>
        <div class="contents-wrap" v-if="TOCList.length">
          <h4 class="content-title">目录</h4>
          <div class="content-list">
            <el-tree :data="TOCList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </aside>
      <transition name="fadeReco" v-if="recommendArticle.length">
        <aside class="recommend-article position-version" v-show="recommend">
          <div class="recommend-article-wrap">
            <h3 class="recommend-title">相关文章 <span class="iconfont icon-guanbi" @click="closeCommend"></span> </h3>
            <ul class="recommend-list">
              <li class="recommend-item" v-for="item in recommendArticle" :key="item._id">
                <span class="img-wrap">
                  <img :src="item.imageUrl" alt="">
                </span>
                <span class="right-title">
                  <span class="text" @click="selectArticle(item)">{{item.blogTitle}}</span>
                  <span class="right-time">{{item.time}}</span>
                  <span class="watch">{{item.browse}}次浏览</span>
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </transition>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import goTop from '../../common/mixin/gotop.js'
import { _updateBrowers, _updateArticle, _addComment } from '../../common/api'
import { Notification  } from 'element-ui'
import { mapState } from 'vuex'
export default {
  name: 'index.vue',
  mixins: [goTop],
  data () {
    return {
      index: null,
      blog: '',
      content: '',
      showSupport: false,
      TOCList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.index = parseInt(vm.$route.query.id)
      // 更新浏览量
      vm.$store.commit('updateBrowers', vm.index)
      vm.updateBrowers()
      vm.blog = vm.blogList[vm.index]
      vm.$nextTick(() => {
        /*
         [
         {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }
        ]
        * */
        let headerList = Array.from(vm.$refs.blogsContent.querySelectorAll('h1,h2,h3'))
        function tree(headerList, e){
          if(!e) return listChildren(headerList, {tagName: 'H0'})
          let resultTree = {'label': e.innerText}
          if(getLevel(e) < 4){
            let children = listChildren(headerList ,e)
            if(children.length !== 0)
              resultTree.children = children
          }
          return resultTree
        }
        // 提取数字
        function getLevel(e){
          return e.tagName.match(/\d/)
        }

        function listChildren(headerList, e) {
          let resultList = []

          let index = headerList.indexOf(e)
          // 检测当前h标签是不是还有下一级h,并且下一级不能等于同级h
          while (headerList[index + 1] && getLevel(headerList[index + 1]) > getLevel(e)) {
            if (getLevel(headerList[index + 1]) - 1 == getLevel(e))
              resultList.push(tree(headerList, headerList[index + 1]))
              index++
          }
          return resultList
        }
        vm.TOCList = tree(headerList)
      })
    })
  },
  created () {
    this.index = parseInt(this.$route.query.id)
  },
  mounted () {
    window.addEventListener('scroll',this.listenScroll, true)
  },
  computed: {
    ...mapState(['blogList', 'userInfo', 'commentList']),
    disabled () {
      return this.userInfo.username ? false : true
    },
    comments () {
      if(!this.commentList || !this.blog._id) {
        return
      }
      let result = this.commentList.filter(item => {
        return item.blogId === this.blog._id
      })
      return result
    },
    prevTitle () {
      let index = parseInt(this.$route.query.id)
      if(index > 0) {
        return this.blogList[index-1]
      } else {
        return {
          blogTitle: '客官没有了'
        }
      }
    },
    nextTitle () {
      let index = parseInt(this.$route.query.id)
      if(index < this.blogList.length - 1) {
        return this.blogList[index+1]
      } else {
        return {
          blogTitle: '客官没有了'
        }
      }
    },
    // 推荐文章
    recommendArticle () {
      if (!this.blogList) {
        return
      }
      let result = this.blogList.slice().filter(item => {
        return item.tags === this.blog.tags && item._id !== this.blog._id
      })
      let arr = []
      result.forEach((item, index) => {
        if(index <= 2){
          arr[index] = item
        }
      })
      return arr
    }
  },
  methods: {
    listenScroll () {
      let nav = document.querySelector('.nav-wrap')
      let poBox = document.querySelector('.contents-wrap')
      let recBox = document.querySelector('.recommend-article')
      if (poBox) {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop
        if (oTop >= recBox.offsetTop - nav.offsetHeight + recBox.offsetHeight - 30) {
          poBox.style.position = 'fixed'
          poBox.style.top = recBox.offsetTop - nav.offsetHeight + 30 + 'px'
        } else {
          poBox.removeAttribute("style")
        }
      }
    },
    handleNodeClick(data) {
      let nav = document.querySelector('.nav-wrap')
      let label = data.label
      let headerList = Array.from(this.$refs.blogsContent.querySelectorAll('h1,h2,h3'))
      let ele = headerList.find(item => {
        return item.innerHTML === label
      })
      let scrollT = ele.offsetTop - nav.offsetHeight
      this.scrollAnimation(scrollT)
    },
    scrollAnimation (scrollT) {
       requestAnimationFrame(function fn() {
        let oTop = document.documentElement.scrollTop || document.body.scrollTop
        document.documentElement.scrollTop = document.body.scrollTop = scrollT
      })
    },
    closeCommend () {
      this.recommend = false
      this.isFirst = false
    },
    toToggleArticle (str) {
      // 上一篇，下一篇文章切换
      if(str === 'next') {
        let index = parseInt(this.$route.query.id)
        if(index < this.blogList.length - 1) {
          index = index + 1
          this.$router.push('/blogDetail?id='+ index)
          this.blog = this.blogList[index]
        }
      }
      if(str === 'prev') {
        let index = parseInt(this.$route.query.id)
        if(index > 0) {
          index = index - 1
          this.$router.push('/blogDetail?id='+ index)
          this.blog = this.blogList[index]
        }
      }
    },
    toSupport () {
      this.showSupport = !this.showSupport
    },
    async updateBrowers () {
      let data = this.blogList[this.index]
      let result = await _updateBrowers(data)
    },
    async toComment () {
      if(!this.content) {
        this.open4()
        return
      }
      let nowTime = new Date().getTime()
      let data  = {
        blogId: this.blog._id,
        logo: this.userInfo.logo,
        commentTime: nowTime,
        username: this.userInfo.username,
        content: this.content
      }
      let res = await _addComment(data)
      data.commentTime = format(nowTime,'yyyy-MM-dd')
      this.comments.push(data)
      // 更新评论
      this.$store.commit('setBlogComment',{index: this.index})
      this.content = ''
      // 同步评论信息
      let comment = this.comments.length

      let article = {
        comment,
        id: this.blog._id
      }
      let result = await _updateArticle(article)
    },
    selectArticle (item) {
      let index = this.blogList.findIndex(blog => {
        return item._id === blog._id
      })
      this.$router.push('/blogDetail?id='+index)
      this.blog = this.blogList[index]
    },
    open4() {
      Notification ({
        message: '说点什么吧'
      })
    },
  }
}
</script>

<style lang="less">
  .footTop-enter-active, .footTop-leave-active{
    transition: transform .5s cubic-bezier(.535,0,0,1) 0s;
    transform: translateX(0);
  }
  .footTop-enter,.footTop-leave-to{
    transform: translateX(200px);
  }
  @media all and (min-width: 1200px) {
    .detail-wrap{
      width: 100%;
      position: relative;
      overflow: hidden;
      background-color: #eee;
      padding-top: 80px;
      .container{
        width: 1200px;
        padding: 30px 0 20px 10px;
        min-height: 600px;
        margin: 0 auto;
        box-sizing: border-box;
        .position-box{
          float: left;
          box-sizing: border-box;
          width: 860px;
          .detail-content{
            box-sizing: border-box;
            border: 1px solid #fff;
            background-color: rgba(255,255,255,.8);
            border-radius: 5px;
            margin: 0 auto;
            width: 100%;
            min-height: 750px;
            .blog-detail-title{
              font-size: 24px;
              color: #555;
              width: 100%;
              height: 150px;
              text-align: center;
              margin: 20px 0;
              .blog-title{
                width: 90%;
                margin: 0 auto;
                padding: 10px 40px;
              }
              .time{
                color: #999;
                font-size: 14px;
              }
              .tags-box{
                color: #999;
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                .iconfont{
                  display: inline-block;
                  padding-right: 5px;

                }
                .right-tags{
                  cursor: pointer;
                  &:hover{
                    color: orangered;
                  }
                }
              }
            }
            .img-wrap{
              width: 80%;
              height: 400px;
              margin: 20px auto;
              img{
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
            .content{
              color: #555;
              line-height: 26px;
              font-size: 16px;
              box-sizing: border-box;
              width: 100%;
              padding: 10px 20px 40px 40px;
              h1,h2,h3,h4,h5{
                padding: 10px 0;
                font-weight: 400;
                margin: 20px 0;
                font-size: 18px;
                border-bottom: 1px solid #e0e0e0;
              }
              h1{
                font-size: 28px;
                font-weight: 550;
                border-bottom: 1px solid transparent;
              }
              h2{
                font-weight: 550;
                font-size: 22px;
              }
              h3{
                font-size: 20px;
                font-weight: 500;
              }
              pre{
                padding: 10px 0;
              }
            }
            .support{
              box-sizing: border-box;
              border-top: 1px solid #eaeaea;
              width: 90%;
              padding: 20px;
              margin: 0 auto;
              .super-btn{
                cursor: pointer;
                width: 100px;
                text-align: center;
                height: 48px;
                border-radius: 15px;
                font-size: 24px;
                line-height: 48px;
                background-color: rgba(255, 69, 0, 0.8);
                color: rgba(255,255,255,.8);
                margin: 0 auto;
                &:hover{
                  opacity: 0.8;
                }
              }
              .wx-img-wrap{
                padding-top: 30px;
                box-sizing: border-box;
                width: 600px;
                height: 300px;
                margin: 0 auto;
                .img-super{
                  float: left;
                  margin-left: 50px;
                  width: 210px;
                  height: 260px;
                  img{
                    border-radius: 10px;
                    border: 4px solid rgba(255,0,0,.8);
                    width: 200px;
                    height: 200px;
                  }
                  .tool{
                    margin-top: 10px;
                    height: 30px;
                    width: 80%;
                    font-size: 18px;
                    text-align: center;
                    color: #999;
                  }
                }
              }
            }
            .toggle-wrap{
              box-sizing: border-box;
              border-top: 1px solid #f2f2f2;
              background-color: #FBFBFB;
              font-size: 14px;
              width: 100%;
              height: 50px;
              color: #bbb;
              padding: 15px 20px;
              .prev-wrap{
                float: left;
              }
              .prev{
                padding-right: 2px;
              }
              .article-title{
                color: #555;
                cursor: pointer;
                &:hover{
                  color: rgba(255, 69, 0, 0.8);
                }
              }
              .next-wrap{
                float: right;
              }
            }
          }
          .user-comment-wrap{
            background-color: rgba(255,255,255,.8);
            width: 100%;
            padding: 15px 20px 10px 20px;
            box-sizing: border-box;
            margin: 0 auto;
            margin-top: 40px;
            .article-comment{
              width: 151px;
              font-size: 16px;
              height: 40px;
              color: #555;
              font-weight: 550;
            }
            .input-wrap{
              position: relative;
              width: 100%;
              height: 160px;
              box-sizing: border-box;
              padding-top: 10px;
              z-index: 1;
              .btn-wrap{
                margin-right: 10px;
                margin-top: 10px;
                float: right;
                width: 100px;
                font-size: 18px;
                .btn{
                  color: rgba(0,0,0,.8);
                }
              }
            }
            .container-comment{
              margin-top: 20px;
              width: 100%;
              .comment-count{
                color: rgba(0,0,0,.8);
                width: 100%;
                height: 30px;
                font-size: 16px;
                display: flex;
                .new-comment{
                  text-align: center;
                  align-items: center;
                  border-radius: 5px 5px 0 0;
                  border: 2px solid #DCDFE6;
                  border-bottom: transparent;
                  width: 6%;
                  line-height: 30px;
                }
                .right-count{
                  text-align: right;
                  border-bottom: 2px solid #DCDFE6;
                  width: 94%;
                }
              }
              .comment-list{
                margin-top: 20px;
                width: 100%;
                height: 100%;
                .item-comment{
                  background-color: #fbfbfb;
                  width: 100%;
                  padding: 20px 0;
                  display: flex;
                  border-bottom: 1px solid rgba(0,0,0,0.06);
                  .user-img-wrap{
                    width: 50px;
                    padding: 0 30px;
                    img{
                      width: 60px;
                      height: 60px;
                      border-radius: 50%;
                    }
                  }
                  .user-content{
                    margin-top: 10px;
                    width: 88%;
                    height: 55px;
                    display: flex;
                    flex-direction: column;
                    .user-name{
                      font-size: 14px;
                      .time{
                        color: gray;
                        font-size: 12px;
                      }
                    }
                    .user-comment-content{
                      padding-top: 5px;
                      font-size: 16px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
              }
            }
          }
        }
        .recommend-article{
          float: right;
          width: 280px;
          .up-wrap{
            margin-bottom: 20px;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
            .up-title{
              border-radius: 5px 5px 0 0;
              position: relative;
              margin: 0;
              padding: 11px 15px 14px;
              border-bottom: 1px solid #eaeaea;
              background-color: #fbfbfb;
              font-weight: 400;
              font-size: 18px;
              line-height: 20px;
            }
            .up-list{
              width: 100%;
              .up-item{
                width: 100%;
                font-size: 14px;
                a{
                  border-bottom: solid 1px #eee;
                  box-sizing: border-box;
                  padding: 10px 30px;
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                  color: #333;
                  text-decoration: none;
                  position: relative;
                  &:before{
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 10px;
                    margin-top: -2px;
                    width: 5px;
                    height:5px;
                    border-radius: 5px;
                    background: rgba(0,0,0,.8);
                  }
                  &:hover{
                    cursor: pointer;
                    border-bottom: solid 1px #fffbf0;
                  }
                }
              }
            }
          }
          .recommend-article-wrap{
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
            .recommend-title{
              border-radius: 5px 5px 0 0;
              position: relative;
              margin: 0;
              padding: 11px 15px 14px;
              border-bottom: 1px solid #eaeaea;
              background-color: #fbfbfb;
              font-weight: 400;
              font-size: 18px;
              line-height: 20px;
            }
            .recommend-list{
              width: 100%;
              .recommend-item{
                width: 100%;
                border-bottom: solid 1px #eee;
                display: flex;
                padding: 10px;
                font-size: 14px;
                border-left: 3px solid transparent;
                .img-wrap{
                  margin-top: 5px;
                  width: 90px;
                  height: 65px;
                  img{
                    width: 90px;
                    height: 65px;
                    border-radius: 5px;
                  }
                }
                .right-title{
                  margin-left: 12px;
                  width: 160px;
                  height: 55px;
                  color: #555;
                  span{
                    font-size: 14px;
                    display: block;
                  }
                  .text{
                    width: 160px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                    &:hover{
                      color: rgba(255, 69, 0, 0.7);
                    }
                  }
                  .right-time{
                    margin: 6px 0;
                    color: #999;
                    font-size: 12px;
                  }
                  .watch{
                    font-size: 12px;
                    color: #999;
                  }
                }
                &:hover{
                  border-left: solid 3px rgba(255, 69, 0, 0.7);
                }
              }
            }
          }
          .contents-wrap{
            position: relative;
            width: 280px;
            padding: 15px 10px 0 10px;
            box-sizing: border-box;
            .content-title{
              font-size: 18px;
              color: #000;
              padding: 10px 0;
            }
            .el-tree{
              background: transparent;
              padding: 0 8px;
            }
          }
        }
        .position-version{
          display: none;
        }
        &:after{
          content: '';
          display: block;
          clear: both;
        }
      }
    }
  }
  @media all and (max-width: 1200px ) and (min-width: 960px) {
    .detail-wrap{
      overflow: hidden;
      width: 100%;
      padding-top: 70px;
      position: relative;
      background-color: #eee;
      .container{
        margin: 0 auto;
        width: 960px;
        min-height: 600px;
        padding: 30px 0 20px 10px;
        box-sizing: border-box;
        .position-box{
          float: left;
          width: 650px;
          .detail-content{
            box-sizing: border-box;
            border: 1px solid #fff;
            background-color: rgba(255,255,255,.8);
            border-radius: 5px;
            margin: 0 auto;
            width: 100%;
            min-height: 600px;
            margin-right: 10px;
            .blog-detail-title{
              font-size: 22px;
              color: #555;
              width: 100%;
              height: 150px;
              text-align: center;
              margin-top: 20px;
              .blog-title{
                width: 90%;
                margin: 0 auto;
                padding: 10px 40px;
              }
              .time{
                color: #999;
                font-size: 14px;
              }
              .tags-box{
                color: #999;
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                .iconfont{
                  display: inline-block;
                  padding-right: 5px;

                }
                .right-tags{
                  cursor: pointer;
                  &:hover{
                    color: orangered;
                  }
                }
              }
            }
            .img-wrap{
              width: 75%;
              height: 300px;
              margin: 5px auto;
              img{
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
            .content{
              color: #555;
              line-height: 26px;
              font-size: 16px;
              box-sizing: border-box;
              width: 100%;
              padding: 20px 60px;
              pre{
                overflow-x: auto;
              }
              h1,h2,h3,h4,h5{
                padding: 10px 0;
                font-weight: 400;
                margin: 20px 0;
                font-size: 18px;
                border-bottom: 1px solid #e0e0e0;
              }
              h1{
                font-size: 28px;
                font-weight: 550;
                border-bottom: 1px solid transparent;
              }
              h2{
                font-weight: 550;
                font-size: 22px;
              }
              h3{
                font-size: 20px;
                font-weight: 500;
              }
            }
            .support{
              box-sizing: border-box;
              border-top: 1px solid #eaeaea;
              width: 90%;
              padding: 20px;
              margin: 0 auto;
              .super-btn{
                cursor: pointer;
                width: 100px;
                text-align: center;
                height: 45px;
                border-radius: 15px;
                font-size: 22px;
                line-height: 45px;
                background-color: rgba(255, 69, 0, 0.8);
                color: rgba(255,255,255,.8);
                margin: 0 auto;
                &:hover{
                  opacity: 0.8;
                }
              }
              .wx-img-wrap{
                padding-top: 30px;
                box-sizing: border-box;
                width: 550px;
                height: 290px;
                margin: 0 auto;
                .img-super{
                  float: left;
                  margin-left: 30px;
                  width: 210px;
                  height: 250px;
                  img{
                    border-radius: 10px;
                    border: 4px solid rgba(255,0,0,.8);
                    width: 200px;
                    height: 200px;
                  }
                  .tool{
                    margin-top: 10px;
                    height: 30px;
                    width: 100%;
                    font-size: 18px;
                    text-align: center;
                    color: #999;
                  }
                }
              }
            }
            .toggle-wrap{
              box-sizing: border-box;
              border-top: 1px solid #f2f2f2;
              background-color: #FBFBFB;
              font-size: 14px;
              width: 100%;
              height: 50px;
              color: #bbb;
              padding: 15px 20px;
              .prev-wrap{
                float: left;
              }
              .prev{
                padding-right: 2px;
              }
              .article-title{
                color: #555;
                cursor: pointer;
                &:hover{
                  color: rgba(255, 69, 0, 0.8);
                }
              }
              .next-wrap{
                float: right;
              }
            }
          }
          .user-comment-wrap{
            border: 1px solid #fff;
            background-color: rgba(255,255,255,.8);
            width: 100%;
            padding: 15px 20px 10px 20px;
            box-sizing: border-box;
            margin: 0 auto;
            margin-top: 40px;
            .article-comment{
              width: 151px;
              color: #555;
              font-size: 14px;
              font-weight: 550;
              height: 40px;
            }
            .input-wrap{
              position: relative;
              width: 100%;
              height: 160px;
              box-sizing: border-box;
              padding-top: 10px;
              z-index: 1;
              .btn-wrap{
                margin-right: 10px;
                margin-top: 10px;
                float: right;
                width: 100px;
                font-size: 18px;
                .btn{
                  color: rgba(0,0,0,.8);
                }
              }
            }
            .container-comment{
              margin-top: 30px;
              width: 100%;
              .comment-count{
                color: rgba(0,0,0,.8);
                width: 100%;
                height: 30px;
                font-size: 16px;
                display: flex;
                .new-comment{
                  text-align: center;
                  align-items: center;
                  border-radius: 5px 5px 0 0;
                  border: 2px solid #DCDFE6;
                  border-bottom: transparent;
                  width: 6%;
                  line-height: 30px;
                }
                .right-count{
                  text-align: right;
                  border-bottom: 2px solid #DCDFE6;
                  width: 94%;
                }
              }
              .comment-list{
                margin-top: 20px;
                width: 100%;
                height: 100%;
                .item-comment{
                  background-color: #fbfbfb;
                  width: 100%;
                  padding: 20px 0;
                  display: flex;
                  border-bottom: 1px solid rgba(0,0,0,0.06);
                  .user-img-wrap{
                    width: 50px;
                    padding: 0 30px;
                    img{
                      width: 60px;
                      height: 60px;
                      border-radius: 50%;
                    }
                  }
                  .user-content{
                    margin-top: 10px;
                    width: 88%;
                    height: 55px;
                    display: flex;
                    flex-direction: column;
                    .user-name{
                      font-size: 14px;
                      .time{
                        color: gray;
                        font-size: 12px;
                      }
                    }
                    .user-comment-content{
                      padding-top: 5px;
                      font-size: 16px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
              }
            }
          }
        }
        .recommend-article{
          float: right;
          width: 280px;
          .up-wrap{
            margin-bottom: 20px;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
            .up-title{
              border-radius: 5px 5px 0 0;
              position: relative;
              margin: 0;
              padding: 11px 15px 14px;
              border-bottom: 1px solid #eaeaea;
              background-color: #fbfbfb;
              font-weight: 400;
              font-size: 18px;
              line-height: 20px;
            }
            .up-list{
              width: 100%;
              .up-item{
                width: 100%;
                font-size: 14px;
                a{
                  border-bottom: solid 1px #eee;
                  box-sizing: border-box;
                  padding: 10px 30px;
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                  color: #333;
                  text-decoration: none;
                  position: relative;
                  &:before{
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 10px;
                    margin-top: -2px;
                    width: 5px;
                    height:5px;
                    border-radius: 5px;
                    background: rgba(0,0,0,.8);
                  }
                  &:hover{
                    cursor: pointer;
                    border-bottom: solid 1px #fffbf0;
                  }
                }
              }
            }
          }
          .recommend-article-wrap{
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
            .recommend-title{
              border-radius: 5px 5px 0 0;
              position: relative;
              margin: 0;
              padding: 11px 15px 14px;
              border-bottom: 1px solid #eaeaea;
              background-color: #fbfbfb;
              font-weight: 400;
              font-size: 18px;
              line-height: 20px;
            }
            .recommend-list{
              width: 100%;
              .recommend-item{
                width: 100%;
                border-bottom: solid 1px #eee;
                display: flex;
                padding: 10px;
                font-size: 14px;
                border-left: 3px solid transparent;
                .img-wrap{
                  margin-top: 5px;
                  width: 90px;
                  height: 65px;
                  img{
                    width: 90px;
                    height: 65px;
                    border-radius: 5px;
                  }
                }
                .right-title{
                  margin-left: 12px;
                  width: 160px;
                  height: 55px;
                  color: #555;
                  span{
                    font-size: 14px;
                    display: block;
                  }
                  .text{
                    width: 160px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    height: 30px;
                    cursor: pointer;
                    &:hover{
                      color: rgba(255, 69, 0, 0.7);
                    }
                  }
                  .right-time{
                    margin: 6px 0;
                    color: #999;
                    font-size: 12px;
                  }
                  .watch{
                    font-size: 12px;
                    color: #999;
                  }
                }
                &:hover{
                  border-left: solid 3px rgba(255, 69, 0, 0.7);
                }
              }
            }
          }
          .contents-wrap{
            margin-top: 15px;
            width: 280px;
            padding: 0 10px;
            box-sizing: border-box;
            .content-title{
              font-size: 18px;
              color: #000;
              padding: 10px 0;
            }
            .el-tree{
              background: transparent;
              padding: 0 8px;
            }
          }
        }
        .position-version{
          display: none;
        }
        &:after{
          content: '';
          display: block;
          clear: both;
        }
      }
    }
  }
  @media all and (max-width: 960px ) and (min-width: 768px) {
    .fadeReco-enter-active, .fadeReco-leave-active{
      transition: transform .5s;
      transform: translateX(0);
    }
    .fadeReco-enter, .fadeReco-leave-to{
      transform: translateX(300px);
    }
    .detail-wrap{
      overflow: hidden;
      width: 100%;
      padding-top: 70px;
      background-color: #eee;
      .container{
        position: relative;
        width: 100%;
        min-height: 500px;
        margin: 30px 0 20px 10px;
        box-sizing: border-box;
        .position-box{
          width: 760px;
          margin: 0 auto;
          .detail-content{
            border: 1px solid #fff;
            background-color: rgba(255,255,255,.8);
            border-radius: 5px;
            width: 760px;
            min-height: 400px;
            .blog-detail-title{
              font-size: 22px;
              color: #555;
              width: 100%;
              height: 150px;
              text-align: center;
              margin-top: 20px;
              .blog-title{
                width: 90%;
                margin: 0 auto;
                padding: 10px 40px;
              }
              .time{
                color: #999;
                font-size: 14px;
              }
              .tags-box{
                color: #999;
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                .iconfont{
                  display: inline-block;
                  padding-right: 5px;

                }
                .right-tags{
                  cursor: pointer;
                  &:hover{
                    color: orangered;
                  }
                }
              }
            }
            .img-wrap{
              width: 75%;
              height: 300px;
              margin: 5px auto;
              img{
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
            .content{
              color: #555;
              line-height: 26px;
              font-size: 16px;
              box-sizing: border-box;
              width: 100%;
              padding: 20px 60px;
              pre{
                overflow-x: auto;
              }
              h1,h2,h3,h4,h5{
                padding: 10px 0;
                font-weight: 400;
                margin: 20px 0;
                font-size: 18px;
                border-bottom: 1px solid #e0e0e0;
                margin: 20px 0;
              }
              h1{
                font-size: 26px;
                font-weight: 550;
                border-bottom: 1px solid transparent;
              }
              h2{
                font-weight: 550;
                font-size: 20px;
              }
              h3{
                font-size: 18px;
                font-weight: 500;
              }
            }
            .support{
              box-sizing: border-box;
              border-top: 1px solid #eaeaea;
              width: 90%;
              padding: 20px;
              margin: 0 auto;
              .super-btn{
                cursor: pointer;
                width: 120px;
                text-align: center;
                height: 45px;
                border-radius: 15px;
                font-size: 22px;
                line-height: 45px;
                background-color: rgba(255, 69, 0, 0.8);
                color: rgba(255,255,255,.8);
                margin: 0 auto;
                &:hover{
                  opacity: 0.8;
                }
              }
              .wx-img-wrap{
                padding-top: 30px;
                box-sizing: border-box;
                width: 550px;
                height: 290px;
                margin: 0 auto;
                .img-super{
                  float: left;
                  margin-left: 30px;
                  width: 210px;
                  height: 250px;
                  img{
                    border-radius: 10px;
                    border: 4px solid rgba(255,0,0,.8);
                    width: 200px;
                    height: 200px;
                  }
                  .tool{
                    margin-top: 10px;
                    height: 30px;
                    width: 100%;
                    font-size: 18px;
                    text-align: center;
                    color: #999;
                  }
                }
              }
            }
            .toggle-wrap{
              box-sizing: border-box;
              border-top: 1px solid #f2f2f2;
              background-color: #FBFBFB;
              font-size: 14px;
              width: 100%;
              height: 50px;
              color: #bbb;
              padding: 15px 20px;
              .prev-wrap{
                float: left;
              }
              .prev{
                padding-right: 2px;
              }
              .article-title{
                color: #555;
                cursor: pointer;
                &:hover{
                  color: rgba(255, 69, 0, 0.8);
                }
              }
              .next-wrap{
                float: right;
              }
            }
          }
          .user-comment-wrap{
            border: 1px solid #fff;
            background-color: rgba(255,255,255,.8);
            width: 100%;
            padding: 15px 20px 10px 20px;
            box-sizing: border-box;
            margin: 0 auto;
            margin-top: 40px;
            .article-comment{
              width: 151px;
              height: 40px;
              color: #555;
              font-size: 14px;
              font-weight: 550;
            }
            .input-wrap{
              position: relative;
              width: 100%;
              height: 160px;
              box-sizing: border-box;
              padding-top: 10px;
              z-index: 1;
              .btn-wrap{
                margin-right: 10px;
                margin-top: 10px;
                float: right;
                width: 100px;
                font-size: 18px;
                .btn{
                  color: rgba(0,0,0,.8);
                }
              }
            }
            .container-comment{
              margin-top: 30px;
              width: 100%;
              .comment-count{
                color: rgba(0,0,0,.8);
                width: 100%;
                height: 30px;
                font-size: 16px;
                display: flex;
                .new-comment{
                  text-align: center;
                  align-items: center;
                  border-radius: 5px 5px 0 0;
                  border: 2px solid #DCDFE6;
                  border-bottom: transparent;
                  width: 6%;
                  line-height: 30px;
                }
                .right-count{
                  text-align: right;
                  border-bottom: 2px solid #DCDFE6;
                  width: 94%;
                }
              }
              .comment-list{
                margin-top: 20px;
                width: 100%;
                height: 100%;
                .item-comment{
                  width: 100%;
                  padding: 20px 0;
                  display: flex;
                  border-bottom: 1px solid rgba(0,0,0,0.06);
                  .user-img-wrap{
                    width: 50px;
                    padding: 0 30px;
                    img{
                      width: 60px;
                      height: 60px;
                      border-radius: 50%;
                    }
                  }
                  .user-content{
                    margin-top: 10px;
                    width: 88%;
                    height: 55px;
                    display: flex;
                    flex-direction: column;
                    .user-name{
                      font-size: 14px;
                      .time{
                        color: gray;
                        font-size: 12px;
                      }
                    }
                    .user-comment-content{
                      padding-top: 5px;
                      font-size: 16px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
              }
            }
          }
        }
        .comment-version{
          display: none;
        }
        .recommend-article{
          position: absolute;
          width: 250px;
          top: 20%;
          right: 1%;
          .recommend-article-wrap{
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
            .recommend-title{
              border-radius: 5px 5px 0 0;
              position: relative;
              margin: 0;
              padding: 10px 10px 10px;
              border-bottom: 1px solid #eaeaea;
              background-color: #fbfbfb;
              font-weight: 400;
              font-size: 16px;
              line-height: 20px;
              .iconfont{
                position: absolute;
                right: 3%;
                top: 20%;
              }
            }
            .recommend-list{
              width: 100%;
              .recommend-item{
                background-color: #fbfbfb;
                width: 100%;
                border-bottom: solid 1px #eee;
                display: flex;
                padding: 10px 5px 10px 2px;
                font-size: 12px;
                border-left: 3px solid transparent;
                .img-wrap{
                  margin-top: 5px;
                  width: 90px;
                  height: 65px;
                  img{
                    width: 90px;
                    height: 65px;
                    border-radius: 5px;
                  }
                }
                .right-title{
                  margin-left: 5px;
                  width: 140px;
                  height: 80px;
                  color: #555;
                  span{
                    font-size: 14px;
                    display: block;
                  }
                  .text{
                    width: 140px;
                    cursor: pointer;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    height: 30px;
                    cursor: pointer;
                    &:hover{
                      color: rgba(255, 69, 0, 0.7);
                    }
                  }
                  .right-time{
                    margin: 6px 0;
                    color: #999;
                    font-size: 12px;
                  }
                  .watch{
                    font-size: 12px;
                    color: #999;
                  }
                }
                &:hover{
                  border-left: solid 3px rgba(255, 69, 0, 0.7);
                }
              }
            }
          }
          .contents-wrap{
            margin-top: 15px;
            width: 280px;
            padding: 0 10px;
            box-sizing: border-box;
            .content-title{
              font-size: 18px;
              color: #000;
              padding: 10px 0;
            }
            .el-tree{
              background: transparent;
              padding: 0 8px;
            }
          }
        }
        &:after{
          content: '';
          display: block;
          clear: both;
        }
      }
    }
  }
  @media all and (max-width: 768px )  {
    .fadeReco-enter-active, .fadeReco-leave-active{
      transition: transform .5s;
      transform: translateX(0);
    }
    .fadeReco-enter, .fadeReco-leave-to{
      transform: translateX(300px);
    }
    .detail-wrap{
      width: 100%;
      overflow: hidden;
      min-height: 16rem;
      position: relative;
      background-color: #eee;
      .container{
        position: relative;
        width: 100%;
        min-height: 9rem;
        margin-top: 2.5rem;
        box-sizing: border-box;
        .position-box{
          width: 90%;
          margin: 0 auto;
          .detail-content{
            box-sizing: border-box;
            margin: 0 auto;
            width: 95%;
            min-height: 5rem;
            border: 1px solid #fff;
            background-color: rgba(255,255,255,.8);
            border-radius: 5px;
            .blog-detail-title{
              color: #555;
              width: 100%;
              text-align: center;
              margin-top: 0.3rem;
              font-size: 0.4rem;
              height: 4.3rem;
              .blog-title{
                width: 78%;
                margin: 0 auto;
                padding: 0.3rem 1.2rem;
              }
              .time{
                color: #999;
                display: inline-block;
                margin-top: 0.3rem;
                font-size: 0.3rem;
              }
              .tags-box{
                color: #999;
                width: 100%;
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.3rem;
                .iconfont{
                  display: inline-block;
                  padding-right: 0.15rem;

                }
                .right-tags{
                  cursor: pointer;
                  &:hover{
                    color: orangered;
                  }
                }
              }
            }
            .img-wrap{
              width: 75%;
              height: 5rem;
              margin: 0 auto;
              img{
                width: 100%;
                height: 100%;
                border-radius: 0.15rem;
              }
            }
            .content{
              color: #555;
              line-height: 0.5rem;
              font-size: 0.3rem;
              box-sizing: border-box;
              width: 100%;
              padding: 0.4rem 0.4rem;
              pre{
                margin: 0.2rem 0;
                border: 1px solid #e0e0e0;
                overflow-x: auto;
              }
              h1,h2,h3,h4,h5{
                font-size: 0.3rem;
                border-bottom: 1px solid #e0e0e0;
                padding: 0.2rem 0;
                font-weight: 400;
                margin: 0.5rem 0;
              }
              h1{
                font-size: 0.5rem;
                font-weight: 550;
                border-bottom: 1px solid transparent;
              }
              h2{
                font-weight: 550;
                font-size: 0.4rem;
              }
              h3{
                font-size: 0.3rem;
                font-weight: 550;
              }
            }
            .support{
              box-sizing: border-box;
              border-top: 1px solid #eaeaea;
              width: 90%;
              padding: 0.6rem;
              margin: 0 auto;
              .super-btn{
                cursor: pointer;
                width: 2.2rem;
                text-align: center;
                height: 1.2rem;
                border-radius: 0.25rem;
                font-size: 0.45rem;
                line-height: 1.2rem;
                background-color: rgba(255, 69, 0, 0.8);
                color: #fff;
                margin: 0 auto;
              }
              .wx-img-wrap{
                padding-top: 0.4rem;
                box-sizing: border-box;
                width: 100%;
                .img-super{
                  width: 5.2rem;
                  height: 6.5rem;
                  margin: 0 auto;
                  padding-top: 0.4rem;
                  img{
                    border-radius: 10px;
                    border: 0.1rem solid rgba(255,0,0,.8);
                    width: 5rem;
                    height: 5rem;
                  }
                  .tool{
                    margin-top: 0.3rem;
                    height: 0.9rem;
                    width: 100%;
                    font-size: 0.35rem;
                    text-align: center;
                    color: #999;
                  }
                }
              }
            }
            .toggle-wrap{
              box-sizing: border-box;
              border-top: 1px solid #f2f2f2;
              background-color: #FBFBFB;
              font-size: 0.35rem;
              width: 100%;
              color: #bbb;
              padding: 0.3rem 0.4rem;
              .prev-wrap{
                overflow: hidden;
                width: 100%;
                height: 0.5rem;
              }
              .next-wrap{
                overflow: hidden;
                width: 100%;
                height: 0.8rem;
                line-height: 0.8rem;
              }
              .prev{
                padding-right: 0.1rem;
              }
              .article-title{
                color: rgba(255, 69, 0, 0.7);
                cursor: pointer;
              }
            }
          }
          .user-comment-wrap{
            border: 1px solid #fff;
            background-color: rgba(255,255,255,.8);
            width: 95%;
            box-sizing: border-box;
            padding: 0.25rem 0.6rem 0.6rem 0.6rem;
            margin: 1.2rem auto;
            margin-bottom: 0.6rem;
            .article-comment{
              color: #555;
              width: 3rem;
              font-weight: 550;
              font-size: 0.35rem;
              height: 0.8rem;
            }
            .input-wrap{
              width: 100%;
              position: relative;
              box-sizing: border-box;
              z-index: 1;
              border-radius: 5px;
              .btn-wrap{
                margin-right: 0.3rem;
                margin-top: 0.3rem;
                float: right;
                font-size: 0.35rem;
                width: 3rem;
                .btn{
                  color: rgba(0,0,0,.8);
                }
              }
            }
            .container-comment{
              margin-top: 30px;
              width: 100%;
              .comment-count{
                color: rgba(0,0,0,.8);
                width: 100%;
                height: 0.8rem;
                font-size: 0.35rem;
                display: flex;
                .new-comment{
                  text-align: center;
                  align-items: center;
                  border-radius: 0.2rem 0.2rem 0 0;
                  border: 2px solid #DCDFE6;
                  border-bottom: transparent;
                  width: 15%;
                  line-height: 0.8rem;
                }
                .right-count{
                  text-align: right;
                  border-bottom: 2px solid #DCDFE6;
                  width: 85%;
                }
              }
              .comment-list{
                margin-top: 0.6rem;
                width: 100%;
                .item-comment{
                  background-color: #fbfbfb;
                  box-sizing: border-box;
                  width: 100%;
                  padding: 0.3rem 0;
                  display: flex;
                  border-bottom: 1px solid rgba(0,0,0,0.06);
                  .user-img-wrap{
                    width: 0.6666rem;
                    padding: 0 0.2rem;
                    img{
                      width: 0.6666rem;
                      height: 0.6666rem;
                      border-radius: 0.333rem;
                    }
                  }
                  .user-content{
                    width: 88%;
                    height: 1.2rem;
                    display: flex;
                    flex-direction: column;
                    .user-name{
                      font-size: 0.4rem;
                      .time{
                        color: gray;
                        font-size: 0.35rem;
                      }
                    }
                    .user-comment-content{
                      padding-top: 0.1rem;
                      font-size: 0.4rem;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
              }
            }
          }
        }
        .comment-version{
          display: none;
        }
        .recommend-article{
          position: absolute;
          width: 4.5rem;
          top: 22%;
          right: 0;
          .recommend-article-wrap{
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
            .recommend-title{
              border-radius: 5px 5px 0 0;
              position: relative;
              margin: 0;
              padding: 10px;
              border-bottom: 1px solid #eaeaea;
              background-color: #fbfbfb;
              font-weight: 400;
              font-size: 0.4rem;
              line-height: 0.6rem;
              .iconfont{
                font-size: 0.45rem;
                width: 0.6rem;
                height: 0.6rem;
                display: block;
                float: right;
              }
            }
            .recommend-list{
              width: 100%;
              .recommend-item{
                width: 100%;
                border-bottom: solid 1px #eee;
                display: flex;
                padding: 0.2rem 0.1rem 0.2rem 0.1rem;
                border-left: 3px solid transparent;
                .img-wrap{
                  display: none;
                }
                .right-title{
                  margin-left: 0.12rem;
                  width: 90%;
                  color: #555;
                  span{
                    font-size: 0.35rem;
                    display: block;
                  }
                  .text{
                    width: 100%;
                    cursor: pointer;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    height: 0.6rem;
                    &:hover{
                      color: rgba(255, 69, 0, 0.7);
                    }
                  }
                  .right-time{
                    margin: 6px 0;
                    color: #999;
                    font-size: 0.3rem;
                  }
                  .watch{
                    font-size: 12px;
                    color: #999;
                  }
                }
                &:hover{
                  border-left: solid 3px rgba(255, 69, 0, 0.7);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
