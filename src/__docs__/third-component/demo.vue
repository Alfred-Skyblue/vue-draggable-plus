<template>
  <VueDraggable v-model="data" target=".sort-target">
    <n-data-table
      theme="dark"
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="data"
    />
  </VueDraggable>
  <pre class="code-block">{{ stringify(data) }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { NDataTable } from 'naive-ui'

const data = ref([
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
])

const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
]

function stringify(obj: Record<'name' | 'age' | 'address', string>[]) {
  return JSON.stringify(
    obj.map(item => item.name),
    null,
    2
  )
}
</script>
