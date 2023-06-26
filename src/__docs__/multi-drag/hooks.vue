<template>
  <div class="flex">
    <div
      class="flex flex-col gap-2 p-4 w-300px h-500px m-auto bg-gray-500/5 rounded"
      ref="el"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3 cursor-move"
      >
        {{ item.name }}
      </div>
    </div>
    <preview-list :list="list" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
const list = ref([
  {
    name: 'Joao',
    id: 1
  },
  {
    name: 'Jean',
    id: 2
  },
  {
    name: 'Johanna',
    id: 3
  },
  {
    name: 'Juan',
    id: 4
  },
  {
    name: 'Joaquin',
    id: 5
  },
  {
    name: 'Johnny',
    id: 6
  }
])
const el = ref()

useDraggable(el, list, {
  multiDrag: true,
  animation: 150,
  ghostClass: 'ghost',
  onStart() {
    console.log('start')
  },
  onUpdate() {
    console.log('update')
  },
  onSelect() {
    console.log('selected')
  },
  onDeselect() {
    console.log('deselected')
  }
})
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.sortable-selected {
  background: #6c7a81;
}
</style>
