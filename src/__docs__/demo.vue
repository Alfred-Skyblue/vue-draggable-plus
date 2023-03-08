<script setup>
import { ref } from 'vue';
import MyButton from 'vue-draggable-plus';

const count = ref(0);
function onClick() {
  count.value++;
}
</script>

<template>
  <div>
    <p>
      <span class="">点击次数:</span>
      <span>{{ count }}</span>
    </p>
    <MyButton @click="onClick">count++</MyButton>
  </div>
</template>

<style>
.text {
  font-size: 14px;
}
</style>
