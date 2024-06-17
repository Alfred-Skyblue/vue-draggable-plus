import Sortable, {
  type Options,
  type SortableEvent,
  MultiDrag
} from 'sortablejs'
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
import type { Fn, RefOrElement, RefOrValue } from './types'

import { error } from './utils/log'
const multiDrag = new MultiDrag()
Sortable.mount(multiDrag)

import {
  forEachObject,
  getElementBySelector,
  insertElement,
  insertNodeAt,
  isHTMLElement,
  isString,
  isUndefined,
  mergeOptionsEvents,
  moveArrayElement,
  moveMultiArray,
  removeElement,
  removeNode
} from './utils'

function defaultClone<T>(element: T): T {
  if (element === undefined || element === null) return element
  return JSON.parse(JSON.stringify(element))
}

function filterIndicies(indicies: SortableEvent['oldIndicies']) {
  return indicies.filter(i => i.index !== -1)
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

interface DraggableEvent extends SortableEvent {
  item: HTMLElement
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

let draggableItems: any = null
let currentParentNode: Node | null = null

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
  options?: RefOrValue<UseDraggableOptions<T>>
): UseDraggableReturn
export function useDraggable<T>(
  el: null | undefined,
  list?: Ref<T[] | undefined>,
  options?: RefOrValue<UseDraggableOptions<T>>
): UseDraggableReturn
export function useDraggable<T>(
  el: Ref<HTMLElement | null | undefined>,
  options?: RefOrValue<UseDraggableOptions<T>>
): UseDraggableReturn
export function useDraggable<T>(
  el: null | undefined,
  options?: RefOrValue<UseDraggableOptions<T>>
): UseDraggableReturn

/**
 * A custom compositionApi utils that allows you to drag and drop elements in lists.
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
    customUpdate
  } = unref(options) ?? {}

  function isMulti(evt: DraggableEvent) {
    return (
      unref(options)?.multiDrag && filterIndicies(evt.oldIndicies).length > 0
    )
  }
  /**
   * Element dragging started
   * @param {DraggableEvent} evt - DraggableEvent
   */
  function onStart(evt: DraggableEvent) {
    currentParentNode = evt.from
    draggableItems = null
    const { oldIndicies, oldIndex } = evt
    const _list = unref(list)
    let data
    if (isMulti(evt)) {
      data = filterIndicies(oldIndicies).map(i => unref(_list?.[i.index]))
    } else {
      data = unref(_list?.[oldIndex!])
    }

    // cloneMap.set(evt[isMulti() ? 'items' : 'item'], clone(data))
    draggableItems = clone(data)
  }

  /**
   * Element is dropped into the list from another list
   * @param {DraggableEvent} evt
   */
  function onAdd(evt: DraggableEvent) {
    const element = draggableItems
    draggableItems = null
    if (isUndefined(element)) return
    if (isMulti(evt)) {
      evt.items.forEach(el => {
        removeNode(el)
      })
    } else {
      removeNode(evt.item)
    }
    insertElement(
      unref(list),
      evt.newDraggableIndex!,
      ...(isMulti(evt) ? element : [element])
    )
  }

  /**
   * Element is removed from the list into another list
   * @param {DraggableEvent} evt
   */
  function onRemove(evt: DraggableEvent) {
    const { oldDraggableIndex, pullMode, oldIndicies } = evt
    if (pullMode === 'clone') {
      return
    }
    if (isRef(list) && isMulti(evt)) {
      const indexs = filterIndicies(oldIndicies).map(i => i.index)
      list.value = (list.value as []).filter(
        (_, index) => !indexs.includes(index)
      )
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
    const { from, item, oldIndex, newIndex, oldIndicies, newIndicies } = evt
    removeNode(item)
    insertNodeAt(from, item, oldIndex!)
    if (isRef<any[]>(list)) {
      const newList = [...unref(list)]
      if (isMulti(evt)) {
        list.value = moveMultiArray(
          newList,
          filterIndicies(oldIndicies).map(i => i.index),
          filterIndicies(newIndicies).map(i => i.index)
        )
        return
      }
      list.value = moveArrayElement(newList, oldIndex!, newIndex!)
      return
    }
    moveArrayElement(unref(list), oldIndex!, newIndex!)
  }

  function onEnd(evt: DraggableEvent) {
    if (!isMulti(evt)) return
    const { items } = evt
    nextTick(() => {
      items.forEach(item => {
        Object.defineProperty(item, 'parentNode', {
          value: currentParentNode,
          writable: false
        })
        // @ts-ignore
        multiDrag?.utils?.deselect?.(item)
      })
      currentParentNode = null
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
    onEnd
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
    return mergeOptionsEvents(
      list === null ? {} : presetOptions,
      restOptions
    ) as Options
  }

  const start = (target?: HTMLElement) => {
    target = getTarget(target)
    if (instance) methods.destroy()

    instance = new Sortable(target as HTMLElement, {
      ...mergeOptions(),
      removeCloneOnHide: true
    })
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
