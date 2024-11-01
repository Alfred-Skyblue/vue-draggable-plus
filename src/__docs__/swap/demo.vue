<template>
  <button @click="start">start</button>
  <button @click="pause">pause</button>
  <div class="flex">
    <VueDraggable
      ref="el"
      v-model="list"
      :animation="150"
      ghostClass="ghost"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded"
      :swap="true"
      swapClass="bg-red"
      @start="onStart"
      @update="onUpdate"
      @end="onEnd"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="cursor-move h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </VueDraggable>
    <preview-list :list="list" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  type DraggableEvent,
  type UseDraggableReturn,
  VueDraggable
} from 'vue-draggable-plus'
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
  }
])

const el = ref<UseDraggableReturn>()

function start() {
  el.value?.start()
}

function pause() {
  el.value?.pause()
}

const onStart = (e: DraggableEvent) => {
  console.log('start', e)
}

const onEnd = (e: DraggableEvent) => {
  console.log('onEnd', e)
}

const onUpdate = () => {
  console.log('update')
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
