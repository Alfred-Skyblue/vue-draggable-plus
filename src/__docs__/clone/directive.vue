<template>
  <div class="flex">
    <section
      class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
      v-draggable="[
        list1,
        {
          animation: 150,
          group: { name: 'people', pull: 'clone', put: false },
          sort: false,
          onClone
        }
      ]"
    >
      <div
        v-for="item in list1"
        :key="item.id"
        class="cursor-move h-50px bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </section>
    <section
      class="flex flex-col gap-2 p-4 w-300px m-auto bg-gray-500/5 rounded overflow-auto"
      v-draggable="[list2, { animation: 150, group: 'people' }]"
    >
      <div
        v-for="item in list2"
        :key="item.id"
        class="cursor-move h-50px bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </section>
  </div>
  <div class="flex justify-between">
    <pre class="code-block">{{ stringify(list1) }}</pre>
    <pre class="code-block">{{ stringify(list2) }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { vDraggable } from 'vue-draggable-plus'
const list1 = ref([
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
  list1.value.map(item => ({
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

function onClone() {
  console.log('clone')
}
</script>
