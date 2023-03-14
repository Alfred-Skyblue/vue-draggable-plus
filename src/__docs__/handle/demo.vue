<template>
  <button @click="handleAdd">Add</button>

  <div class="flex justify-between">
    <VueDraggable
      v-model="list"
      animation="150"
      handle=".handle"
      class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
    >
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="h-50px bg-gray-500/5 rounded flex items-center justify-between px-4"
      >
        <IconSort class="handle cursor-move"></IconSort>
        <input type="text" v-model="item.name" />
        <iconClose class="cursor-pointer" @click="remove(index)"></iconClose>
      </div>
    </VueDraggable>
    <preview-list :list="list" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

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

function handleAdd() {
  const length = list.value.length + 1
  list.value.push({
    name: `Juan ${length}`,
    id: `${length}`
  })
}

function remove(index: number) {
  list.value.splice(index, 1)
}
</script>
