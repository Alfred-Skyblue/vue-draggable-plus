import {
  type PropType,
  defineComponent,
  h,
  reactive,
  ref,
  computed,
  useAttrs
} from 'vue-demi'
import { objectMap } from './utils'
import { useDraggable } from './hooks'

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

export const VueDraggable = defineComponent({
  name: 'VueDraggable',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  props: {
    modelValue: {
      type: Array as PropType<any[]>
    },
    tag: {
      type: String,
      default: 'div'
    },
    target: {
      type: String
    }
  },
  emits: ['update:modelValue', ...emits],
  setup(props, { slots, emit, expose }) {
    const attrs = useAttrs()

    const events = emits.reduce((acc, key) => {
      const event = `on${key.replace(/^\S/, s => s.toUpperCase())}`
      acc[event] = (e: any) => {
        emit(key, e)
      }
      return acc
    }, {} as any)

    const options = computed(() => ({ ...objectMap(attrs), ...events }))

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
        return h(props.tag, { ref: target }, slots.default(data))
    }
  }
})
