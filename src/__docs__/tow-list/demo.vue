<template>
  <div class="flex">
    <VueDraggable
      v-model="list"
      animation="150"
      ghostClass="ghost"
      group="people"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </VueDraggable>
    <VueDraggable
      v-model="list2"
      animation="150"
      group="people"
      ghostClass="ghost"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
    >
      <div
        v-for="item in list2"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </VueDraggable>
  </div>
  <div class="flex justify-between">
    <pre class="code-block">{{ JSON.stringify(list, null, 2) }}</pre>
    <pre class="code-block">{{ JSON.stringify(list2, null, 2) }}</pre>
  </div>
</template>

<script setup>
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
const list2 = ref(
  list.value.map(item => ({
    name: `${item.name}-2`,
    id: `${item.id}-2`
  }))
)
</script>
