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
import type { SortableEvent } from 'sortablejs'

describe('basic', () => {
  const data = Array.from({ length: 4 }).map((_, i) => `item${i + 1}`)

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

  describe('component', () => {
    const draggableRef = ref<InstanceType<typeof VueDraggable> | null>(null)

    beforeEach(() => {
      list.value = data
      screen.value = render(() =>
        h(
          VueDraggable,
          {
            ref: draggableRef,
            modelValue: list.value,
            'onUpdate:modelValue': (v: any) => (list.value = v),
            onStart,
            onUpdate,
            onEnd
          },
          list.value.map(item => h('div', { 'data-testid': 'item' }, item))
        )
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
      draggableRef.value?.pause()

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

      draggableRef.value?.resume()

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

  describe('composable', () => {
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

  describe('directive', () => {
    beforeEach(() => {
      list.value = data
      screen.value = render(
        defineComponent({
          directives: { draggable: vDraggable },
          setup() {
            return () =>
              withDirectives(
                h(
                  'ul',
                  list.value.map(item =>
                    h('li', { 'data-testid': 'item' }, item)
                  )
                ),
                [[vDraggable, [list, { onStart, onUpdate, onEnd }]]]
              )
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
  })
})
