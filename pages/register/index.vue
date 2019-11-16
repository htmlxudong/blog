<template>
  <div class="register-wrap">
    <Particles/>
    <div class="container">
      <h2 class="blog-login"><span class="iconfont icon-biiconcopy-"></span> 用户注册</h2>
      <div class="input-wrap">
        <div class="user-logo">
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
        <div class="form-wrap">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"class="demo-ruleForm">
            <el-form-item  prop="username">
              <el-input type="text" placeholder="用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" placeholder="确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <div class="btn-group">
              <el-button class="btn" type="primary" @click="submitForm('ruleForm')">注册</el-button>
              <el-button class="btn"  @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <span class="iconfont icon-back" @click="toBack"> <span class="back">返回</span></span>
  </div>
</template>

<script>
import Particles from '../../components/particles/particles'
import axios from 'axios'
import { _register } from '../../common/api'
import { Message } from 'element-ui'
export default {
  name: 'register.vue',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {  max: 8, message: '长度不能超过 8 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur', required: true  }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      imageUrl: '',      // 上传的图片
      token: {},
      qiniuaddr: 'q0dgavd86.bkt.clouddn.com',   // 这是七牛云空间的外链默认域名
      domain: 'https://upload-z2.qiniup.com'           // 七牛云的上传地址，
    }
  },
  methods: {
    toBack() {
      this.$router.back()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleRegister()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async handleRegister() {
      let data = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        logo: this.imageUrl
      }
      let res = await _register(data)
      if (res.code === 0) {
        let message = '注册成功'
        this.open2('success', message)
        this.$router.push('/login')
      } else {
        let message = res.msg
        this.open2('error', message)
      }
    },
    open2(type, message) {
      Message({
        showClose: true,
        message: message,
        type: type
      })
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
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  components: {
    Particles
  }
}
</script>

<style lang="less" scoped>
  // less 混合
  .w-h-f() {
    width: 80px;
    display: inline-block;
    font-size: 18px;
    transform: translateY(6px);
    color: #aaa;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border-radius: 50%;
    border: 1px solid #DCDFE6;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: block;
  }
  @media all and (min-width: 1200px ) {
    .register-wrap{
      width: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      height: 100vh;
      background-color: #eee;
      .container{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -220px;
        box-sizing: border-box;
        background-color: rgba(255,255,255,.8);
        box-shadow: 2px 2px 6px rgba(144,147,153,0.3), 1px 3px 6px rgba(39,44,49,0.1);
        border-radius: 10px;
        padding-top: 20px;
        width: 500px;
        height: 440px;
        z-index: 10;
        .blog-login{
          color: rgba(0,0,0,.7);
          width: 100%;
          height: 40px;
          text-align: center;
          font-size: 24px;
          .iconfont{
            color: #409EFF;
            transform: translateY(-3px);
            font-size: 24px;
          }
        }
        .input-wrap{
          box-sizing: border-box;
          padding: 10px 30px 0 30px;
          width: 100%;
          height: 380px;
          .user-logo{
            margin: 0 auto;
            width: 100px;
            height: 100px;
          }
          .form-wrap{
            margin-top: 15px;
            text-align: center;
            width: 100%;
            height: 250px;
            .btn-group{
              width: 200px;
              margin-left: 100px;
              height: 60px;
              line-height: 40px;
              position: relative;
              font-size: 14px;
            }
          }
        }
      }
      .icon-back{
        cursor: pointer;
        color: black;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 10;
        font-size: 18px;
        font-weight: 500;
        .back{
          padding-left: 3px;
        }
        &:hover{
          color: rgba(255, 69, 0, 0.8);
        }
      }
    }
  }
  @media all and (max-width: 1200px ) and (min-width: 960px ) {
    .register-wrap{
      width: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      height: 100vh;
      background-color: #eee;
      .container{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -220px;
        background-color: rgba(255,255,255,.8);
        box-shadow: 2px 2px 6px rgba(144,147,153,0.3), 1px 3px 6px rgba(39,44,49,0.1);
        border-radius: 10px;
        padding-top: 20px;
        width: 500px;
        height: 440px;
        box-sizing: border-box;
        z-index: 10;
        .blog-login{
          color: rgba(0,0,0,.7);
          width: 100%;
          height: 40px;
          text-align: center;
          font-size: 24px;
          .iconfont{
            color: #409EFF;
            transform: translateY(-3px);
            font-size: 24px;
          }
        }
        .input-wrap{
          padding: 10px 30px 0 30px;
          width: 100%;
          height: 380px;
          box-sizing: border-box;
          .user-logo{
            margin: 0 auto;
            width: 100px;
            height: 100px;
          }
          .form-wrap{
            margin-top: 15px;
            width: 100%;
            height: 250px;
            .btn-group{
              width: 200px;
              margin-left: 100px;
              height: 60px;
              line-height: 40px;
              position: relative;
              font-size: 14px;
            }
          }
        }
      }
      .icon-back{
        z-index: 10;
        cursor: pointer;
        color: black;
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 20px;
        .back{
          padding-left: 3px;
        }
        &:hover{
          color: orangered;
        }
      }
    }
  }
  @media all and (max-width: 960px ) and (min-width: 768px) {
    .register-wrap{
      width: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      height: 100vh;
      background-color: #eee;
      .container{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -220px;
        background-color: rgba(255,255,255,.8);
        box-shadow: 2px 2px 6px rgba(144,147,153,0.3), 1px 3px 6px rgba(39,44,49,0.1);
        border-radius: 10px;
        padding-top: 20px;
        width: 500px;
        height: 440px;
        box-sizing: border-box;
        z-index: 10;
        .blog-login{
          color: rgba(0,0,0,.7);
          width: 100%;
          height: 40px;
          text-align: center;
          font-size: 22px;
          .iconfont{
            color: #409EFF;
            transform: translateY(-3px);
            font-size: 22px;
          }
        }
        .input-wrap{
          box-sizing: border-box;
          padding: 10px 30px 0 30px;
          width: 100%;
          height: 380px;
          .user-logo{
            margin: 0 auto;
            width: 100px;
            height: 100px;
          }
          .form-wrap{
            margin-top: 15px;
            width: 100%;
            height: 250px;
            .btn-group{
              width: 200px;
              margin-left: 100px;
              height: 60px;
              line-height: 40px;
              position: relative;
              font-size: 14px;
            }
          }
        }
      }
      .icon-back{
        z-index: 10;
        cursor: pointer;
        color: black;
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 20px;
        .back{
          padding-left: 3px;
        }
        &:hover{
          color: orangered;
        }
      }
    }
  }
  @media all and (max-width: 768px) {
    .register-wrap{
      width: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 200;
      height: 100vh;
      background-color: #eee;
      .container{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -45%;
        margin-top: -5.4rem;
        background-color: rgba(255,255,255,.8);
        box-shadow: 2px 2px 6px rgba(144,147,153,0.3), 1px 3px 6px rgba(39,44,49,0.1);
        border-radius: 0.3rem;
        padding-top: 0.3rem;
        width: 90%;
        height: 10.8rem;
        z-index: 10;
        .blog-login{
          box-sizing: border-box;
          width: 100%;
          height: 1rem;
          text-align: center;
          font-size: 0.5rem;
          color: rgba(0,0,0,.7);
          .iconfont{
            color: #409EFF;
            transform: translateY(-0.12rem);
            font-size: 0.55rem;
          }
        }
        .input-wrap{
          box-sizing: border-box;
          padding: 0.2rem 0.6rem 0 0.6rem;
          width: 100%;
          height: 10rem;
          .user-logo{
            margin: 0 auto;
            width: 2.666rem;
            height: 2.666rem;
          }
          .form-wrap{
            text-align: center;
            margin-top: 0.4rem;
            width: 100%;
            height: 6.5rem;
          }
        }
      }
      .icon-back{
        cursor: pointer;
        color: black;
        position: absolute;
        top: 0.3rem;
        left: 0.3rem;
        z-index: 10;
        font-size: 0.4rem;
        .back{
          padding-left: 0.1rem;
        }
      }
    }
  }
</style>
