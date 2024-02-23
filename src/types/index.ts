import type { Ref } from 'vue'
export { type Options, type SortableEvent } from 'sortablejs'

export type RefOrValue<T> = T | Ref<T>
export type RefOrElement<T = HTMLElement> =
  | T
  | Ref<T | undefined | null>
  | string
export type Fn = (...args: any[]) => any
