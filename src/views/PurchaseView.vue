<template>
  <app-header />
  <div class="main-content">
    <div class="container">
      <div class="purchase-page">
        <div class="purchase-page__header">
          <div class="purchase-page__title">{{ title }}</div>
          <div class="purchase-page__header-buttons">
            <app-tabs :items="tabs" name="status" v-model="activeTab" />
            <router-link
              class="purchase-page__header-btn"
              to="/"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.6666L5.33333 7.99992L10 3.33325" stroke="#5F8EEA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Закупки
            </router-link>
          </div>
        </div>
        <div class="purchase-page__subtitle">Список поставщиков</div>
        <div class="purchase-page__2cols">
          <div class="purchase-page__2cols-left">
            <app-input :search="true" placeholder="Поиск по поставщикам" v-model="search" />
            <app-table 
              :data="tableData" 
              :filtered-title="search"
              :provider="true"
            />
          </div>
          <div class="purchase-page__2cols-right">
            <info-block 
              title="САМЫЙ ДЕШЕВЫЙ"
              :data="min_price"
              color="green"
              type="price"
            />
            <info-block 
              title="САМЫЙ БЫСТРЫЙ"
              :data="min_date"
              color="orange"
              type="date"
            />
            <info-block 
              title="ЦЕНА-КАЧЕСТВО"
              :url="`/get_init_file?order_name=${title}`"
              color="blue"
              type="date"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppTabs from '@/components/UI/AppTabs.vue';
import AppInput from '@/components/UI/AppInput.vue';
import AppTable from '@/components/AppTable.vue';
import InfoBlock from '@/components/InfoBlock.vue';

import api from '@/api';

import { mapGetters } from 'vuex'

export default {
  components: { AppHeader, AppTabs, AppInput, AppTable, InfoBlock },
  data: () => ({
    title: '',
    activeTab: 'active',
    search: '',
    tabs: [
      {
        title: 'Активная',
        subTitle: '',
        value: 'active',
        color: 'green'
      },
      {
        title: 'Завершенная',
        subTitle: '',
        value: 'deactive',
        color: 'red'
      }
    ],
    tableData: [],
    min_price: null,
    min_date: null
  }),
  async mounted() {
    this.title = this.$route.params.name
    let res = await api.loadPurchaseInfo(this.title, this.token)
    this.min_price = res['data']['files']['min_price']
    this.min_date = res['data']['files']['min_date']
    res['data']['items'].forEach(el => {
      this.tableData.push({
        'name': el[0],
        'active': el[1]
      })
    })
    let stat = await api.getStatus(this.title, this.token)
    this.activeTab = stat['data'] ? 'active' : 'deactive'
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    activeTab() {
      let act = this.activeTab === 'active' ? 'activate' : 'deactivate'
      api.changeStatus(this.title, this.act, this.token)
          .then()
    }
  }
}
</script>

<style lang="scss" scoped>
  .purchase-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .purchase-page__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .purchase-page__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    color: var(--text2-color);
  }
  .purchase-page__header-buttons {
    display: flex;
    align-items: center;
    gap: 36px;
  }
  .purchase-page__header-btn {
    border: 1px solid rgba(95, 142, 234, 0.5);
    border-radius: 4px;
    padding: 8px 16px 8px 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: var(--blue-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background: var(--blue-color);
      border-color: var(--blue-color);
      color: #ffffff;

      & path {
        stroke: #ffffff;
      }
    }
  }
  .purchase-page__2cols {
    display: grid;
    grid-template-columns: 1fr 620px;
    gap: 20px;

    @media (max-width: 1300px) {
      grid-template-columns: 1fr 300px;
    }
  }
  .purchase-page__2cols-left {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .purchase-page__2cols-right {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
    }
  }
</style>