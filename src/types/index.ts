import type { Ref, ShallowRef, WritableComputedRef } from 'vue'
export { type Options, type SortableEvent } from 'sortablejs'

/**
 * @deprecated Use MaybeRef<T> instead
 */
export type RefOrValue<T> = T | Ref<T>

/**
 * copied from vueuse: https://github.com/vueuse/vueuse/blob/main/packages/shared/tryOnUnmounted/index.ts
 * Maybe it's a ref, or a plain value.
 */
export type MaybeRef<T = any> =
  | T
  | Ref<T>
  | ShallowRef<T>
  | WritableComputedRef<T>

export type RefOrElement<T = HTMLElement> =
  | T
  | Ref<T | undefined | null>
  | string
export type Fn = (...args: any[]) => any
