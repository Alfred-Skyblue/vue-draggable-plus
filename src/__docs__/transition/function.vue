<template>
  <button @click="handleAdd">Add</button>

  <div class="flex justify-between">
    <TransitionGroup
      ref="el"
      type="transition"
      tag="ul"
      name="fade"
      class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
    >
      <li
        v-for="(item, index) in list"
        :key="item.id"
        class="h-50px bg-gray-500/5 rounded flex items-center justify-between px-2"
      >
        <IconSort class="handle cursor-move"></IconSort>
        <input type="text" v-model="item.name" />
        <iconClose class="cursor-pointer" @click="remove(index)"></iconClose>
      </li>
    </TransitionGroup>
    <preview-list :list="list" />
  </div>
</template>

<script setup lang="ts">
import { useDraggable } from 'vue-draggable-plus'
import { ref } from 'vue'

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

const el = ref()

useDraggable(el, list)

function handleAdd() {
  const length = list.value.length + 1
  list.value.push({
    name: `Juan ${length}`,
    id: `${length}`
  })
}

function remove(index: number) {
  list.value.splice(index, 1)
}
</script>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
