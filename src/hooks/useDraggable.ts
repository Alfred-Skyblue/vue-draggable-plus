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
type SortableMethod = 'sort' | 'closest' | 'save' | 'toArray' | 'destroy'

export interface UseSortableReturn extends Pick<Sortable, SortableMethod> {
  /**
   * A function that starts the sortable
   */
  start: () => void
}

export interface UseDraggableOptions<T> extends Options {
  clone?: (element: T) => T
  root?: RefOrValue<HTMLElement | null | undefined>
}

/**
 * A custom hook that allows you to drag and drop elements in a list.
 * @param {string} selector - The selector of the element to be dragged
 * @param {Ref<T[]>} list - The list to be dragged
 * @param {RefOrValue<UseDraggableOptions<T>>} options - The options of the sortable
 * @returns {UseSortableReturn} - The return of the sortable
 */
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
 * A custom hook that allows you to drag and drop elements in a list.
 * @param {Ref<HTMLElement | null | undefined> | string} el
 * @param {Ref<T[]>} list
 * @param {RefOrValue<UseDraggableOptions<T>>} options
 * @returns {UseSortableReturn}
 */
export function useDraggable<T>(
  el: Ref<HTMLElement | null | undefined> | string,
  list: Ref<T[]>,
  options: RefOrValue<UseDraggableOptions<T>> = {}
): UseSortableReturn {
  let instance: Sortable
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
    instance = new Sortable(target as HTMLElement, {
      ...defaultOptions,
      ...restOptions
    })
  }

  const methods: Pick<Sortable, SortableMethod> = {
    destroy: () => instance?.destroy(),
    toArray: () => instance?.toArray(),
    save: () => instance?.save(),
    sort: (...args) => instance?.sort(...args),
    closest: (...args) => instance?.closest(...args)
  }

  onMounted(start)

  onUnmounted(methods.destroy)

  return { start, ...methods }
}
