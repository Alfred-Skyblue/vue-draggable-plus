import Sortable, { type Options, type SortableEvent } from 'sortablejs'
import {
  getCurrentInstance,
  isRef,
  onMounted,
  onUnmounted,
  unref,
  nextTick,
  watch,
  type Ref
} from 'vue-demi'
import type { Fn, RefOrElement, MaybeRef } from './types'

import { error } from './utils/log'

import {
  extend,
  forEachObject,
  getElementBySelector,
  insertElement,
  insertNodeAt,
  isHTMLElement,
  isOn,
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

/**
 * copied from vueuse: https://github.com/vueuse/vueuse/blob/main/packages/shared/tryOnUnmounted/index.ts
 * Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
 * @param fn
 */
function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) onUnmounted(fn)
}

/**
 * copied from vueuse:https://github.com/vueuse/vueuse/blob/main/packages/shared/tryOnMounted/index.ts
 * Call onMounted() if it's inside a component lifecycle, if not, just call the function
 * @param fn
 */
function tryOnMounted(fn: Fn) {
  if (getCurrentInstance()) onMounted(fn)
  else nextTick(fn)
}

let data: any = null
let clonedData: any = null

function setCurrentData(
  _data: typeof data = null,
  _clonedData: typeof data = null
) {
  data = _data
  clonedData = _clonedData
}

function getCurrentData() {
  return {
    data,
    clonedData
  }
}

const CLONE_ELEMENT_KEY = Symbol('cloneElement')

export interface DraggableEvent<T = any> extends SortableEvent {
  item: HTMLElement & { [CLONE_ELEMENT_KEY]: any }
  data: T
  clonedData: T
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
  customUpdate?: (event: SortableEvent) => void
}

/**
 * A custom compositionApi utils that allows you to drag and drop elements in lists.
 * @param el
 * @param {Array} list - The list to be dragged
 * @param {Object} options - The options of the sortable
 * @returns {Object} - The return of the sortable
 */
export function useDraggable<T>(
  el: RefOrElement,
  list?: Ref<T[] | undefined>,
  options?: MaybeRef<UseDraggableOptions<T>>
): UseDraggableReturn
export function useDraggable<T>(
  el: null | undefined,
  list?: Ref<T[] | undefined>,
  options?: MaybeRef<UseDraggableOptions<T>>
): UseDraggableReturn
export function useDraggable<T>(
  el: RefOrElement<HTMLElement | null | undefined>,
  options?: MaybeRef<UseDraggableOptions<T>>
): UseDraggableReturn

/**
 * A custom compositionApi utils that allows you to drag and drop elements in lists.
 * @param {Ref<HTMLElement | null | undefined> | string} el
 * @param {Ref<T[]>} list
 * @param {MaybeRef<UseDraggableOptions<T>>} options
 * @returns {UseSortableReturn}
 */
export function useDraggable<T>(...args: any[]): UseDraggableReturn {
  const vm = getCurrentInstance()?.proxy
  let currentNodes: Node[] | null = null
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
    customUpdate
  } = unref(options) ?? {}

  /**
   * Element dragging started
   * @param {DraggableEvent} evt - DraggableEvent
   */
  function onStart(evt: DraggableEvent) {
    const { from, oldIndex, item } = evt
    currentNodes = Array.from(from.childNodes)
    const data = unref(unref(list)?.[oldIndex!])
    const clonedData = clone(data)
    setCurrentData(data, clonedData)
    item[CLONE_ELEMENT_KEY] = clonedData
  }

  /**
   * Element is dropped into the list from another list
   * @param {DraggableEvent} evt
   */
  function onAdd(evt: DraggableEvent) {
    const element = evt.item[CLONE_ELEMENT_KEY]
    if (isUndefined(element)) return
    removeNode(evt.item)
    if (isRef<any[]>(list)) {
      const newList = [...unref(list)]
      list.value = insertElement(newList, evt.newDraggableIndex!, element)
      return
    }
    insertElement(unref(list), evt.newDraggableIndex!, element)
  }

  /**
   * Element is removed from the list into another list
   * @param {DraggableEvent} evt
   */
  function onRemove(evt: DraggableEvent) {
    const { from, item, oldIndex, oldDraggableIndex, pullMode, clone } = evt
    insertNodeAt(from, item, oldIndex!)
    if (pullMode === 'clone') {
      removeNode(clone)
      return
    }
    if (isRef<any[]>(list)) {
      const newList = [...unref(list)]
      list.value = removeElement(newList, oldDraggableIndex!)
      return
    }
    removeElement(unref(list), oldDraggableIndex!)
  }

  /**
   * Changed sorting within list
   * @param {DraggableEvent} evt
   */
  function onUpdate(evt: DraggableEvent) {
    if (customUpdate) {
      customUpdate(evt)
      return
    }
    const { from, item, oldIndex, oldDraggableIndex, newDraggableIndex } = evt
    removeNode(item)
    insertNodeAt(from, item, oldIndex!)
    if (isRef<any[]>(list)) {
      const newList = [...unref(list)]
      list.value = moveArrayElement(
        newList,
        oldDraggableIndex!,
        newDraggableIndex!
      )
      return
    }
    moveArrayElement(unref(list), oldDraggableIndex!, newDraggableIndex!)
  }

  function onEnd(e: DraggableEvent) {
    const { newIndex, oldIndex, from, to } = e
    let error: Error | null = null
    const isSameIndex = newIndex === oldIndex && from === to
    try {
      //region #202
      if (isSameIndex) {
        let oldNode: Node | null = null
        currentNodes?.some((node, index) => {
          if (oldNode && currentNodes?.length !== to.childNodes.length) {
            from.insertBefore(oldNode, node.nextSibling)
            return true
          }
          const _node = to.childNodes[index]
          oldNode = to?.replaceChild(node, _node)
        })
      }
      //endregion
    } catch (e) {
      error = e
    } finally {
      currentNodes = null
    }
    nextTick(() => {
      setCurrentData()
      if (error) throw error
    })
  }

  /**
   * preset options
   */
  const presetOptions: UseDraggableOptions<T> = {
    onUpdate,
    onStart,
    onAdd,
    onRemove,
    onEnd,
    emptyInsertThreshold: 0
  }

  function getTarget(target?: HTMLElement) {
    const element = unref(el) as any
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

  function mergeOptions() {
    // eslint-disable-next-line
    const { immediate, clone, ...restOptions } = unref(options) ?? {}

    forEachObject(restOptions, (key, fn) => {
      if (!isOn(key)) return
      restOptions[key] = (evt: DraggableEvent, ...args: any[]) => {
        const data = getCurrentData()
        extend(evt, data)
        return fn(evt, ...args)
      }
    })

    return mergeOptionsEvents(
      list === null ? {} : presetOptions,
      restOptions
    ) as Options
  }

  const start = (target?: HTMLElement) => {
    target = getTarget(target)
    if (instance) methods.destroy()

    instance = new Sortable(target as HTMLElement, mergeOptions())
  }

  watch(
    () => options,
    () => {
      if (!instance) return
      forEachObject(mergeOptions(), (key, value) => {
        // @ts-ignore
        instance?.option(key, value)
      })
    },
    { deep: true }
  )

  const methods = {
    option: (name: keyof Options, value?: any) => {
      // @ts-ignore
      return instance?.option(name, value)
    },
    destroy: () => {
      instance?.destroy()
      instance = null
    },
    save: () => instance?.save(),
    toArray: () => instance?.toArray(),
    closest: (...args) => {
      // @ts-ignore
      return instance?.closest(...args)
    }
  } as Pick<Sortable, SortableMethod>

  const pause = () => methods?.option('disabled', true)
  const resume = () => methods?.option('disabled', false)

  tryOnMounted(() => {
    immediate && start()
  })

  tryOnUnmounted(methods.destroy)

  return { start, pause, resume, ...methods }
}
