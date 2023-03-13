<template>
  <button @click="sort">还原</button>
  <div class="flex justify-between">
    <VueDraggable
      v-model="list"
      animation="150"
      target=".sort-target"
      class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
      @start="onStart"
      @end="onEnd"
    >
      <TransitionGroup
        type="transition"
        tag="ul"
        :name="!drag ? 'fade' : null"
        class="sort-target"
      >
        <li
          v-for="(item, index) in list"
          :key="item.id"
          class="cursor-move h-50px bg-gray-500/5 rounded flex items-center justify-between px-2"
        >
          {{ item.name }}
        </li>
      </TransitionGroup>
    </VueDraggable>
    <pre class="code-block">{{ text }}</pre>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { computed } from 'vue-demi'
const drag = ref(false)

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

const onStart = () => {
  drag.value = true
}
const onEnd = () => {
  console.log('onEnd')
  nextTick(() => {
    drag.value = false
  })
}
const sort = () => {
  list.value.sort((a, b) => a.id - b.id)
}

const text = computed(() =>
  JSON.stringify(
    list.value.map(item => item.name),
    null,
    2
  )
)
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
