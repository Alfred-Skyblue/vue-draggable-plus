# 说明

由于 `Sortablejs` 的 `vue3` 组件一直没有更新，已经跟 `vue3` 严重脱节，所以诞生了这个项目，这个组件是基于 `Sortablejs` 的，所以如果你想了解更多关于 `Sortablejs` 的信息，可以查看[Sortablejs 官网](https://github.com/SortableJS/Sortable)。

我们对此封装了多种用法，您可以使用组件的方式，也可以使用 `hooks` 的方式，也可以使用指令的方式，总有一款适合您

## 解决痛点

在 `Sortablejs` 官方以往的 `Vue` 组件中，都是通过使用组件作为列表的直接子元素来实现拖拽列表，当我们使用一些组件库时，如果组件库中没有提供列表根元素的插槽，我们很难实现拖拽列表，vue-draggable-plus 完美解决了这个问题，它可以让你在任何元素上使用拖拽列表，我们可以使用指定元素的选择器，来获取到列表根元素，然后将列表根元素作为 `Sortablejs` 的 `container`，详情参考[指定目标容器](/demo/target-container/)。

## 安装

```bash
npm install vue-draggable-plus sortablejs
```

## 使用

### 组件方式

```vue
<template>
    <VueDraggable ref="el" v-model="list">
      <div v-for="item in list" :key="item.id">
        {{ item.name }}
      </div>
    </VueDraggable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
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
</script>
```

### hooks 方式

```vue
<template>
    <div
      ref="el"
    >
      <div
        v-for="item in list"
        :key="item.id"
      >
        {{ item.name }}
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable, type UseDraggableReturn } from 'vue-draggable-plus'

const el = ref()

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
// 返回值是一个对象，包含了一些方法，比如 start、destroy、pause 等
const draggable = useDraggable<UseDraggableReturn>(el, list, {
  animation: 150,
  onStart() {
    console.log('start')
  },
  onUpdate() {
    console.log('update')
  }
})
</script>
```

### 指令方式

```vue
<template>
    <div
      v-draggable="[
        list,
        {
          animation: 150,
        }
      ]"
    >
      <div
        v-for="item in list"
        :key="item.id"
      >
        {{ item.name }}
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vDraggable } from 'vue-draggable-plus'
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

function onStart() {
  console.log('start')
}

function onUpdate() {
  console.log('update')
}
</script>
```
