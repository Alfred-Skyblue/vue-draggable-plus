---
map:
 path: /demo/target-container
---

# Specify the target container

Since many components that need to be dragged are not our immediate child elements in our usual use, we need to specify a target container to complete the drag function. We can specify the target container through the `target` attribute.

Here we take the third-party component as an example, assuming `el-table` is a third-party component

::: warning
Note: As long as you can ensure that the target element obtained is correct, our function can be completed. If you find that the target element is not found during use, please check whether the selector you entered is correct.
:::

ElTable.vue

```vue
<template>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody class="el-table">
      <tr v-for="item in list" :key="item.name" class="cursor-move">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
interface Props {
  list: Record<'name' | 'id', string>[]
}
defineProps<Props>()
</script>
```

## Component Usage

<demo src="./demo.vue"
title="Use components to manipulate target containers"
desc="It will use Vue Draggable as the root element to find the nearest .el-table selector">
</demo>

## Hooks Usage

<demo src="./hooks.vue"
title="Use hooks to manipulate target containers"
desc="Here, in order to ensure that we can get our target container, we added an id my-container to the div element. Of course, if you can ensure that the target container must be obtained, you can omit the parent element id">
</demo>

### Precautions

When using `hooks`, please ensure that there is only one root element in the component

#### Error Usage

This usage is wrong because it contains multiple root elements

```vue
<template>
  <!-- ❌ -->
  <div id="my-container">
    <ElTable :list="list"></ElTable>
  </div>
  <div class="flex justify-between">
    <pre class="code-block">{{ text }}</pre>
  </div>
</template>
```

#### Correctly Usage

This way is correct as it has only one root element

```vue
<template>
  <!-- ✅ -->
  <div>
    <div id="my-container">
      <ElTable :list="list"></ElTable>
    </div>
    <div class="flex justify-between">
      <pre class="code-block">{{ text }}</pre>
    </div>
  </div>
</template>
```
