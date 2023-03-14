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
