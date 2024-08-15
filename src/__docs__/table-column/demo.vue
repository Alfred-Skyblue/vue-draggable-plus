<template>
  <VueDraggable v-model="headers" target=".sort-target">
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr class="sort-target">
          <th class="cursor-move" v-for="header in headers" :key="header.value">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.name">
          <td v-for="header in headers" :key="header.value">
            {{ item[header.value] }}
          </td>
        </tr>
      </tbody>
    </table>
  </VueDraggable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

type Item = {
  name: string
  id: number
}

type Header = {
  text: string
  value: keyof Item
}

const headers = ref<Header[]>([
  {
    text: 'Id',
    value: 'id'
  },
  {
    text: 'Name',
    value: 'name'
  }
])
const list = ref<Item[]>([
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
