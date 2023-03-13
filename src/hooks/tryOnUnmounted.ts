import { getCurrentInstance, onUnmounted } from 'vue'

export function tryOnUnmounted(fn: () => void) {
  if (getCurrentInstance()) onUnmounted(fn)
}
