<template>
  <div v-if="data || url" class="info" :class="color">
    <div class="info-title">{{ title }}</div>
    <div class="info-block">
      <div v-if="data" class="info-price">{{ formatPrice() }} ₽</div>
      <div v-if="data" class="info-date">
        <span>Срок поставки</span>
        <div class="info-date__dots"></div>
        <div class="info-date__date" v-html="formatDate()"></div>
      </div>
      <a :href="href" class="info-button" :class="{'disabled': !href}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_5483_4288)">
          <path d="M6 11.3333L10 11.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.99935 4.00008V8.66675M7.99935 8.66675L10.3327 6.33341M7.99935 8.66675L5.66602 6.33341" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.00065 14.6666C11.6825 14.6666 14.6673 11.6818 14.6673 7.99992C14.6673 4.31802 11.6825 1.33325 8.00065 1.33325C4.31875 1.33325 1.33398 4.31802 1.33398 7.99992C1.33398 11.6818 4.31875 14.6666 8.00065 14.6666Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_5483_4288">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
        </svg>
        Скачать
      </a>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  props: {
    data: {
      type: Object,
      default: null 
    },
    color: String,
    title: String,
    type: String,
    url: {
      default: '',
      type: String
    }
  },
  methods: {
    formatPrice() {
      let m = this.data.sum.toString().match(/^(.*?)((?:[,.]\d+)?|)$/);
      if (m) {
        return m[1].replace(/\B(?=(?:\d{3})*$)/g, ' ') + m[2]
      } else {
        return strs[i]
      }
    },
    formatDate() {
      let d = new Date(this.data.date)
      let nowD = new Date()
      let dateDiff = Math.round((d - nowD) / (1000 * 60 * 60 * 24));
      const lastDigitToWord = (digit) => {
        const lastFigure = parseInt(digit.toString().substr(digit.toString().length - 1, 1));
        if (digit >= 11 && digit < 15) {
          return 'дней';
        }
        else {
          if (lastFigure == 1) return 'день';
          if (lastFigure > 1 && lastFigure < 5) return 'дня';
          if (lastFigure == 0 || lastFigure >= 5) return 'дней';
        }
      }
      let day = d.getDate().toString().padStart(2, '0')
      let month = (d.getMonth() + 1).toString().padStart(2, '0')
      let year = d.getFullYear()
      let s = `${dateDiff} ${lastDigitToWord(dateDiff)}`
      return `${day}.${month}.${year}<span style="font-weight:400;font-size:10px;line-height: 12px;">${s}</span>`
    }
  },
  computed: {
    href() {
      if (this.url) return `${api.BASE_URL}${this.url}`
      if (this.data.path) return `${api.BASE_URL}/load_file?order_name=${this.$route.params.name}&opt=${this.type}`
      else return null
    }
  }
}
</script>

<style lang="scss" scoped>
  .info {
    width: 100%;
    height: 186px;
    position: relative;
    display: flex;
    align-items: flex-end;

    &.green {
      & .info-block {
        background: linear-gradient(282.35deg, #A1DB45 0%, #82B82D 101.07%);
      }
      & .info-title {
        color: #82B82D;
        border: 2px solid #82B82D;
      }
      & .info-button:hover {
        color: #82B82D;

        & path {
          stroke: #82B82D;
        }
      }
    }
    &.orange {
      & .info-block {
        background: linear-gradient(282.35deg, #FFB74B 0%, #FE8900 101.07%);
      }
      & .info-title {
        color: #FE8900;
        border: 2px solid #FE8900;
      }
      & .info-button:hover {
        color: #FE8900;

        & path {
          stroke: #FE8900;
        }
      }
    }
    &.blue {
      & .info-block {
        background: linear-gradient(282.35deg, #71B2FE 0%, #5F8EEA 101.07%);
      }
      & .info-title {
        color: #5F8EEA;
        border: 2px solid #5F8EEA;
      }
      & .info-button:hover {
        color: #5F8EEA;

        & path {
          stroke: #5F8EEA;
        }
      }
    }
  }
  .info-block {
    width: 100%;
    height: 176px;
    border-radius: 20px;
    z-index: 1;
    color: #ffffff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &:hover {
      box-shadow: 0px 2px 0px #F4F5F8, 0px 28px 32px rgba(17, 17, 17, 0.1);
    }
  }
  .info-title {
    height: 28px;
    position: absolute;
    left: 0;
    top: 0px;
    background: #FFFFFF;
    border-radius: 12px 0px;
    z-index: 5;
    padding: 4px 20px;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
  .info-price {
    margin-top: 20px;
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    letter-spacing: -0.2px;
  }
  .info-date {
    display: flex;
    gap: 12px;
    margin-top: 12px;
    margin-bottom: 4px;

    & > span {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      opacity: 0.8;
      white-space: nowrap;
    }
  }
  .info-date__dots {
    flex: 1;
    opacity: 0.8;
    border-top: 1px dashed #FFFFFF;
    margin-top: 8px;
  }
  .info-date__date {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
  }
  .info-button {
    cursor: pointer;
    width: 122px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.1px;
    color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    user-select: none;

    &:hover {
      background: #ffffff;
    }

    &.disabled {
      cursor: not-allowed;
    }
  }
</style>