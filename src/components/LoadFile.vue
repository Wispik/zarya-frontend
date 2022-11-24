<template>
  <form @submit.prevent="upload" class="load-block">
    <div class="load__title">
      Загрузить закупку
    </div>
    <AppInput v-model="name" placeholder="Название закупки" />
    <label class="load-label">
      <input type="file" @change="onChangeFile" class="load-label__input" accept=".xlsx,.xls">
      <div v-if="!file" class="load-label__button">
        <img src="@/assets/images/icon-upload.svg">
        Выбрать файл
      </div>
    </label>
    <div class="load__info" v-if="!file">Файл .xls размером до 5Мб</div>
    <div class="load__error" v-if="error">{{ error }}</div>
    <button class="load-button" v-if="file">Загрузить</button>
  </form>
</template>

<script>
import AppInput from '@/components/UI/AppInput.vue';

import api from '@/api';

import { mapGetters } from 'vuex'

export default {
  components: { AppInput },
  data: () => ({
    name: '',
    file: null,
    error: ''
  }),
  methods: {
    onChangeFile(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      this.error = ''

      let formData = new FormData()

      formData.append('upload_file', this.file)
      formData.append('order_name', this.name)
      formData.append('token', this.token)


      // let res = api.uploadFile(formData)

      let resp = await fetch(`${api.BASE_URL}/upload`, 
        {
          method: "POST",
          body: formData
        }
      )
      if (resp.ok) {
        console.log(json)
      } else {
        let json = await resp.json()
        this.error = json['errors']
      }

    }
  },
  computed: {
    ...mapGetters(['token'])
  }
}
</script>

<style lang="scss" scoped>
  .load-block {
    width: 300px;
    min-height: 244px;
    height: fit-content;
    max-height: 300px;
    position: relative;
    padding: 20px;
    background: url('@/assets/images/load-bg.png'), #FFFFFF;
    background-repeat: no-repeat;
    background-position: 180px 20px;
    border: 2px dashed #A9C1F1;
    box-shadow: 0px 12px 24px rgba(118, 118, 118, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .load__title {
    width: 150px;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    margin-top: 8px;
    margin-bottom: 12px;
  }
  .load__info {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #6B7280;
  }
  .load-label__input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
  .load-label__button {
    width: 100%;
    height: 40px;
    background: var(--red-color);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #FFFFFF;
    cursor: pointer;
  }
  .load-button {
    background: var(--blue-color);
    border-radius: 4px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
    border: none;
    outline: none;
    height: 40px;
  }
  .load__error {
    color: var(--red-color);
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
</style>