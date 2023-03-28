<template>
  <div>
    <div id="my-container">
      <ElTable :list="list"></ElTable>
    </div>
    <div class="flex justify-between">
      <preview-list :list="list" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import ElTable from './ElTable.vue'

const vm = getCurrentInstance()
onMounted(() => {
  console.log(vm)
})
const list = ref([
  {
    name: 'Joao',
    id: '1'
  },
  {
    name: 'Jean',
    id: '2'
  },
  {
    name: 'Johanna',
    id: '3'
  },
  {
    name: 'Juan',
    id: '4'
  }
])

useDraggable('#my-container .el-table', list)
</script>
