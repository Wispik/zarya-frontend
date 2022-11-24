<template>
  <div class="login-page">
    <form @submit.prevent="login" class="login-form">
      <img src="/logo.png" alt="Логотип">
      <div class="login-form__text">Вход в сервис</div>
      <app-input v-model="username" placeholder="Логин" height="48" />
      <app-input v-model="password" placeholder="Пароль" type="password" height="48" />
      <button class="login-form__button">Войти</button>
    </form>
  </div>
</template>

<script>
import AppInput from '@/components/UI/AppInput.vue';

import api from '@/api';

import { mapActions } from 'vuex'

export default {
  components: { AppInput },
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    ...mapActions(['AUTH_LOGIN']),
    async login() {
      let formData = new FormData()

      formData.append('user_name', this.username)
      formData.append('password', this.password)

      let resp = await fetch(`${api.BASE_URL}/login`, 
        {
          method: "POST",
          body: formData
        }
      )

      let json = await resp.json()
      let token = json['data']
      this.AUTH_LOGIN(token)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-form {
    width: 408px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 28px;
    margin: 84px 20px;
    background: #FFFFFF;
    box-shadow: 0px 12px 24px rgba(118, 118, 118, 0.1);
    border-radius: 8px;
  }
  .login-form__text {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 8px;
  }
  .login-form__button {
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #FFFFFF;
    width: 100%;
    height: 48px;
    background: var(--red-color);
    border-radius: 4px;
    cursor: pointer;
  }
</style>