import type { Ref } from 'vue'
import type { SortableEvent, MoveEvent } from 'sortablejs'
export { type Options, type SortableEvent, type MoveEvent } from 'sortablejs'

export interface SortableDataEvent extends SortableEvent {
  itemData?: any
}

export interface MoveDataEvent extends MoveEvent {
  draggedData?: any
}

export type RefOrValue<T> = T | Ref<T>
export type RefOrElement<T = HTMLElement> =
  | T
  | Ref<T | undefined | null>
  | string
export type Fn = (...args: any[]) => any
