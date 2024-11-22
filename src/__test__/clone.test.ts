import { userEvent } from '@vitest/browser/context'
import { VueDraggable } from '..'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, RenderResult } from 'vitest-browser-vue'
import { computed, h, ref, toValue } from 'vue'
import { getTextContents } from './helpers'

describe('clone', () => {
  const data = Array.from({ length: 4 }).map((_, i) => `item${i + 1}`)

  const list1 = ref<typeof data>([])
  const list2 = ref<typeof data>([])
  const screen = ref<RenderResult<object> | null>(null)

  const list1ItemElements = computed(() =>
    screen.value!.getByTestId('list1').getByRole('listitem').elements()
  )
  const list2ItemElements = computed(() =>
    screen.value!.getByTestId('list2').getByRole('listitem').elements()
  )

  const onClone = vi.fn()

  describe('component', () => {
    beforeEach(() => {
      list1.value = data.map(d => `${d}-1`)
      list2.value = data.map(d => `${d}-2`)

      screen.value = render(() => [
        h(
          VueDraggable,
          {
            tag: 'ul',
            'data-testid': 'list1',
            modelValue: list1.value,
            'onUpdate:modelValue': (v: any) => (list1.value = v),
            sort: false,
            group: { name: 'people', pull: 'clone', put: false },
            onClone
          },
          {
            default: () => list1.value.map(item => h('li', item))
          }
        ),
        h(
          VueDraggable,
          {
            tag: 'ul',
            'data-testid': 'list2',
            modelValue: list2.value,
            'onUpdate:modelValue': (v: any) => (list2.value = v),
            group: 'people'
          },
          {
            default: () => list2.value.map(item => h('li', item))
          }
        )
      ])
    })

    it("shouldn't sort list1", async () => {
      const list1Snap = toValue(list1.value)

      expect(getTextContents(list1ItemElements.value)).toEqual(list1Snap)

      await userEvent.dragAndDrop(
        screen.value!.getByText(list1Snap[0]).element(),
        screen.value!.getByText(list1Snap[1]).element()
      )

      expect(getTextContents(list1ItemElements.value)).toEqual(list1Snap)
      expect(list1.value).toEqual(list1Snap)
    })

    it('should sort list2', async () => {
      const list2Snap = toValue(list2.value)

      expect(getTextContents(list2ItemElements.value)).toEqual(list2Snap)

      await userEvent.dragAndDrop(
        screen.value!.getByText(list2Snap[0]).element(),
        screen.value!.getByText(list2Snap[1]).element()
      )

      const updatedList2 = [list2Snap[1], list2Snap[0], ...list2Snap.slice(2)]

      expect(getTextContents(list2ItemElements.value)).toEqual(updatedList2)
      expect(list2.value).toEqual(updatedList2)
    })

    // TODO: it only works when the headless option is false
    it('should clone item from list1 to list2', async () => {
      const list1Snap = toValue(list1.value)
      const list2Snap = toValue(list2.value)

      await userEvent.dragAndDrop(
        screen.value!.getByText(list1Snap[0]).element(),
        screen.value!.getByText(list2Snap[0]).element()
      )

      const updatedList2 = [list1Snap[0], ...list2Snap]

      expect(getTextContents(list2ItemElements.value)).toEqual(updatedList2)
      expect(list2.value).toEqual(updatedList2)

      expect(onClone).toHaveBeenCalledTimes(1)
    })
  })
})
