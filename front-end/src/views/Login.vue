<template>
  <div class="login">
    <el-form ref="userInfo" :model="userInfo" :rules="loginRules" class="login-form">
      <h3 class="title">图书管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="userInfo.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="userInfo.password" type="password" auto-complete="off" placeholder="密码"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input v-model="userInfo.code" auto-complete="off" placeholder="验证码" style="width: 63%"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-form-item prop="roleId" v-if="captchaEnabled">

        <el-select placeholder="身份" v-model="userInfo.roleId" size="large">
          <el-option v-for="item in OPTIONS" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- <el-checkbox v-model="userInfo.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
          @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCodeImg, loginApi } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt';
import {useRouter}from 'vue-router'
const OPTIONS=[
  {
    value:2,
    label:'读者'
  },
  {
    value:3,
    label:'管理员'
  },
  {
    value:1,
    label:'超级管理员'
  }
]
export default {
  name: "Login",
  setup(){
    // const options = useRef([]);
    const router = useRouter()
    function goTo(path){
      router.push(path)
    }
    return {
      OPTIONS,
      goTo,
    }
  },
  data() {
    return {
      codeUrl: "",
      userInfo: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
        role:null,
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
        roleId: [{ required: true, trigger: "change", message: "请选择身份" }]
      },
      loading: false,
      // 验证码开关
      captchaEnabled: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.userInfo.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.userInfo = {
        username: username === undefined ? this.userInfo.username : username,
        password: password === undefined ? this.userInfo.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.userInfo.validate(valid => {
        if (valid) {
          this.loading = true;
          loginApi(this.userInfo)
          .then(res=>{
            // localStorage.setItem('token',res.token)
            if(this.userInfo.rememberMe){
              Cookies.set('token',res.token,{expires:15})
            }else{
              Cookies.set('token',res.token)
            }
            const roleId=this.userInfo.roleId
            localStorage.setItem('roleId',roleId)
            const fromPath = sessionStorage.getItem('fromPath');
            const obj={
              1:'/admin/admin-manage',
              2:'/',
              3:'/admin/reader-manage',
            }
            let _fromPath=fromPath;
            if(fromPath==='/login'||!fromPath){
              _fromPath =obj[roleId]
            }
            this.goTo(_fromPath)
          })
          .catch(err=>{
            if(err.code===100001||err.code===100002||err.code===500||err.code===100003){
              this.userInfo.code=null
              this.getCode();
            }
            if(err.code===100003){
              this.userInfo.roleId=null
            }
          })
          .finally(()=>{
            this.loading=false
          })
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/scss/var.scss';

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: $main-color;
  background-size: cover;

}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
</style>
