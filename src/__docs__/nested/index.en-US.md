---
map:
  path: /demo/nested
---

# nesting

We can use recursive components to achieve nested effects

::: tip
This chapter uses the custom two-way binding method. If you don’t know much about it, please refer to the information on custom two-way binding first. `vue2` and `vue3` are different.
:::

## Component Usage
<demo src="./demo.vue"
title="Use Components"
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

## Hooks Usage
<demo src="./hooks.vue"
title=""
desc="Pass hooks option implementation">
</demo>

### NestedHooks.vue

```vue
<template>
  <ul class="drag-area" ref="el">
    <li v-for="el in modelValue" :key="el.name">
      <p>{{ el.name }}</p>
      <nested-hooks v-model="el.children" />
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

## Directive Usage
<demo src="./directive.vue"
title="Usage Directive"
desc="Pass command parameter implementation">
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
