import { useDraggable } from './hooks/useDraggable'
import {
  type PropType,
  defineComponent,
  h,
  reactive,
  ref,
  computed,
  useAttrs
} from 'vue'

export const VueDraggablePlus = defineComponent({
  name: 'VueDraggablePlus',
  props: {
    modelValue: {
      type: Array as PropType<any[]>,
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props, { slots, emit }) {
    const attrs = useAttrs()
    const list = computed({
      get: () => props.modelValue,
      set: v => emit('update:modelValue', v)
    })
    const target = ref()
    const data = reactive(useDraggable(target, list, attrs))
    return () => {
      if (slots.default)
        return h(props.tag, { ref: target }, slots.default(data))
    }
  }
})
