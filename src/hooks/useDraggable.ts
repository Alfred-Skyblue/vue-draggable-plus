import Sortable, { type Options, SortableEvent } from 'sortablejs'
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  unref
} from 'vue-demi'
import type { Ref } from 'vue-demi'
import type { Fn, RefOrValue } from '../types'

import { error } from '../utils/log'

import {
  getElementBySelector,
  insertElement,
  insertNodeAt,
  isString,
  isUndefined,
  mergeOptionsEvents,
  moveArrayElement,
  removeElement,
  removeNode
} from '../utils'

function defaultClone<T>(element: T): T {
  return JSON.parse(JSON.stringify(element))
}

function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) onUnmounted(fn)
}

function tryOnMounted(fn: Fn, sync = true) {
  if (getCurrentInstance()) onMounted(fn)
  else if (sync) fn()
  else nextTick(fn)
}

const CLONE_ELEMENT_KEY = '__clone__draggable__element__node__'

interface DraggableEvent extends SortableEvent {
  item: HTMLElement & { [CLONE_ELEMENT_KEY]: any }
}
type SortableMethod = 'sort' | 'closest' | 'save' | 'toArray' | 'destroy'

export interface UseSortableReturn extends Pick<Sortable, SortableMethod> {
  /**
   * Start the sortable.
   * @param {HTMLElement} target - The target element to be sorted.
   * @default By default the root element of the VueDraggablePlus instance is used
   */
  start: (target?: HTMLElement) => void
}

export interface UseDraggableOptions<T> extends Options {
  clone?: (element: T) => T
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
  el: HTMLElement,
  list: Ref<T[]>,
  options?: RefOrValue<UseDraggableOptions<T>>
): UseSortableReturn
export function useDraggable<T>(
  el: Ref<HTMLElement | null | undefined>,
  list: Ref<T[]>,
  options?: RefOrValue<UseDraggableOptions<T>>
): UseSortableReturn
export function useDraggable<T>(
  el: Ref<HTMLElement | null | undefined>,
  options?: RefOrValue<UseDraggableOptions<T>>
): UseSortableReturn

/**
 * A custom hook that allows you to drag and drop elements in a list.
 * @param {Ref<HTMLElement | null | undefined> | string} el
 * @param {Ref<T[]>} list
 * @param {RefOrValue<UseDraggableOptions<T>>} options
 * @returns {UseSortableReturn}
 */
export function useDraggable<T>(...args: any[]): UseSortableReturn {
  const vm = getCurrentInstance()?.proxy
  const el = args[0]
  let list: Ref<T[]>
  let options
  if (unref(args[1]) instanceof Array) {
    list = args[1]
    options = args[2]
  } else {
    options = args[1]
  }

  let instance: Sortable
  const { clone = defaultClone, ...restOptions } = unref(options)

  /**
   * Element dragging started
   * @param {DraggableEvent} evt - DraggableEvent
   */
  function onStart(evt: DraggableEvent) {
    evt.item[CLONE_ELEMENT_KEY] = clone(unref(unref(list)?.[evt.oldIndex!]))
  }

  /**
   * Element is dropped into the list from another list
   * @param {DraggableEvent} evt
   */
  function onAdd(evt: DraggableEvent) {
    const element = (evt.item as Record<string, any>)[CLONE_ELEMENT_KEY]
    if (isUndefined(element)) return
    removeNode(evt.item)
    insertElement(unref(list), evt.newIndex!, element)
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
    removeElement(unref(list), oldIndex!)
  }

  /**
   * Changed sorting within list
   * @param {DraggableEvent} evt
   */
  function onUpdate(evt: DraggableEvent) {
    const { from, item, oldIndex, newIndex } = evt
    removeNode(item)
    insertNodeAt(from, item, oldIndex!)
    moveArrayElement(unref(list), oldIndex!, newIndex!)
  }

  /**
   * preset options
   */
  const presetOptions: UseDraggableOptions<T> = {
    onUpdate,
    onStart,
    onAdd,
    onRemove
  }

  const start = (target?: HTMLElement) => {
    if (!target)
      target = (isString(el) ? getElementBySelector(el, vm?.$el) : unref(el))!
    if (!target) error('Root element not found')
    if (instance) instance.destroy()
    const opt = mergeOptionsEvents(presetOptions, restOptions)
    instance = new Sortable(target as HTMLElement, opt)
  }

  const methods: Pick<Sortable, SortableMethod> = {
    destroy: () => instance?.destroy(),
    toArray: () => instance?.toArray(),
    save: () => instance?.save(),
    sort: (...args) => instance?.sort(...args),
    closest: (...args) => instance?.closest(...args)
  }

  tryOnMounted(start)

  tryOnUnmounted(methods.destroy)

  return { start, ...methods }
}
