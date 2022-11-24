<template>
  <div 
    class="input-block"
    :class="{'focused': focused}"
    :style="{'height': `${height}px`}"
  >
    <div 
      class="input-block__icon"
      :class="{'icon-active': focused}"  
      v-if="search"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
          <circle cx="11" cy="11" r="7" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 16L20 20" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    </div>
    <input 
      :type="type" 
      class="input"
      :placeholder="placeholder"
      @focus="focused=true"
      @blur="focused=false"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: ''
    },
    search: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '40'
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data: () => ({
    focused: false
  })
}
</script>

<style lang="scss" scoped>
  .input-block {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1px solid #E5E7EB;
    border-radius: 4px;
    padding: 0 12px;
    background: #ffffff;

    &.focused {
      box-shadow: 0px 12px 32px 4px rgba(17, 17, 17, 0.08);
      border-color: var(--blue-color);

      & g {
        opacity: 1;
      }

      & path, & circle {
        stroke: var(--blue-color);
      };
    }
  }
  .input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    &::placeholder {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: var(--text2-color);
    }
  }
  .input-block__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>