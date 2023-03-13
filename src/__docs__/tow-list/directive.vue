<template>
  <div class="flex">
    <section
      v-draggable="[
        list1,
        {
          animation: 150,
          ghostClass: 'ghost',
          group: 'people',
          onUpdate,
          onAdd,
          onRemove
        }
      ]"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
    >
      <div
        v-for="item in list1"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </section>
    <section
      v-draggable="[
        list2,
        {
          animation: 150,
          ghostClass: 'ghost',
          group: 'people',
          onUpdate,
          onAdd,
          onRemove
        }
      ]"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
    >
      <div
        v-for="item in list2"
        :key="item.id"
        class="h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </section>
  </div>
  <div class="flex justify-between">
    <pre class="code-block">{{ JSON.stringify(list1, null, 2) }}</pre>
    <pre class="code-block">{{ JSON.stringify(list2, null, 2) }}</pre>
  </div>
</template>

<script setup>
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
function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
}
function onRemove() {
  console.log('remove')
}
</script>
