<template>
  <pre class="code-block">{{ JSON.stringify(list, null, 2) }}</pre>
</template>

<script lang="ts" setup>
interface Props {
  list: any[]
}
defineProps<Props>()
</script>
