<template>
  <button @click="start()">start</button>
  <div class="flex">
    <div
      class="flex flex-col gap-2 p-4 w-300px h-350px m-auto bg-gray-500/5 rounded"
      ref="el"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3 cursor-move"
				:class="item.class"
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
    name: 'subDisable',
    id: 5,
    class: 'dr-sub-disable'
  }
])
const el = ref()

const { start } = useDraggable(el, list, {
  animation: 150,
  ghostClass: 'ghost',
  onStart() {
    console.log('start')
  },
  onUpdate() {
    console.log('update')
  }
})
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
