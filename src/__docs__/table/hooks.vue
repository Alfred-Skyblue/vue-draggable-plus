<template>
  <table class="table table-striped">
    <thead class="thead-dark">
      <tr>
        <th>Id</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody ref="el" class="sort-target">
      <tr v-for="item in list" :key="item.name" class="cursor-move">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'

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
const el = ref()

useDraggable(el, list)
</script>
