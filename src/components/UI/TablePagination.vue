<template>
  <div class="pag">
    <span>Страница</span>
    <div class="pag__block">
      <div 
        class="pag__button"
        :class="{'active': i===modelValue}"
        v-for="i in pages"
        @click="selectPage(i)"
      >
        {{ i }}
      </div>
    </div>
    <div class="pag__block">
      <div 
        class="pag__button pag__button-prev" 
        :class="{'disable': modelValue===1}"
        @click="prevPage"
      >
        <img src="@/assets/images/icon-arrow-down.svg">
      </div>
      <div 
        class="pag__button pag__button-next"
        :class="{'disable': modelValue===pages}"
        @click="nextPage"
      >
        <img src="@/assets/images/icon-arrow-down.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number,
    pages: Number
  },
  methods: {
    selectPage(i) {
      this.$emit('update:modelValue', i)
    },
    nextPage() {
      if (this.modelValue < this.pages)
        this.selectPage(this.modelValue+1)
    },
    prevPage() {
      if (this.modelValue > 1)
        this.selectPage(this.modelValue-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pag {
    display: flex;
    align-items: center;
    gap: 16px;
    user-select: none;
  }
  .pag__block {
    display: flex;
    gap: 4px;
  }
  .pag__button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: var(--text2-color);
    background: #ffffff;
    border: 1px solid #E5E7EB;
    border-radius: 4px;
    cursor: pointer;

    &.pag__button-prev img {
      transform: rotateZ(90deg);
    }
    &.pag__button-next img {
      transform: rotateZ(-90deg);
    }

    &.active {
      border: 1px solid var(--blue-color);
    }
    &.disable {
      border: 1px solid #E5E7EB;
      background: transparent;
      cursor: not-allowed;

      & > img {
        opacity: 0.5;
      }
    }
  }
</style>