<template>
  <header class="header">
    <div class="container header__body">
      <router-link to="/">
        <img src="@/assets/images/logo-header.png" alt="Логотип">
      </router-link>
      <div class="header-right">
        <div class="header-user">
          <img src="@/assets/images/avatar.png" class="header-user__avatar">
          <div class="header-user__name">
            Парамонов Виктор Андреевич
          </div>
        </div>
        <button @click="logout" class="header-button">Выход</button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['AUTH_LOGOUT']),
    logout() {
      this.AUTH_LOGOUT()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 84px;
    padding: 16px 28px;
    background: #ffffff;

    @media (max-width: 1300px) {
      padding: 16px 0;
    }
  }
  .header__body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .header-user {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .header-user__avatar {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
  }
  .header-user__name {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: var(--text2-color);
    max-width: 160px;
  }
  .header-button {
    width: 77px;
    height: 36px;
    border: 1px solid #D1D5DB;
    border-radius: 4px;
    color: #9CA3AF;
    background: transparent;
    cursor: pointer;

    &:hover {
      border-color: var(--red-color);
      color: var(--red-color);
    }
  }
</style>