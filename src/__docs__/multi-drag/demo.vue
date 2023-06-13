<template>
  <div class="flex">
    <!-- TODO: add a default value to multiDrag prop -->
    <VueDraggable
      ref="el"
      v-model="list"
      :multiDrag="true"
      animation="150"
      ghostClass="ghost"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="cursor-move h-30 bg-gray-500/5 rounded p-3 cursor-move"
      >
        {{ item.name }}
      </div>
    </VueDraggable>
    <preview-list :list="list" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type UseDraggableReturn, VueDraggable } from 'vue-draggable-plus'
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
