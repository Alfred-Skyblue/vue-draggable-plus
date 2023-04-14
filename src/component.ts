import { defineComponent, h, reactive, ref, computed, useAttrs } from 'vue-demi'
import { objectMap } from './utils'
import { useDraggable, UseDraggableOptions } from './useDraggable'
import { toRaw } from 'vue'

interface IProps extends UseDraggableOptions<any> {
  modelValue: any[]
  tag?: string
  target?: string
}

// Need to declare Event thrown here, otherwise it will cause Sortablejs internal dispatch Event, repeated trigger events
const emits = [
  'update',
  'start',
  'add',
  'remove',
  'choose',
  'unchoose',
  'end',
  'sort',
  'filter',
  'clone',
  'move',
  'change'
] as const

const props = [
  'onUpdate',
  'onStart',
  'onAdd',
  'onRemove',
  'animation',
  'ghostClass',
  'group',
  'sort',
  'disabled',
  'store',
  'handle',
  'draggable',
  'swapThreshold',
  'invertSwap',
  'invertedSwapThreshold',
  'removeCloneOnHide',
  'direction',
  'chosenClass',
  'dragClass',
  'ignore',
  'filter',
  'preventOnFilter',
  'easing',
  'setData',
  'dropBubble',
  'dragoverBubble',
  'dataIdAttr',
  'delay',
  'delayOnTouchOnly',
  'touchStartThreshold',
  'forceFallback',
  'fallbackClass',
  'fallbackOnBody',
  'fallbackTolerance',
  'fallbackOffset',
  'supportPointer',
  'emptyInsertThreshold',
  'scroll',
  'forceAutoScrollFallback',
  'scrollSensitivity',
  'scrollSpeed',
  'bubbleScroll',
  'modelValue',
  'tag',
  'target',
  ...emits.map(key => `on${key.replace(/^\S/, s => s.toUpperCase())}`)
] as const

export const VueDraggable = defineComponent<IProps>({
  name: 'VueDraggable',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  props: props as unknown as any,
  emits: ['update:modelValue', ...emits],
  setup(props, { slots, emit, expose }) {
    const attrs = useAttrs()
    const events = emits.reduce((acc, key) => {
      const event = `on${key.replace(/^\S/, s => s.toUpperCase())}`
      acc[event] = (e: any) => emit(key, e)
      return acc
    }, {} as any)

    const options = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { modelValue, ...rest } = toRaw(props)
      return {
        ...events,
        ...objectMap({ ...attrs, ...rest })
      }
    })

    const list = computed({
      get: () => props.modelValue,
      set: v => emit('update:modelValue', v)
    })

    const target = ref()
    const data = reactive(
      useDraggable((props.target || target) as string, list, options)
    )

    expose(data)

    return () => {
      if (slots.default)
        return h(props.tag || 'div', { ref: target }, slots.default(data))
    }
  }
})
