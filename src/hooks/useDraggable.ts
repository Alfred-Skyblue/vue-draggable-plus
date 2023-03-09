import Sortable, { type Options } from 'sortablejs'
import { onMounted, onUnmounted, unref } from 'vue'
import type { Ref } from 'vue'
import { moveArrayElement } from '../utils'

export interface UseSortableReturn {
  /**
   * 启动拖拽
   */
  start: () => void
  /**
   * 销毁拖拽
   */
  stop: () => void
}

export type UseSortableOptions = Options

export function useDraggable<T>(
  selector: string,
  list: Ref<T[]>,
  options?: UseSortableOptions
): UseSortableReturn
export function useDraggable<T>(
  el: Ref<HTMLElement | null | undefined>,
  list: Ref<T[]>,
  options?: UseSortableOptions
): UseSortableReturn

/**
 * A custom hook that returns an object with two methods: `start` and `stop`.
 * @param {Ref<HTMLElement | null | undefined> | string} el
 * @param {Ref<T[]>} list
 * @param {UseSortableOptions} options
 * @returns {UseSortableReturn}
 */
export function useDraggable<T>(
  el: Ref<HTMLElement | null | undefined> | string,
  list: Ref<T[]>,
  options: UseSortableOptions = {}
): UseSortableReturn {
  let sortable: Sortable

  const defaultOptions: Options = {
    onUpdate: e => {
      moveArrayElement(list.value, e.oldIndex!, e.newIndex!)
    }
  }

  const start = () => {
    const target =
      typeof el === 'string' ? document?.querySelector(el) : unref(el)
    if (!target) return
    sortable = new Sortable(target as HTMLElement, {
      ...defaultOptions,
      ...options
    })
  }

  const stop = () => sortable?.destroy()

  onMounted(start)

  onUnmounted(stop)

  return { stop, start }
}
