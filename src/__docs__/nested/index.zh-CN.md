---
map:
  path: /demo/nested
---

# 嵌套

我们可以使用递归组件来实现嵌套的效果。

::: tip
本章使用了自定义双向绑定的方式，如果您对此还不是很了解，请先查阅自定义双向绑定的资料，`vue2` 和 `vue3` 有所不同。
:::

## 组件使用
<demo src="./demo.vue"
title="使用组件方式"
desc="">
</demo>

### NestedComponent.vue

```vue
<template>
  <VueDraggable class="drag-area" tag="ul" v-model="list" group="g1">
    <li v-for="el in modelValue" :key="el.name">
      <p>{{ el.name }}</p>
      <nested-component v-model="el.children" />
    </li>
  </VueDraggable>
</template>
<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { computed } from 'vue'

interface IList {
  name: string
  children: IList[]
}

interface Props {
  modelValue: IList[]
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: IList[]): void
}

const emits = defineEmits<Emits>()
const list = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
</script>
<style scoped>
.drag-area {
  min-height: 50px;
  outline: 1px dashed;
}
</style>

```

## 函数使用
<demo src="./function.vue"
title=""
desc="传递函数选项实现">
</demo>

### NestedFunction.vue

```vue
<template>
  <ul class="drag-area" ref="el">
    <li v-for="el in modelValue" :key="el.name">
      <p>{{ el.name }}</p>
      <nested-function v-model="el.children" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useDraggable } from 'vue-draggable-plus'
import { computed, ref } from 'vue'

interface IList {
  name: string
  children: IList[]
}

interface Props {
  modelValue: IList[]
}

const props = defineProps<Props>()
interface Emits {
  (e: 'update:modelValue', value: IList[]): void
}
const emits = defineEmits<Emits>()
const list = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})

const el = ref()
useDraggable(el, list, {
  group: 'g1'
})
</script>
<style scoped>
.drag-area {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
```

## 指令使用
<demo src="./directive.vue"
title=""
desc="传递指令参数实现">
</demo>

### NestedDirective.vue

```vue
<template>
  <ul v-draggable="[list, { group: 'g1' }]" class="drag-area">
    <li v-for="el in modelValue" :key="el.name">
      <p>{{ el.name }}</p>
      <nested-directive v-model="el.children" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { vDraggable } from 'vue-draggable-plus'
import { computed } from 'vue'

interface IList {
  name: string
  children: IList[]
}

interface Props {
  modelValue: IList[]
}

const props = defineProps<Props>()
interface Emits {
  (e: 'update:modelValue', value: IList[]): void
}
const emits = defineEmits<Emits>()
const list = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
</script>
<style scoped>
.drag-area {
  min-height: 50px;
  outline: 1px dashed;
}
</style>

```
