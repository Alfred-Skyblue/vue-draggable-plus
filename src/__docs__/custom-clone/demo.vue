<template>
  <div class="flex">
    <VueDraggablePlus
      v-model="list"
      animation="150"
      ghostClass="ghost"
      :group="{ name: 'people', pull: 'clone', put: false }"
      :clone="clone"
      :sort="false"
      class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="h-50px bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </VueDraggablePlus>
    <VueDraggablePlus
      v-model="list2"
      animation="150"
      group="people"
      ghostClass="ghost"
      class="flex flex-col gap-2 p-4 w-300px max-h-350px m-auto bg-gray-500/5 rounded overflow-auto"
    >
      <div
        v-for="item in list2"
        :key="item.id"
        class="h-50px bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </VueDraggablePlus>
  </div>
  <div class="flex justify-between">
    <pre class="code-block">{{ stringify(list) }}</pre>
    <pre class="code-block">{{ stringify(list2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggablePlus } from 'vue-draggable-plus'

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
function stringify(obj: Record<'name' | 'id', string>[]) {
  return JSON.stringify(
    obj.map(item => item.name),
    null,
    2
  )
}

function clone(element: Record<'name' | 'id', string>) {
  return {
    name: `${element.name}-clone`,
    id: `${element.id}-clone`
  }
}
</script>
