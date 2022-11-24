<template>
  <div class="table-wrapper">
    <table class="table">
      <thead class="thead">
        <th 
          class="th" 
          :class="{'sort': sort.col==='name', 'sort-invert': sort.invert}"
          @click="changeSort('name')"
        >
          <div class="th-block">Название</div>
        </th>
        <th 
          class="th" 
          :class="{'sort': sort.col==='date', 'sort-invert': sort.invert}"
          @click="changeSort('date')" 
          v-if="!provider" 
          width="140"
        >
          <div class="th-block">Дата</div>
        </th>
        <th 
          class="th" 
          :class="{'sort': sort.col==='active', 'sort-invert': sort.invert}"
          @click="changeSort('active')" 
          width="160"
        >
          <div class="th-block">Статус</div>
        </th>
        <th 
          class="th"
          v-if="!provider" 
          width="110"
        >
        </th>
      </thead>
      <tbody class="tbody">
        <tr 
          class="tr"
          v-for="(item, i) in computedData"
          :key="i"
        >
          <td class="td td-title" v-if="provider">{{ item.name }}</td>
          <td class="td" v-if="!provider">
            <div class="td-with-icon">
              {{ item.name }}
            </div>
          </td>
          <td class="td td-date" v-if="!provider" v-html="formateDate(item.date)"></td>
          <td class="td" v-if="!provider">
            <div class="status-label">
              <span :class="{'active': item.active, 'deactive': !item.active}" >
                {{ item.active ? 'Активна' : 'Завершена' }}
              </span>
            </div>
          </td>
          <td class="td" v-if="provider">
            <div class="status-purchase" :class="{'success': item.active}">
              {{ item.active ? 'Ответ получен' : 'Ожидаем ответа' }}
            </div>
          </td>
          <td class="td" v-if="!provider">
            <router-link class="table-button" :to="`/purchase/${item.name}`">
              Детали
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 10.6666L5.66667 5.99992L1 1.33325" stroke="#5F8EEA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="table__bottom">
    <app-dropdown v-model="itemsPerPage"/>
    <table-pagination :pages="pages" v-model="page" />
  </div>
</template>

<script>
import AppDropdown from '@/components/UI/AppDropdown.vue';
import TablePagination from '@/components/UI/TablePagination.vue';

export default {
  props: {
    data: Array,
    provider: {
      type: Boolean,
      default: false
    },
    filteredTitle: String,
    filteredStatus: {
      type: String,
      default: 'all'
    }
  },
  components: { AppDropdown, TablePagination },
  data: () => ({
    itemsPerPage: 10,
    page: 1,
    sort: {
      col: null,
      invert: false
    }
  }),
  methods: {
    formateDate(date) {
      let D = new Date(date)
      let y = D.getFullYear()
      let m = (D.getMonth() + 1).toString().padStart(2, '0')
      let d = D.getDate().toString().padStart(2, '0')
      let h = D.getHours().toString().padStart(2, '0')
      let min = D.getMinutes().toString().padStart(2, '0')
      return `${d}.${m}.${y} <span style="color: #6b7280;">・ ${h}:${min}</span>`
    },
    changeSort(col) {
      if (col !== this.sort.col) {
        this.sort.col = col
      } else {
        this.sort.invert = !this.sort.invert
      }
      this.page = 1
    }
  },
  computed: {
    filteredData() {
      let newData = []
      this.data.forEach(el => {
        if (this.filteredTitle.length > 0) {
          if (el.name.toLowerCase().indexOf(this.filteredTitle.toLowerCase()) < 0) {
            return
          }
        }
        if (this.filteredStatus === 'active') {
          if (!el.active) return
        }
        else if (this.filteredStatus === 'deactive') {
          if (el.active) return
        }
        newData.push(el)
      })
      return newData
    },
    pages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
    computedData() {
      let newData = this.filteredData
      if (this.sort.col) {
        const col = this.sort.col
        const invert = this.sort.invert ? 1 : -1

        if (col === 'active') {
          newData.sort((a, b) => (b[col] - a[col]) * invert)
        } else {
          newData.sort((a, b) => {
            const bandA = a[col].toUpperCase()
            const bandB = b[col].toUpperCase()
  
            let comparison = 0;
            if (bandA > bandB) {
              comparison = 1;
            } else if (bandA < bandB) {
              comparison = -1;
            }
            return comparison * invert;
          })
        }

      }

      let start = (this.page-1) * this.itemsPerPage
      let end = ((this.page-1) * this.itemsPerPage) + this.itemsPerPage
      return newData.slice(start, end)
    }
  },
  watch: {
    pages() {
      if (this.page > this.pages) this.page = 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .table__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .table {
    border-collapse: collapse;
    width: 100%;
  }
  .thead {
    border-bottom: 2px solid #9ca3af28;
    cursor: pointer;
    user-select: none;
  }
  .th {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #6B7280;
    text-align: left;
    position: relative;
  }
  .th-block {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
  }
  .th.sort::before {
    content: '';
    position: absolute;
    width: calc(100% - 20px);
    height: 2px;
    left: 0;
    bottom: -2px;
    background: #9CA3AF;
  }
  .th.sort .th-block::after {
    content: '';
    width: 16px;
    height: 16px;
    background: url('@/assets/images/icon-sort.svg') center no-repeat;
  }
  .th.sort.sort-invert .th-block::after {
    transform: scale(1, -1);
  }
  .tr {
    height: 48px;
    border-bottom: 1px solid #E5E7EB;

    &:hover {
      background: #ffffff;
    }
  }
  .td {
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 20px;

    &:last-of-type {
      padding-right: 0;
    }
  }
  .td-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    
  }
  .td-with-icon {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    
    &::before {
      content: '';
      width: 24px;
      height: 24px;
      background: url('@/assets/images/icon-word.svg') center no-repeat;
      margin-left: 16px;
    }
  }
  .status-label span {
    display: grid;
    grid-template-columns: 20px auto;
    align-items: center;
    border-radius: 80px;
    gap: 8px;
    padding: 6px 12px 6px 6px;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;

    &.active {
      width: 96px;
      background: var(--green-light-color);
      color: var(--green-color);

      &::before {
        content: '';
        width: 20px;
        height: 20px;
        background: url('@/assets/images/icon-active.svg') center no-repeat;
      }
    }
    &.deactive {
      width: 114px;
      background: var(--red-light-color);
      color: var(--red-color);

      &::before {
        content: '';
        width: 20px;
        height: 20px;
        background: url('@/assets/images/icon-deactive.svg') center no-repeat;
      }
    }
  }
  .table-button {
    border: 1px solid rgba(95, 142, 234, 0.5);
    border-radius: 4px;
    background: transparent;
    outline: none;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: var(--blue-color);

    &:hover {
      background: var(--blue-color);
      border-color: var(--blue-color);
      color: #ffffff;

      & path {
        stroke: #ffffff;
      }
    }
  }
  .td.td-date {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  .status-purchase {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--red-color);
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;

    &::before {
      content: '';
      width: 20px;
      height: 20px;
      background: url('@/assets/images/icon-deactive2.svg');
    }

    &.success {
      color: var(--green-color);

      &::before {
        content: '';
        width: 20px;
        height: 20px;
        background: url('@/assets/images/icon-active2.svg');
      }
    }
  }
</style>