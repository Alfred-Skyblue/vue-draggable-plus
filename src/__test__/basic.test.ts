import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, RenderResult } from 'vitest-browser-vue'
import { useDraggable, VueDraggable } from '..'
import { computed, defineComponent, h, nextTick, ref } from 'vue'
import { userEvent } from '@vitest/browser/context'
import type { SortableEvent } from 'sortablejs'

describe('basic', () => {
  const data = Array.from({ length: 4 }).map((_, i) => `item${i + 1}`)

  describe('component', () => {
    const list = ref<typeof data>([])
    const screen = ref<RenderResult<{
      modelValue: string[]
      'onUpdate:modelValue': (e: any) => any
    }> | null>(null)

    const itemElements = computed(() =>
      screen.value!.getByTestId('item').elements()
    )

    beforeEach(() => {
      list.value = data
      screen.value = render(VueDraggable, {
        props: {
          modelValue: list.value,
          'onUpdate:modelValue': (e: any) => (list.value = e)
        },
        slots: {
          default: () =>
            list.value.map(item => h('div', { 'data-testid': 'item' }, item))
        }
      })
    })

    it('should render', () => {
      expect(itemElements.value.map(el => el.textContent))
        .toMatchInlineSnapshot(`
        [
          "item1",
          "item2",
          "item3",
          "item4",
        ]
      `)
    })

    it('should render after list change', async () => {
      list.value = list.value.slice().reverse()

      await nextTick()

      expect(itemElements.value.map(el => el.textContent))
        .toMatchInlineSnapshot(`
        [
          "item4",
          "item3",
          "item2",
          "item1",
        ]
      `)
    })

    it('should update list after item is dragged and dropped', async () => {
      await userEvent.dragAndDrop(
        screen.value!.getByText('item1').element(),
        screen.value!.getByText('item4').element()
      )

      expect(itemElements.value.map(el => el.textContent))
        .toMatchInlineSnapshot(`
        [
          "item2",
          "item3",
          "item4",
          "item1",
        ]
      `)

      expect(list.value).toMatchInlineSnapshot(`
        [
          "item2",
          "item3",
          "item4",
          "item1",
        ]
      `)
    })

    it('should emit after item is dragged and dropped', async () => {
      await userEvent.dragAndDrop(
        screen.value!.getByText('item1').element(),
        screen.value!.getByText('item4').element()
      )

      expect(screen.value!.emitted('update:modelValue')).toHaveLength(1)

      const onStartEvent =
        screen.value!.emitted<SortableEvent[]>('start')?.[0]?.[0]
      expect(onStartEvent?.oldIndex).toBe(0)
      expect(onStartEvent?.newIndex).toBe(null)

      const onUpdateEvent =
        screen.value!.emitted<SortableEvent[]>('update')?.[0]?.[0]
      expect(onUpdateEvent?.oldIndex).toBe(0)
      expect(onUpdateEvent?.newIndex).toBe(3)

      const onEndEvent = screen.value!.emitted<SortableEvent[]>('end')?.[0]?.[0]
      expect(onEndEvent?.oldIndex).toBe(0)
      expect(onEndEvent?.newIndex).toBe(3)
    })
  })

  describe('composable', () => {
    const list = ref<typeof data>([])
    const screen = ref<RenderResult<object> | null>(null)

    const itemElements = computed(() =>
      screen.value!.getByTestId('item').elements()
    )

    const sortableEventCallback = (event: SortableEvent) => [
      event.oldIndex,
      event.newIndex
    ]

    const onStart = vi.fn().mockImplementation(sortableEventCallback)
    const onUpdate = vi.fn().mockImplementation(sortableEventCallback)
    const onEnd = vi.fn().mockImplementation(sortableEventCallback)

    beforeEach(() => {
      list.value = data
      screen.value = render(
        defineComponent({
          setup() {
            const el = ref<HTMLDivElement>()
            const { pause, resume } = useDraggable(el, list, {
              onStart,
              onUpdate,
              onEnd
            })

            return () => [
              h(
                'div',
                { ref: el },
                list.value.map(item =>
                  h('div', { 'data-testid': 'item' }, item)
                )
              ),
              h('button', { onClick: pause }, 'pause'),
              h('button', { onClick: resume }, 'resume')
            ]
          }
        })
      )
    })

    it('should render', () => {
      expect(itemElements.value.map(el => el.textContent))
        .toMatchInlineSnapshot(`
        [
          "item1",
          "item2",
          "item3",
          "item4",
        ]
      `)
    })

    it('should render after list change', async () => {
      list.value = list.value.slice().reverse()

      await nextTick()

      expect(itemElements.value.map(el => el.textContent))
        .toMatchInlineSnapshot(`
        [
          "item4",
          "item3",
          "item2",
          "item1",
        ]
      `)
    })

    it('should update list after item is dragged and dropped', async () => {
      await userEvent.dragAndDrop(
        screen.value!.getByText('item1').element(),
        screen.value!.getByText('item4').element()
      )

      expect(itemElements.value.map(el => el.textContent))
        .toMatchInlineSnapshot(`
        [
          "item2",
          "item3",
          "item4",
          "item1",
        ]
      `)

      expect(list.value).toMatchInlineSnapshot(`
        [
          "item2",
          "item3",
          "item4",
          "item1",
        ]
      `)
    })

    it('should emit after item is dragged and dropped', async () => {
      await userEvent.dragAndDrop(
        screen.value!.getByText('item1').element(),
        screen.value!.getByText('item4').element()
      )

      expect(onStart).toReturnWith([0, null])
      expect(onUpdate).toReturnWith([0, 3])
      expect(onEnd).toReturnWith([0, 3])
    })

    it('should pause and resume', async () => {
      await userEvent.click(screen.value!.getByText('pause'))

      await userEvent.dragAndDrop(
        screen.value!.getByText('item1').element(),
        screen.value!.getByText('item4').element()
      )

      expect(itemElements.value.map(el => el.textContent))
        .toMatchInlineSnapshot(`
        [
          "item1",
          "item2",
          "item3",
          "item4",
        ]
      `)

      expect(onStart).not.toHaveBeenCalled()
      expect(onUpdate).not.toHaveBeenCalled()
      expect(onEnd).not.toHaveBeenCalled()

      await userEvent.click(screen.value!.getByText('resume'))

      await userEvent.dragAndDrop(
        screen.value!.getByText('item1').element(),
        screen.value!.getByText('item4').element()
      )

      expect(itemElements.value.map(el => el.textContent))
        .toMatchInlineSnapshot(`
        [
          "item2",
          "item3",
          "item4",
          "item1",
        ]
      `)

      expect(onStart).toHaveBeenCalledOnce()
      expect(onUpdate).toHaveBeenCalledOnce()
      expect(onEnd).toHaveBeenCalledOnce()

      expect(onStart).toReturnWith([0, null])
      expect(onUpdate).toReturnWith([0, 3])
      expect(onEnd).toReturnWith([0, 3])
    })
  })
})
