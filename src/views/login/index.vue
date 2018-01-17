<template>
  <div class="login-container">
    <el-row type="flex">
      <el-col :xs="{span: 16, offset: 4}" :sm="{span: 14, offset: 4}" :md="{span: 14, offset: 6}" :lg="{span: 8, offset: 8}">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Login</span>
            <el-button style="float: right; padding: 3px 0" type="text">Cadastre-se</el-button>
          </div>
           <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
            class="card-box login-form">
            <el-form-item prop="username">
                <el-input prefix-icon="el-icon-fa-user" name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="exemplo@exemplo.com" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input prefix-icon="el-icon-fa-lock" name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                placeholder="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                Entrar
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Usuário inválido'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('Senha inválida'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
  .login-container {
    margin-top: 15em
  }
</style>
