<template>
  <VueDraggable class="drag-area" tag="ul" v-model="list" group="g1">
    <li v-for="el in modelValue" :key="el.name">
      <p>{{ el.name }}</p>
      <nested-component v-model="el.children" />
    </li>
  </VueDraggable>
</template>
<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { computed } from 'vue'

interface IList {
  name: string
  children: IList[]
}

interface Props {
  modelValue: IList[]
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: IList[]): void
}

const emits = defineEmits<Emits>()
const list = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
</script>
<style scoped>
.drag-area {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
