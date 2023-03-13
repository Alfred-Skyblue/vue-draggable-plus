import { useDraggable, UseDraggableOptions } from './hooks'
import type { RefOrValue } from './types'
import type { Ref } from 'vue'

type VDraggableBinding = [
  list: Ref<any[]>,
  options?: RefOrValue<UseDraggableOptions<any>>
]
export const vDraggable = {
  mounted(el: HTMLElement, binding: Ref<VDraggableBinding>) {
    console.log('-> el', el)
    console.log('-> binding', binding)
    useDraggable(el!, ...binding.value)
  }
}
