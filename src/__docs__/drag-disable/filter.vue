<template>
  <div class="flex">
    <VueDraggable
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
      v-model="list1"
      animation="150"
      ghostClass="ghost"
      group="people"
      :filter="filter"
    >
      <div
        v-for="item in list1"
        :key="item.id"
        class="cursor-move h-30 bg-gray-500/5 rounded p-3"
        :class="item.class"
      >
        {{ item.name }}
      </div>
    </VueDraggable>
    <VueDraggable
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
      v-model="list2"
      animation="150"
      ghostClass="ghost"
      group="people"
    >
      <div
        v-for="item in list2"
        :key="item.id"
        class="cursor-move h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </VueDraggable>
  </div>
  <div class="flex justify-between">
    <preview-list :list="list1" />
    <preview-list :list="list2" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
const list1 = ref([
  {
    name: 'Joao(Drag disable)',
    id: '1',
    class: 'drag-disable'
  },
  {
    name: 'Jean',
    id: '2',
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
const list2 = ref([
  {
    name: 'Joao-2',
    id: '2-1'
  },
  {
    name: 'Jean-2',
    id: '2-2'
  },
  {
    name: 'Johanna-2',
    id: '2-3'
  },
  {
    name: 'Juan-2',
    id: '2-4'
  }
])

const filter = '.drag-disable'

</script>
