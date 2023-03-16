---
map:
  path: /demo/target-container
---

# 指定目标容器

由于我们平时使用的过程中，很多需要拖拽的组件并非我们的直系子元素，所以我们需要指定一个目标容器，来完成拖拽的功能，我们可以通过 `target` 属性来指定目标容器。

此处我们以第三方组件为例，假设`el-table`为第三方组件

::: warning
注意：只要您能确保获取到的目标元素是正确的，都可以完成我们的功能，如果您在使用过程中发现目标元素未找到，请检查您所输入的选择器是否正确
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

## 组件使用

<demo src="./demo.vue"
title="使用组件操作目标容器"
desc="它会以VueDraggable为根元素往下查找最近的.el-table选择器">
</demo>

## hooks 使用

<demo src="./hooks.vue"
title="使用hooks操作目标容器"
desc="此处为了确保能获取到我们的目标容器，我们为 div 元素增加了一个id my-container，当然如果您可以确保获取到的一定是目标容器，可以省略父元素 id">
</demo>

### 注意事项

使用 `hooks` 时请保证组件内只有一个根元素

#### 错误使用

这种用法是错误的，因为它包含多个根元素

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

#### 正确使用

这种方式是正确的，因为它只有一个根元素

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
