import type { ObjectDirective, Ref } from 'vue-demi'
import type { MaybeRef } from './types'
import { useDraggable, UseDraggableOptions } from './useDraggable'
import { isProxy, isVue3 } from 'vue-demi'

const directiveHooks = {
  mounted: (isVue3 ? 'mounted' : 'inserted') as 'mounted',
  unmounted: (isVue3 ? 'unmounted' : 'unbind') as 'unmounted'
}

type VDraggableBinding = [
  list: MaybeRef<any[]>,
  options?: MaybeRef<UseDraggableOptions<any>>
]

const elementMap: WeakMap<HTMLElement, () => void> = new WeakMap()

export const vDraggable: ObjectDirective<
  HTMLElement,
  VDraggableBinding | MaybeRef<any[]>
> = {
  [directiveHooks.mounted](el, binding) {
    const params = isProxy(binding.value) ? [binding.value] : binding.value

    const [list, options] = params as VDraggableBinding

    const state = useDraggable(el!, list as Ref, options)
    elementMap.set(el, state.destroy)
  },
  [directiveHooks.unmounted](el) {
    elementMap.get(el)?.()
    elementMap.delete(el)
  }
}
