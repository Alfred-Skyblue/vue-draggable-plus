import Sortable, { type Options, SortableEvent } from 'sortablejs'
import { onMounted, onUnmounted, unref } from 'vue'
import type { Ref } from 'vue'
import type { RefOrValue } from '@/types'
import {
  getElementBySelector,
  insertElement,
  insertNodeAt,
  isString,
  isUndefined,
  moveArrayElement,
  removeElement,
  removeNode
} from '../utils'

function defaultClone<T>(element: T): T {
  return element
}

const CLONE_ELEMENT_KEY = '__clone__draggable__element__node__'

interface DraggableEvent extends SortableEvent {
  item: HTMLElement & { [CLONE_ELEMENT_KEY]: any }
}
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

export interface UseDraggableOptions<T> extends Options {
  clone?: (element: T) => T
  root?: RefOrValue<HTMLElement | null | undefined>
}

export function useDraggable<T>(
  selector: string,
  list: Ref<T[]>,
  options?: RefOrValue<UseDraggableOptions<T>>
): UseSortableReturn
export function useDraggable<T>(
  el: Ref<HTMLElement | null | undefined>,
  list: Ref<T[]>,
  options?: RefOrValue<UseDraggableOptions<T>>
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
  options: RefOrValue<UseDraggableOptions<T>> = {}
): UseSortableReturn {
  let sortable: Sortable
  const { clone = defaultClone, ...restOptions } = unref(options)

  /**
   * Element dragging started
   * @param {DraggableEvent} evt - DraggableEvent
   */
  function onStart(evt: DraggableEvent) {
    evt.item[CLONE_ELEMENT_KEY] = clone(unref(list.value[evt.oldIndex!]))
  }

  /**
   * Element is dropped into the list from another list
   * @param {DraggableEvent} evt
   */
  function onAdd(evt: DraggableEvent) {
    console.log('list', list.value)
    const element = (evt.item as Record<string, any>)[CLONE_ELEMENT_KEY]
    if (isUndefined(element)) return
    removeNode(evt.item)
    insertElement(list.value, evt.newIndex!, element)
  }

  /**
   * Element is removed from the list into another list
   * @param {DraggableEvent} evt
   */
  function onRemove(evt: DraggableEvent) {
    const { from, item, oldIndex, pullMode, clone } = evt
    insertNodeAt(from, item, oldIndex!)
    if (pullMode === 'clone') {
      removeNode(clone)
      return
    }
    removeElement(list.value, oldIndex!)
  }

  const defaultOptions: UseDraggableOptions<T> = {
    onUpdate: e => {
      console.log('update')
      moveArrayElement(list.value, e.oldIndex!, e.newIndex!)
    },
    onStart,
    onAdd,
    onRemove
  }

  const start = () => {
    const target = isString(el) ? getElementBySelector(el) : unref(el)
    if (!target) return
    sortable = new Sortable(target as HTMLElement, {
      ...defaultOptions,
      ...restOptions
    })
  }

  const stop = () => sortable?.destroy()

  onMounted(start)

  onUnmounted(stop)

  return { stop, start }
}
