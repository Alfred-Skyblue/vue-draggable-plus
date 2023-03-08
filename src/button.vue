<script lang="ts" setup>
const props = withDefaults(defineProps<{
  /**
   * 按钮文本
   */
  text?: string
}>(), {
  text: 'This a button component!'
})
</script>

<template>
  <button>
    <slot>{{props.text}}</slot>
  </button>
</template>

