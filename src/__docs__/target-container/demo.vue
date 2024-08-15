<template>
  <section>
    <div>
      <VueDraggable v-model="list" :animation="150" target=".el-table">
        <ElTable :list="list"></ElTable>
      </VueDraggable>
    </div>
    <div class="flex justify-between">
      <preview-list :list="list" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import ElTable from './ElTable.vue'

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
</script>
