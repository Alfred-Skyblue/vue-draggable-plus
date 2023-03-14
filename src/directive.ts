import type { ObjectDirective } from 'vue-demi'
import type { Ref } from 'vue-demi'
import type { RefOrValue } from './types'
import { useDraggable, UseDraggableOptions } from './hooks'
import { isProxy, isVue3 } from 'vue-demi'

const directiveHooks = {
  mounted: (isVue3 ? 'mounted' : 'inserted') as 'mounted',
  unmounted: (isVue3 ? 'unmounted' : 'unbind') as 'unmounted'
}

type VDraggableBinding = [
  list: Ref<any[]>,
  options?: RefOrValue<UseDraggableOptions<any>>
]

const destroyMap: WeakMap<HTMLElement, () => void> = new WeakMap()

export const vDraggable: ObjectDirective<
  HTMLElement,
  VDraggableBinding | Ref<any[]>
> = {
  [directiveHooks.mounted](el, binding) {
    const params = isProxy(binding.value) ? [binding.value] : binding.value

    const state = useDraggable(el!, ...(params as VDraggableBinding))
    destroyMap.set(el, state.destroy)
  },
  [directiveHooks.unmounted](el) {
    destroyMap.get(el)?.()
    destroyMap.delete(el)
  }
}
