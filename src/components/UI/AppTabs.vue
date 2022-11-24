<template>
  <div class="radio">
    <label 
      class="radio__label"
      v-for="item in items"
      :key="item.value"
    >
      <input 
        type="radio"
        :name="name"
        :value="item.value"
        :checked="item.value===modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
      >
      <div class="radio__title" :class="item.color">
        {{ item.title }}
        <span v-if="item.subTitle">{{ item.subTitle }}</span>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    items: Array,
    name: String
  },
  data: () => ({
    model: ''
  }),
  mounted() {
    this.model = this.modelValue
  }
}
</script>

<style lang="scss" scoped>
  .radio {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .radio__label {
    & > input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
    & > input:checked + .radio__title {
      color: #ffffff;

      & > span {
        color: #ffffff;
      }
    }
    & > input:checked + .radio__title.blue {
      background: var(--blue-color);
      border-color: var(--blue-color);
    }
    & > input:checked + .radio__title.red {
      background: var(--red-color);
      border-color: var(--red-color);
    }
    & > input:checked + .radio__title.green {
      background: var(--green-color);
      border-color: var(--green-color);
    }
    & > input:not(:checked) + .radio__title.blue:hover {
      background: #ffffff;
      color: var(--blue-color);
      border-color: var(--blue-color);

      & > span {
        color: var(--blue-color);
      }
    }
    & > input:not(:checked) + .radio__title.red:hover {
      background: #ffffff;
      color: var(--red-color);
      border-color: var(--red-color);

      & > span {
        color: var(--red-color);
      }
    }
    & > input:not(:checked) + .radio__title.green:hover {
      background: #ffffff;
      color: var(--green-color);
      border-color: var(--green-color);

      & > span {
        color: var(--green-color);
      }
    }
  }
  .radio__title {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    line-height: 16px;
    color: #6B7280;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 80px;
    padding: 8px 16px;
    user-select: none;

    & > span {
      font-size: 10px;
      line-height: 16px;
      color: #9CA3AF;
      opacity: 0.8;
    }
  }
</style>