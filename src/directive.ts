import type { ObjectDirective, Ref } from 'vue-demi'
import type { MaybeRef } from './types'
import { useDraggable, UseDraggableOptions } from './useDraggable'
import { isProxy, isRef, isVue3 } from 'vue-demi'

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
    const value = binding.value
    // Reactive arrays and refs are direct lists; plain arrays may wrap a list.
    const isTuple =
      Array.isArray(value) &&
      !isProxy(value) &&
      value.length > 0 &&
      (value[0] == null || isRef(value[0]) || Array.isArray(value[0]))
    const params = isTuple ? value : [value]

    const [list, options] = params as VDraggableBinding

    const state = useDraggable(el!, list as Ref, options)
    elementMap.set(el, state.destroy)
  },
  [directiveHooks.unmounted](el) {
    elementMap.get(el)?.()
    elementMap.delete(el)
  }
}
