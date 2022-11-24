<template>
  <div class="dropdown-wrapper" ref="dropdown">
    <div class="dropdown" :class="{'open': open, 'open-top': openTop}">
      <div class="dropdown__main" @click="popupToggle">
        <span>{{ modelValue }}</span>
      </div>
      <div class="dropdown__popup" v-click-outside="popupClose" v-if="open">
        <div 
          class="dropdown__popup-item"
          v-for="item in items"
          :key="item.title"  
          @click="select(item.title)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number
  },
  data: () => ({
    open: false,
    openTop: false,
    items: [
      {
        title: 10
      },
      {
        title: 20
      },
      {
        title: 30
      },
      {
        title: 40
      },
      {
        title: 50
      },
      {
        title: 100
      }
    ]
  }),
  methods: {
    popupToggle() {
      this.open = !this.open
      if (this.open) {
        const top = this.$refs.dropdown.getBoundingClientRect().top + window.scrollY
        const bodyHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        )
        const dropHeight = (this.items.length + 1) * 36
        if (top + dropHeight > bodyHeight) {
          this.openTop = true
        } else {
          this.openTop = false
        }
      }
    }, 
    popupClose() {
      this.open = false
    },
    select(title) {
      this.$emit('update:modelValue', title)
      this.popupClose()
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropdown-wrapper {
    position: relative;
    width: 68px;
    height: 40px;
    color: var(--text2-color);
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
    user-select: none;
    z-index: 10;
  }
  .dropdown {
    width: 100%;
    background: #ffffff;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #E5E7EB;
    display: flex;
    flex-direction: column;
  }
  .dropdown__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
  
    &:after {
      content: '';
      width: 24px;
      height: 24px;
      background: url('@/assets/images/icon-arrow-down.svg') no-repeat center;
    }

    & > span {
      padding-left: 4px;
    }
  }
  .dropdown.open {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #D1D5DB;
    box-shadow: 0px 12px 32px 4px rgba(17, 17, 17, 0.08);

    & .dropdown__main {
      border-bottom: 1px solid #E5E7EB;
    }

    &.open-top {
      top: auto;
      bottom: 0;
      flex-direction: column-reverse;

      & .dropdown__main {
        border-top: 1px solid #E5E7EB;
        border-bottom: none;
      }
    }

  }
  .dropdown__popup {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 2px;
  }
  .dropdown__popup-item {
    height: 32px;
    padding: 4px 8px;

    &:hover {
      background: #E5E7EB;
      border-radius: 4px;
    }
  }
</style>