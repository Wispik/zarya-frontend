<template>
  <app-header />
  <div class="main-content">
    <div class="container">
      <div class="main-page">
        <div class="main-page__content">
          <div class="main-page__header">
            <span>Список закупок</span>
            <app-tabs :items="tabs" name="type" v-model="activeTab" />
          </div>
          <app-input :search="true" placeholder="Поиск по закупкам" v-model="search" />
          <app-table 
            :data="purchases" 
            :filtered-title="search" 
            :filtered-status="activeTab" 
          />
        </div>
        <load-file />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import LoadFile from '@/components/LoadFile.vue';
import AppInput from '@/components/UI/AppInput.vue';
import AppTabs from '@/components/UI/AppTabs.vue';
import AppTable from '@/components/AppTable.vue';

import api from '@/api';

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { 
    AppHeader, LoadFile, AppInput, AppTabs, AppTable
  },
  data: () => ({
    activeTab: 'all',
    search: '',
    tabs: [
      {
        title: 'Все',
        subTitle: '',
        value: 'all',
        color: 'blue'
      },
      {
        title: 'Активные',
        subTitle: '',
        value: 'active',
        color: 'green'
      },
      {
        title: 'Завершенные',
        subTitle: '',
        value: 'deactive',
        color: 'red'
      }
    ]
  }),
  async mounted() {
    let res = await api.loadAllPurchases(this.token)
    if (res) {
      this.SET_PURCHASES(res['data']['items'])
      this.tabs.forEach(el => {
        if (el.value === 'all') el.subTitle = this.puschasesAllCount
        else if (el.value === 'active') el.subTitle = this.puschasesActiveCount
        else el.subTitle = this.puschasesDeactiveCount
      })
    }
  },
  methods: {
    ...mapMutations(['SET_PURCHASES'])
  },
  computed: {
    ...mapGetters(['token', 'purchases', 'puschasesAllCount', 'puschasesActiveCount', 'puschasesDeactiveCount'])
  }
}
</script>

<style lang="scss" scoped>
  .main-page {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;

    @media (max-width: 1170px) {
      grid-template-columns: 1fr;
    }
  }
  .main-page__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .main-page__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    & > span {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
    }
  }
</style>