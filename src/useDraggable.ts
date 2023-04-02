import Sortable, { type Options, type SortableEvent } from 'sortablejs'
import { getCurrentInstance, onMounted, onUnmounted, unref } from 'vue-demi'
import type { Ref } from 'vue-demi'
import type { Fn, RefOrElement, RefOrValue } from './types'

import { error } from './utils/log'

import {
  getElementBySelector,
  insertElement,
  insertNodeAt,
  isHTMLElement,
  isString,
  isUndefined,
  mergeOptionsEvents,
  moveArrayElement,
  removeElement,
  removeNode
} from './utils'

function defaultClone<T>(element: T): T {
  if (element === undefined || element === null) return element
  return JSON.parse(JSON.stringify(element))
}

function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) onUnmounted(fn)
}

function tryOnMounted(fn: Fn) {
  if (getCurrentInstance()) onMounted(fn)
  else fn()
}

const CLONE_ELEMENT_KEY = '__CLONE__DRAGGABLE__ELEMENT__NODE__'

interface DraggableEvent extends SortableEvent {
  item: HTMLElement & { [CLONE_ELEMENT_KEY]: any }
}
type SortableMethod = 'closest' | 'save' | 'toArray' | 'destroy' | 'option'

export interface UseDraggableReturn extends Pick<Sortable, SortableMethod> {
  /**
   * Start the sortable.
   * @param {HTMLElement} target - The target element to be sorted.
   * @default By default the root element of the VueDraggablePlus instance is used
   */
  start: (target?: HTMLElement) => void
  pause: () => void
  resume: () => void
}

export interface UseDraggableOptions<T> extends Options {
  clone?: (element: T) => T
  immediate?: boolean
}

/**
 * A custom hook that allows you to drag and drop elements in a list.
 * @param el
 * @param {Array} list - The list to be dragged
 * @param {Object} options - The options of the sortable
 * @returns {Object} - The return of the sortable
 */
export function useDraggable<T>(
  el: RefOrElement,
  list?: Ref<T[] | undefined>,
  options?: RefOrValue<UseDraggableOptions<T>>
): UseDraggableReturn
export function useDraggable<T>(
  el: Ref<HTMLElement | null | undefined>,
  options?: RefOrValue<UseDraggableOptions<T>>
): UseDraggableReturn

/**
 * A custom hook that allows you to drag and drop elements in a list.
 * @param {Ref<HTMLElement | null | undefined> | string} el
 * @param {Ref<T[]>} list
 * @param {RefOrValue<UseDraggableOptions<T>>} options
 * @returns {UseSortableReturn}
 */
export function useDraggable<T>(...args: any[]): UseDraggableReturn {
  const vm = getCurrentInstance()?.proxy

  const el = args[0]
  let [, list, options] = args

  if (!Array.isArray(unref(list))) {
    options = list
    list = null
  }

  let instance: Sortable | null = null
  const {
    immediate = true,
    clone = defaultClone,
    ...restOptions
  } = unref(options) ?? {}

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

  function getTarget(target?: HTMLElement) {
    const element = unref(el)
    if (!target) {
      target = isString(element)
        ? getElementBySelector(element, vm?.$el)
        : element
    }
    // @ts-ignore
    if (target && !isHTMLElement(target)) target = target.$el

    if (!target) error('Root element not found')
    return target
  }
  const start = (target?: HTMLElement) => {
    target = getTarget(target)
    if (instance) methods.destroy()
    const opt = mergeOptionsEvents(
      list === null ? {} : presetOptions,
      restOptions
    )

    instance = new Sortable(target as HTMLElement, opt)
  }

  const methods: Pick<Sortable, SortableMethod> = {
    option: (name: keyof Options, value?: any) => instance?.option(name, value),
    destroy: () => {
      instance?.destroy()
      instance = null
    },
    save: () => instance?.save(),
    // @ts-ignore
    toArray: () => instance?.toArray(),
    // @ts-ignore
    closest: (...args) => instance?.closest(...args)
  }

  const pause = () => methods?.option('disabled', true)
  const resume = () => methods?.option('disabled', false)

  tryOnMounted(() => {
    // Add immediate option
    immediate && start()
  })

  tryOnUnmounted(methods.destroy)

  return { start, pause, resume, ...methods }
}
