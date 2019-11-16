<template>
  <div class="login-wrap">
    <Particles/>
    <div class="container">
      <h2 class="blog-login"><span class="iconfont icon-yonghudenglurenxianxing"></span> 用户登录</h2>
      <div class="input-wrap">
        <div class="form-wrap">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input type="text" placeholder="用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="密码"v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password"placeholder="确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="desc">还没有账号？ <span @click="toRegister">立即注册</span></div>
      </div>
    </div>
    <span class="iconfont icon-back" @click="toBack"> <span class="back">返回</span></span>
  </div>
</template>

<script>
import Particles from '../../components/particles/particles'
import { _login, _getUserInfo } from '../../common/api'
import { Message } from 'element-ui'
export default {
  name: 'login',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {  min: 1,max: 8, message: '长度为1 - 8个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleLogin()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
   async handleLogin () {
      let data = {
        username: this.ruleForm.username,
        password: this.ruleForm.password
      }
      let res = await _login(data)
      if(res.code === 0) {
        let result = await _getUserInfo()
        if(result.code === 0){
          this.$store.commit('setUserInfo', { userInfo: result.data})
        }
       this.$router.push('/')
      } else {
        let msg = '账号或密码错误'
        this.open2(msg)
      }

    },
    open2(msg) {
      Message({
        message: msg,
        type: 'success'
      })
    },
    toRegister () {
      this.$router.push('/register')
    },
    toBack () {
      this.$router.replace('/')
    },
  },
  components: {
    Particles
  }
}
</script>

<style lang="less">
  // less 混合
  .w-h-f() {
    color: #aaa;
    width: 80px;
    display: inline-block;
    font-size: 18px;
    transform: translateY(6px);
  }
  @media all and (min-width: 1200px ) {
    .login-wrap{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      width: 100%;
      height: 100vh;
      background-color: #eee;
      overflow: hidden;
      .container{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -185px;
        padding-top: 30px;
        box-sizing: border-box;
        z-index: 10;
        background-color: rgba(255,255,255,.8);
        color: black;
        border-radius: 5px;
        width: 500px;
        height: 370px;
        box-shadow: 2px 2px 6px rgba(144,147,153,0.3), 1px 3px 6px rgba(39,44,49,0.1);
        .blog-login{
          width: 100%;
          height: 40px;
          text-align: center;
          font-size: 24px;
          color: rgba(0,0,0,.7);
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
          height: 300px;
          .form-wrap{
            text-align: center;
            width: 100%;
            height: 250px;
          }
          .desc{
            color: #aaa;
            font-size: 12px;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            height: 30px;
            span{
              cursor: pointer;
              color: rgba(255, 69, 0, 0.8);
              &:hover{
                color: #409EFF;
              }
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
    .login-wrap{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      width: 100%;
      height: 100vh;
      background-color: #eee;
      overflow: hidden;
      .container{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -185px;
        box-sizing: border-box;
        z-index: 10;
        background-color: rgba(255,255,255,.8);
        padding-top: 30px;
        color: black;
        border-radius: 5px;
        width: 500px;
        height: 370px;
        box-shadow: 2px 2px 6px rgba(144,147,153,0.3), 1px 3px 6px rgba(39,44,49,0.1);
        .blog-login{
          width: 100%;
          height: 40px;
          text-align: center;
          font-size: 24px;
          color: rgba(0,0,0,.7);
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
          height: 300px;
          .form-wrap{
            text-align: center;
            width: 100%;
            height: 250px;
          }
          .desc{
            color: #aaa;
            font-size: 12px;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            height: 30px;
            span{
              cursor: pointer;
              color: rgba(255, 69, 0, 0.8);
              &:hover{
                color: #1e90ff;
              }
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
  @media all and (max-width: 960px) and (min-width: 768px) {
    .login-wrap{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      width: 100%;
      height: 100vh;
      background-color: #eee;
      overflow: hidden;
      .container{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -185px;
        box-sizing: border-box;
        z-index: 10;
        background-color: rgba(255,255,255,.8);
        padding-top: 30px;
        color: black;
        border-radius: 5px;
        width: 500px;
        height: 370px;
        box-shadow: 2px 2px 6px rgba(144,147,153,0.3), 1px 3px 6px rgba(39,44,49,0.1);
        .blog-login{
          width: 100%;
          height: 40px;
          text-align: center;
          font-size: 24px;
          color: rgba(0,0,0,.7);
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
          height: 300px;
          .form-wrap{
            text-align: center;
            width: 100%;
            height: 250px;
          }
          .desc{
            color: #aaa;
            font-size: 12px;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            height: 30px;
            span{
              cursor: pointer;
              color: rgba(255, 69, 0, 0.8);
              &:hover{
                color: #1e90ff;
              }
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
  @media all and (max-width: 768px)  {
    .login-wrap{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 200;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background-color: #eee;
      .container{
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -45%;
        margin-top: -5.25rem;
        z-index: 10;
        background-color: rgba(255,255,255,.8);
        padding-top: 0.4rem;
        color: black;
        border-radius: 5px;
        width: 90%;
        height: 10.5rem;
        box-shadow: 2px 2px 6px rgba(144,147,153,0.3), 1px 3px 6px rgba(39,44,49,0.1);
        .blog-login{
          box-sizing: border-box;
          width: 100%;
          height: 1rem;
          text-align: center;
          font-size: 0.55rem;
          color: rgba(0,0,0,.7);
          .iconfont{
            color: #409EFF;
            transform: translateY(-0.12rem);
            font-size: 0.55rem;
          }
        }
        .input-wrap{
          padding: 0.2rem 0.6rem 0 0.6rem;
          box-sizing: border-box;
          width: 100%;
          height: 9rem;
          .form-wrap{
            text-align: center;
            width: 100%;
            height: 7.7rem;
          }
          .desc{
            text-align: center;
            color: #aaa;
            font-size: 0.35rem;
            width: 100%;
            box-sizing: border-box;
            height: 1rem;
            span{
              cursor: pointer;
              color: rgba(255, 69, 0, 0.8);
            }
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
