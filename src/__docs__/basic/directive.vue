<template>
  <div class="flex">
    <ul
      v-draggable="[
        list,
        {
          animation: 150,
          ghostClass: 'ghost',
          onUpdate,
          onStart
        }
      ]"
      class="target-directive flex flex-col gap-2 p-4 w-300px h-350px m-auto bg-gray-500/5 rounded"
    >
      <li
        v-for="item in list"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3 cursor-move"
				:class="item.class"
      >
        {{ item.name }}
      </li>
    </ul>
    <preview-list :list="list" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vDraggable } from 'vue-draggable-plus'
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

function onStart() {
  console.log('start')
}

function onUpdate() {
  console.log('update')
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
