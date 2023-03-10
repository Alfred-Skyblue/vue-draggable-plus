<template>
  <button @click="handleAdd">Add</button>

  <div class="flex justify-between">
    <VueDraggablePlus
      v-model="list"
      class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
      selector=".sort-target"
      @update="onUpdate"
    >
      <TransitionGroup
        type="transition"
        tag="ul"
        name="fade"
        class="sort-target"
      >
        <li
          v-for="(item, index) in list"
          :key="item.id"
          class="h-50px bg-gray-500/5 rounded flex items-center justify-between px-4"
        >
          <IconSort class="handle cursor-move"></IconSort>
          <input type="text" v-model="item.name" />
          <iconClose class="cursor-pointer" @click="remove(index)"></iconClose>
        </li>
      </TransitionGroup>
    </VueDraggablePlus>
    <pre class="code-block">{{ stringify(list) }}</pre>
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

function stringify(obj: Record<'name' | 'id', string>[]) {
  return JSON.stringify(
    obj.map(item => item.name),
    null,
    2
  )
}

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

const onUpdate = () => {
  console.log('afterUpdate')
}
</script>

<style>
/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
