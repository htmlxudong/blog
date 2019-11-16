<template>
  <div class="write-wrap">
    <div class="markdown-wrap">
      <div class="title">
        <div class="input-wrap">
          <input type="text" v-model="blogTitle" placeholder="输入文章标题" maxlength="100">
          <span class="count">
           <span class="length" :class="{'on': this.blogTitle.length === 100}">{{count}}</span>/100
          </span>
        </div>
        <button class="publish" @click="toPublish">发布文章</button>
      </div>
      <mavon-editor v-model="blogContent" class="markdown"/>
    </div>
    <div class="mask" v-if="showMask"></div>
    <transition name="fade">
      <div class="publish-wrap"v-if="showMask">
        <h3 class="head-title">发布选择</h3>
        <div class="lines-wrap">
          <div class="line">
            <span class="name">文章标签:</span>
            <div class="input-wrap">
              <el-input
                class="elInput"
                placeholder="请输入内容"
                v-model="tags"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="img-wrap">
            <h5 class="select">图片选择:</h5>
            <el-upload
              class="avatar-uploader"
              :action=domain
              :show-file-list="false"
              :http-request = upqiniu
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <span class="btn" @click="confirmPublish">发布文章</span>
        <span class="iconfont icon-guanbi" @click="cancel"></span>
      </div>
    </transition>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import axios from 'axios'
import { mapState } from 'vuex'
import { _writeArticle } from '../../common/api'
import marked from 'marked'

export default {
  name: 'index.vue',
  middleware: 'auth',
  data () {
    return {
      blogTitle: '',     // 文章题目
      blogContent: '',   // 文章内容
      tags: '',         // 文章标签
      imageUrl: '',      // 上传的图片
      showMask: false,    // 是否显示蒙层和发布按钮
      token: {},
      qiniuaddr: 'q0dgavd86.bkt.clouddn.com',   // 这是七牛云空间的外链默认域名
      domain: 'https://upload-z2.qiniup.com'           // 七牛云的上传地址，
    }
  },
  computed: {
    ...mapState(['blogList']),
    count () {
      if(this.blogTitle.length){
        return this.blogTitle.length
      } else {
        return 0
      }
    }
  },
  methods: {
    toPublish () {
      this.showMask = true
    },
    async confirmPublish () {
      if (!this.tags || !this.blogTitle || !this.blogContent){
        return
      }
      this.showMask = false
      let id = this.blogList.length > 0 ? this.blogList.length : 0
      let time = new Date().getTime()
      let browse = 0
      let comment = 0
      let blogStr = this.blogContent.slice(0,60)
      let data = {
        comment,
        browse,
        time,
        id,
        imageUrl: this.imageUrl,
        tags: this.tags,
        blogTitle: this.blogTitle,
        blogDesc: marked(blogStr),
        blogContent: marked(this.blogContent)
      }
      // 将文章保存到vuex
      this.$store.commit('plusBlogContent', data)
      let res = await _writeArticle(data)
      if(res.code === 0) {
        this.open()
        this.blogTitle = ''
        this.blogContent = ''
        this.tags = ''
        this.imageUrl = ''
      }
    },
    // 消息提示
    open() {
      const h = this.$createElement
      Notification({
        title: '标题名称',
        message: h('i', { style: 'color: teal'}, '恭喜您，博客发布成功，继续加油哦')
      })
    },
    cancel () {
      this.showMask = false
    },
    // 图片上传
    async upqiniu(req) {
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件，不能重名
      let num = Math.floor(Date.now() / 1000).toString().substring(7, 11)
      const keyname = 'logo' + num + '.' + filetype
      // 获取到凭证之后再将文件上传到七牛云空间
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      // 从后端获取上传凭证token
      axios.get('/getToken')
        .then(response => {
          let res = response.data
          let formdata = new FormData()
          formdata.append('file', req.file)
          formdata.append('token', res.data.uploadToken)
          formdata.append('key', keyname)
          axios.post(this.domain, formdata, config)
            .then((result) => {
              this.imageUrl = 'http://' + this.qiniuaddr + '/' + result.data.key
            })
            .catch(e => {
              console.log(e)
            })
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 验证文件合法性
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'|| file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
  @keyframes fadeInDown {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  // less 混合
  .w-h-p-bg(@w,@h,@bg,@p) {
    width: @w;
    background-color: @bg;
    height: @h;
    position: @p;
  }
  // 定位居中
  .center(@i) {
    z-index: @i;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 30px;
    width: 600px;
    height: 350px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border-radius: 10px;
    border: 1px solid #a09e99;
    width: 600px;
    margin-left: 25px;
    font-size: 50px;
    color: #8c939d;
    height: 350px;
    line-height: 350px;
    text-align: center;
  }
  .avatar {
    border-radius: 10px;
    width: 600px;
    height: 350px;
    display: block;
  }
  .write-wrap{
    .fade-enter-active,.fade-leave-active {
      transition: transform .4s;
      transform: translate3d(0,0,0);
    }
    .fade-enter, .fade-leave-to {
      transform: translate3d(0,-500px,0);
    }
    .w-h-p-bg(100%,100vh,#eee,relative);
    .markdown-wrap{
      padding-top: 80px;
      width: 100%;
      overflow: hidden;
      height: 88%;
      .title{
        padding: 0 20px 10px 20px;
        width: 100%;
        height: 50px;
        display: flex;
        .input-wrap{
          width: 1200px;
          height: 100%;
          display: flex;
          border: 1px solid #eee;
          border-radius: 5px;
          input{
            width: 95%;
            height: 100%;
            text-indent: 20px;
            font-size: 20px;
          }
          ::-webkit-input-placeholder{
            font-size: 20px;
          }
          .count{
            .on{
              color: red;
            }
            text-align: right;
            padding-right: 10px;
            font-size: 20px;
            width: 6%;
            height: 100%;
            line-height: 50px;
          }
        }
        .publish{
          width: 100px;
          height: 90%;
          color: #fff;
          background: #f35626;
          border-radius: 10px;
          margin: 0 15px;
          font-size: 16px;
          cursor: pointer;
        }
      }
      .markdown{
        width: 100%;
        height: 90%;
      }
    }
    .mask{
      .w-h-p-bg(100%,100%,rgba(0,0,0,.2),absolute);
      .center(10001);
    }
    .publish-wrap{
      .w-h-p-bg(650px,600px,#fff,absolute);
      .center(10002);
      .head-title{
        margin: 10px 0;
        width: 100%;
        height: 40px;
        font-size: 24px;
        text-align: center;
        line-height: 40px;
      }
      .lines-wrap{
        width: 100%;
        height: 400px;
        .line{
          display: flex;
          width: 100%;
          height: 50px;
          align-items: center;
          .name{
            padding:0 20px;
            font-size: 18px;
          }
          .input-wrap{
            width: 250px;
          }
        }
        .img-wrap{
          box-sizing: border-box;
          padding: 5px 0 20px 0;
          width: 100%;
          height: 400px;
          .select{
            padding-left: 30px;
            width: 100px;
            height: 30px;
          }
        }
      }
      .btn{
        .w-h-p-bg(100px,50px,#fff,absolute);
        text-align: center;
        cursor: pointer;
        left: 50%;
        margin-left: -50px;
        bottom: 10px;
        line-height: 50px;
        box-sizing: border-box;
        padding: 0 5px;
        border-radius: 5px;
        font-size: 20px;
        color: #74b9ff;
        transition: .2s background;
        &:hover{
          background: #f5f4f2;
        }
      }
      .iconfont{
        cursor: pointer;
        font-size: 20px;
        width: 50px;
        height: 50px;
        position: absolute;
        right: -15px;
        top: 15px;
      }
    }
  }
</style>
