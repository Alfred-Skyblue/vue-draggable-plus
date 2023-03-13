<template>
  <div class="flex">
    <section
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
      ref="el1"
      v-model="list1"
      animation="150"
      ghostClass="ghost"
      group="people"
      @update="onUpdate"
      @add="onAdd"
      @remove="remove"
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
      v-model="list2"
      animation="150"
      group="people"
      ghostClass="ghost"
      @update="onUpdate"
      @add="onAdd"
      @remove="remove"
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
    <pre class="code-block">{{ JSON.stringify(list1, null, 2) }}</pre>
    <pre class="code-block">{{ JSON.stringify(list2, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import type { Ref } from 'vue-demi'
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
const el1: Ref<HTMLElement | null> = ref(null)
const el2: Ref<HTMLElement | null> = ref(null)

useDraggable(el1, list1, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'people'
})

useDraggable(el2, list2, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'people'
})
function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
}
function remove() {
  console.log('remove')
}
</script>
