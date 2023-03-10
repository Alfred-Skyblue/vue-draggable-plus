import {
  type PropType,
  defineComponent,
  h,
  reactive,
  ref,
  computed,
  useAttrs
} from 'vue'
import { objectMap } from './utils'
import { useDraggable } from './hooks'

export const VueDraggablePlus = defineComponent({
  name: 'VueDraggablePlus',
  props: {
    componentProps: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Array as PropType<any[]>,
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    },
    selector: {
      type: String
    }
  },
  setup(props, { slots, emit, expose }) {
    const attrs = useAttrs()

    const options = computed(() => objectMap(attrs))
    const list = computed({
      get: () => props.modelValue,
      set: v => emit('update:modelValue', v)
    })
    const target = ref()
    const data = reactive(
      useDraggable((props.selector || target) as string, list, options)
    )

    expose(data)
    return () => {
      if (slots.default)
        return h(
          props.tag,
          { ref: target, ...props.componentProps },
          slots.default(data)
        )
    }
  }
})
