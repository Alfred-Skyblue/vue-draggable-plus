<template>
  <div class="flex">
    <VueDraggablePlus
      v-model="list"
      animation="150"
      ghostClass="ghost"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </VueDraggablePlus>
    <pre class="code-block">{{ text }}</pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VueDraggablePlus } from 'vue-draggable-plus'
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
const text = computed(() => JSON.stringify(list.value, null, 2))
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
