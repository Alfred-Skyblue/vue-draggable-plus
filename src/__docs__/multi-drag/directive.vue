<template>
  <div class="flex">
    <ul
      v-draggable="[
        list,
        {
          multiDrag: true,
          animation: 150,
          ghostClass: 'ghost',
          onUpdate,
          onStart,
          onSelect,
          onDeselect
        }
      ]"
      class="target-directive flex flex-col gap-2 p-4 w-300px h-500px m-auto bg-gray-500/5 rounded"
    >
      <li
        v-for="item in list"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3 cursor-move"
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
    name: 'Joaquin',
    id: 5
  },
  {
    name: 'Johnny',
    id: 6
  }
])

const onStart = () => {
  console.log('start')
}

const onUpdate = () => {
  console.log('update')
}

const onSelect = () => {
  console.log('selected')
}

const onDeselect = () => {
  console.log('deselected')
} 
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
