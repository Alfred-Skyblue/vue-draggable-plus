import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, RenderResult } from 'vitest-browser-vue'
import { useDraggable, VueDraggable, vDraggable } from '..'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  ref,
  withDirectives
} from 'vue'
import { userEvent } from '@vitest/browser/context'
import { type SortableEvent } from 'sortablejs'
import { getTextContents } from './helpers'

describe('basic', () => {
  const data = Array.from({ length: 4 }).map((_, i) => `item${i + 1}`)

  const list = ref<typeof data>([])
  const screen = ref<RenderResult<object> | null>(null)
  const listItemElements = computed(() =>
    screen.value!.getByRole('listitem').elements()
  )

  const sortableEventCallback = (event: SortableEvent) => [
    event.oldIndex,
    event.newIndex
  ]

  const onStart = vi.fn().mockImplementation(sortableEventCallback)
  const onUpdate = vi.fn().mockImplementation(sortableEventCallback)
  const onEnd = vi.fn().mockImplementation(sortableEventCallback)

  describe('component', () => {
    const draggableRef = ref<InstanceType<typeof VueDraggable> | null>(null)

    beforeEach(() => {
      list.value = data
      screen.value = render(() =>
        h(
          VueDraggable,
          {
            ref: draggableRef,
            tag: 'ul',
            modelValue: list.value,
            'onUpdate:modelValue': (v: any) => (list.value = v),
            onStart,
            onUpdate,
            onEnd
          },
          {
            default: () => list.value.map(item => h('li', item))
          }
        )
      )
    })

    it('should render', () => {
      expect(draggableRef.value?.$el.tagName).toBe('UL')
      expect(getTextContents(listItemElements.value)).toEqual(data)
    })

    it('should render after list change', async () => {
      const updatedList = list.value.slice().reverse()
      list.value = updatedList

      await nextTick()

      expect(getTextContents(listItemElements.value)).toEqual(updatedList)
    })

    it('should update list after item is dragged and dropped', async () => {
      await userEvent.dragAndDrop(
        screen.value!.getByText(data[0]).element(),
        screen.value!.getByText(data[3]).element()
      )

      const updatedList = [...data.slice(1), data[0]]

      expect(getTextContents(listItemElements.value)).toEqual(updatedList)
      expect(list.value).toEqual(updatedList)

      await userEvent.dragAndDrop(
        screen.value!.getByText(updatedList[1]).element(),
        screen.value!.getByText(updatedList[2]).element()
      )

      const updatedList2 = [
        updatedList[0],
        updatedList[2],
        updatedList[1],
        updatedList[3]
      ]

      expect(getTextContents(listItemElements.value)).toEqual(updatedList2)
      expect(list.value).toEqual(updatedList2)
    })

    it('should emit after item is dragged and dropped', async () => {
      await userEvent.dragAndDrop(
        screen.value!.getByText(data[0]).element(),
        screen.value!.getByText(data[3]).element()
      )

      expect(onStart).toReturnWith([0, null])
      expect(onUpdate).toReturnWith([0, 3])
      expect(onEnd).toReturnWith([0, 3])
    })

    it('should pause and resume', async () => {
      draggableRef.value?.pause()

      await userEvent.dragAndDrop(
        screen.value!.getByText(data[0]).element(),
        screen.value!.getByText(data[3]).element()
      )

      expect(getTextContents(listItemElements.value)).toEqual(data)
      expect(list.value).toEqual(data)

      expect(onStart).not.toHaveBeenCalled()
      expect(onUpdate).not.toHaveBeenCalled()
      expect(onEnd).not.toHaveBeenCalled()

      draggableRef.value?.resume()

      await userEvent.dragAndDrop(
        screen.value!.getByText(data[0]).element(),
        screen.value!.getByText(data[2]).element()
      )

      const updatedList = [data[1], data[2], data[0], data[3]]

      expect(getTextContents(listItemElements.value)).toEqual(updatedList)
      expect(list.value).toEqual(updatedList)

      expect(onStart).toHaveBeenCalledOnce()
      expect(onUpdate).toHaveBeenCalledOnce()
      expect(onEnd).toHaveBeenCalledOnce()

      expect(onStart).toReturnWith([0, null])
      expect(onUpdate).toReturnWith([0, 2])
      expect(onEnd).toReturnWith([0, 2])
    })
  })

  describe('composable', () => {
    beforeEach(() => {
      list.value = data
      screen.value = render(
        defineComponent({
          setup() {
            const el = ref<HTMLDivElement | null>(null)
            const { pause, resume } = useDraggable(el, list, {
              onStart,
              onUpdate,
              onEnd
            })

            return () => [
              h(
                'ul',
                { ref: el },
                {
                  default: () => list.value.map(item => h('li', item))
                }
              ),
              h('button', { onClick: pause }, 'pause'),
              h('button', { onClick: resume }, 'resume')
            ]
          }
        })
      )
    })

    it('should render', () => {
      expect(getTextContents(listItemElements.value)).toEqual(data)
    })

    it('should render after list change', async () => {
      const updatedList = list.value.slice().reverse()
      list.value = updatedList

      await nextTick()

      expect(getTextContents(listItemElements.value)).toEqual(updatedList)
    })

    it('should update list after item is dragged and dropped', async () => {
      await userEvent.dragAndDrop(
        screen.value!.getByText(data[0]).element(),
        screen.value!.getByText(data[3]).element()
      )

      const updatedList = [...data.slice(1), data[0]]

      expect(getTextContents(listItemElements.value)).toEqual(updatedList)
      expect(list.value).toEqual(updatedList)
    })

    it('should emit after item is dragged and dropped', async () => {
      await userEvent.dragAndDrop(
        screen.value!.getByText(data[0]).element(),
        screen.value!.getByText(data[3]).element()
      )

      expect(onStart).toReturnWith([0, null])
      expect(onUpdate).toReturnWith([0, 3])
      expect(onEnd).toReturnWith([0, 3])
    })

    it('should pause and resume', async () => {
      await userEvent.click(screen.value!.getByText('pause'))

      await userEvent.dragAndDrop(
        screen.value!.getByText(data[0]).element(),
        screen.value!.getByText(data[3]).element()
      )

      expect(getTextContents(listItemElements.value)).toEqual(data)
      expect(list.value).toEqual(data)

      expect(onStart).not.toHaveBeenCalled()
      expect(onUpdate).not.toHaveBeenCalled()
      expect(onEnd).not.toHaveBeenCalled()

      await userEvent.click(screen.value!.getByText('resume'))

      await userEvent.dragAndDrop(
        screen.value!.getByText(data[0]).element(),
        screen.value!.getByText(data[3]).element()
      )

      const updatedList = [...data.slice(1), data[0]]

      expect(getTextContents(listItemElements.value)).toEqual(updatedList)
      expect(list.value).toEqual(updatedList)

      expect(onStart).toHaveBeenCalledOnce()
      expect(onUpdate).toHaveBeenCalledOnce()
      expect(onEnd).toHaveBeenCalledOnce()

      expect(onStart).toReturnWith([0, null])
      expect(onUpdate).toReturnWith([0, 3])
      expect(onEnd).toReturnWith([0, 3])
    })
  })

  describe('directive', () => {
    beforeEach(() => {
      list.value = data
      screen.value = render(() =>
        withDirectives(
          h(
            'ul',
            list.value.map(item => h('li', item))
          ),
          [[vDraggable, [list, { onStart, onUpdate, onEnd }]]]
        )
      )
    })

    it('should render', () => {
      expect(getTextContents(listItemElements.value)).toEqual(data)
    })

    it('should render after list change', async () => {
      const updatedList = list.value.slice().reverse()
      list.value = updatedList

      await nextTick()

      expect(getTextContents(listItemElements.value)).toEqual(updatedList)
    })

    it('should update list after item is dragged and dropped', async () => {
      await userEvent.dragAndDrop(
        screen.value!.getByText(data[0]).element(),
        screen.value!.getByText(data[3]).element()
      )

      const updatedList = [...data.slice(1), data[0]]

      expect(getTextContents(listItemElements.value)).toEqual(updatedList)
      expect(list.value).toEqual(updatedList)
    })
  })
})
