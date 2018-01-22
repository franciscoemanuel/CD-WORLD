<template>
  <div class="bg-login">
    <div class="cadastro-container">
      <el-row type="flex">
        <el-col :xs="{span: 16, offset: 4}" :sm="{span: 14, offset: 4}" :md="{span: 14, offset: 6}" :lg="{span: 8, offset: 8}">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Cadastro</span>
            </div>
            <el-form autoComplete="on" :model="signUpForm" :rules="signUpRules" ref="signUpForm" label-position="left" label-width="0px"
              class="card-box signUp-form">
              <el-form-item prop="username">
                  <el-input prefix-icon="el-icon-fa-user" name="username" type="text" v-model="signUpForm.username" autoComplete="on" placeholder="Digite aqui seu nome completo" />
              </el-form-item>
              <el-form-item prop="email">
                  <el-input prefix-icon="el-icon-fa-envelope-o" name="email" type="text" v-model="signUpForm.email" autoComplete="on" placeholder="Digite aqui seu email" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input prefix-icon="el-icon-fa-lock" name="password" :type="pwdType" @keyup.enter.native="handleSignUp" v-model="signUpForm.password" autoComplete="on"
                  placeholder="Senha de no mínimo 6 caracteres"></el-input>
              </el-form-item>
              <el-form-item prop="passwordConfirmation">
                <el-input prefix-icon="el-icon-fa-lock" name="passwordConfirmation" :type="pwdType" @keyup.enter.native="handleSignUp" v-model="signUpForm.passwordConfirmation" autoComplete="on"
                  placeholder="Senha de confirmação"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="loading" @click.native.prevent="handleSignUp">
                  Cadastrar
                </el-button>
                <router-link to="/">
                  <el-button type="secondary">Cancelar</el-button>
                </router-link>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from '@/utils/validate'
import { translateFirebaseErrorCodeToMessage } from '@/utils/firebaseErrorMessages'

export default {
  name: 'signUp',
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
        callback(new Error('Insira uma senha que tenha no mínimo 6 e no máximo 12 caracteres'))
      } else {
        callback()
      }
    }
    const validatePasswordConfirmation = (rule, value, callback) => {
      if (value !== this.signUpForm.password) {
        callback(new Error('As senhas não são iguais'))
      } else {
        callback()
      }
    }
    return {
      signUpForm: {
        username: '',
        password: '',
        email: '',
        passwordConfirmation: ''
      },
      signUpRules: {
        username: [{ required: true, trigger: 'blur', message: 'Insira um nome de usuário' }],
        password: [
          { required: true, trigger: 'blur', message: 'Insira uma senha' },
          { validator: validatePasswordLength, trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur', message: 'Insira um e-mail!' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        passwordConfirmation: [
          { validator: validatePasswordConfirmation, trigger: 'blur' }
        ]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    handleSignUp() {
      this.$refs.signUpForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('SignUp', this.signUpForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/login' })
          }).catch((err) => {
            const message = translateFirebaseErrorCodeToMessage(err.code)
            this.$notify({ type: 'error', title: 'Falha ao realizar cadastro', message })
            this.loading = false
          })
        } else {
          console.log('Erro ao tentar realizar cadastro!!')
          return false
        }
      })
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
  .cadastro-container {
    padding-top: 8em;
    position: relative;
  }
  .bg-login {
    background-image: url('../../assets/background.jpg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    height: 50em;
    position: inherit;
  }
</style>
