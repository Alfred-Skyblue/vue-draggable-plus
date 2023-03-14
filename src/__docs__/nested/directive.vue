<template>
  <div class="flex justify-between">
    <NestedDirective v-model="list" class="w-full"></NestedDirective>
    <preview-list :list="list" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NestedDirective from './NestedDirective.vue'

const list = ref([
  {
    name: 'item 1',
    children: [
      {
        name: 'item 2',
        children: []
      }
    ]
  },
  {
    name: 'item 3',
    children: [
      {
        name: 'item 4',
        children: []
      }
    ]
  },
  {
    name: 'item 5',
    children: []
  }
])
</script>
