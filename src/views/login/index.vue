<template>
  <div class="login-container">
    <el-row type="flex">
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 14, offset: 4}" :md="{span: 14, offset: 6}" :lg="{span: 8, offset: 8}">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Login</span>
            <router-link to="/cadastro">
              <el-button style="float: right; padding: 3px 0" type="text">Cadastre-se</el-button>
            </router-link>
          </div>
           <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
            class="card-box login-form">
            <el-form-item prop="email">
                <el-input prefix-icon="el-icon-fa-envelope-o" name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="exemplo@exemplo.com" />
            </el-form-item>
            <el-form-item prop="password">
              <el-row :gutter="15">
                <el-col :xs="16" :span="20">
                  <el-input :maxlength=12 prefix-icon="el-icon-fa-lock" name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                    placeholder="******"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button @click.native.prevent="showPwd" type="secondary" icon="el-icon-fa-eye"></el-button>
                </el-col>
              </el-row>
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
import { isValidEmail } from '@/utils/validate'
import { translateFirebaseErrorCodeToMessage } from '@/utils/firebaseErrorMessages'
import { setLocalStorageUser } from '@/utils/auth'

export default {
  name: 'login',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isValidEmail(value)) {
        callback(new Error('E-mail inválido'))
      } else {
        callback()
      }
    }
    const validatePasswordLength = (rule, value, callback) => {
      if (value.length < 6 || value.length > 12) {
        callback(new Error('A senha deve ter no mínimo 6 caracteres'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          { required: true, trigger: 'blur', message: 'Insira um e-mail' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: 'Insira uma senha' },
          { validator: validatePasswordLength, trigger: 'blur' }
        ]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() { this.pwdType = this.pwdType === 'password' ? '' : 'password' },
    handleLogin() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true
        this.$store.dispatch('Login', this.loginForm)
          .then(() => {
            return this.$store.dispatch('FetchUserData')
          })
          .then(() => {
            const authenticatedUser = this.$store.getters.user
            setLocalStorageUser(authenticatedUser)
            this.loading = false
            this.$router.push({ path: '/' })
          })
          .catch((err) => {
            // console.log(err)
            const message = translateFirebaseErrorCodeToMessage(err.code)
            this.$notify({ type: 'error', title: 'Falha ao fazer login', message })
            this.loading = false
          })
      } else {
        this.$notify({ type: 'error', title: 'Falha ao fazer login', message: 'Erro inesperado' })
      }
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId
    }
  },
  watch: {
    userId(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
  .login-container {
    margin-top: 8em
  }
</style>
