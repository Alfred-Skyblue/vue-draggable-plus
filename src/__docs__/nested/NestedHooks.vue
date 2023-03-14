<template>
  <ul class="drag-area" ref="el">
    <li v-for="el in modelValue" :key="el.name">
      <p>{{ el.name }}</p>
      <nested-hooks v-model="el.children" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useDraggable } from 'vue-draggable-plus'
import { computed, ref } from 'vue'

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

const el = ref()
useDraggable(el, list, {
  group: 'g1'
})
</script>
<style scoped>
.drag-area {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
