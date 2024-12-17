<template>
  <div class="flex">
    <section
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
      ref="el1"
    >
      <div
        v-for="item in list1"
        :key="item.id"
        class="cursor-move h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </section>
    <section
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
      ref="el2"
    >
      <div
        v-for="item in list2"
        :key="item.id"
        class="cursor-move h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.name }}
      </div>
    </section>
  </div>
  <div class="flex justify-between">
    <preview-list :list="list1" />
    <preview-list :list="list2" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
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

const el1 = ref()
const el2 = ref()

useDraggable(el1, list1, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'people',
  onUpdate: () => {
    console.log('update list1')
  },
  onAdd: () => {
    console.log('add list1')
  },
  remove: () => {
    console.log('remove list1')
  }
})

useDraggable(el2, list2, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'people',
  onUpdate: () => {
    console.log('update list2')
  },
  onAdd: () => {
    console.log('add list2')
  },
  remove: () => {
    console.log('remove list2')
  }
})
</script>
