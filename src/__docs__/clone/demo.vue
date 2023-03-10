<template>
  <div class="flex">
    <VueDraggablePlus
      v-model="list"
      animation="150"
      :group="{ name: 'people', pull: 'clone', put: false }"
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
      class="flex flex-col gap-2 p-4 w-300px m-auto bg-gray-500/5 rounded overflow-auto"
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

<script lang="ts" setup>
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
function stringify(obj: Record<string, any>[]) {
  return JSON.stringify(
    obj.map(item => item.name),
    null,
    2
  )
}
</script>
