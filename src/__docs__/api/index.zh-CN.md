---
map:
  path: /api/
---

# API

## 使用说明

所有以 on 开头的事件函数，都可以以 v-on 的方式传递给组件，例如：

```vue
<template>
  <VueDraggable v-model="list" @start="onStart" @end="onEnd">
    <div v-for="item in list" :key="item.id">
      {{ item.name }}
    </div>
  </VueDraggable>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { VueDraggable, DraggableEvent } from 'vue-draggable-plus'

const list = ref([
  {
    name: 'Joao',
    id: '1'
  },
  {
    name: 'Jean',
    id: '2'
  },
  {
    name: 'Johanna',
    id: '3'
  },
  {
    name: 'Juan',
    id: '4'
  }
])

function onStart(event: DraggableEvent) {
  console.log('开始拖拽')
}

function onEnd(event: DraggableEvent) {
  console.log('拖拽结束')
}
</script>
```

> Hooks 及指令使用请参考文档

## 类型

```ts

type SortableMethod = 'closest' | 'save' | 'toArray' | 'destroy' | 'option'

/**
 * useDraggable 返回值
 */
export interface UseDraggableReturn extends Pick<Sortable, SortableMethod> {
  /**
   * 启动拖拽
   * @param {HTMLElement} target - 指定拖拽的元素
   * @default - 组件根元素，参考 [指定目标容器](/demo/target-container/)，默认为组件根元素
   */
  start: (target?: HTMLElement) => void
  /**
   * 暂停拖拽
   */
  pause: () => void
  /**
   * 恢复拖拽
   */
  resume: () => void
}

export interface UseDraggableOptions<T> extends Options {
  clone?: (element: T) => T
  immediate?: boolean
  customUpdate?: (event: DraggableEvent) => void
}

interface DraggableEvent<T = any> extends DraggableEvent {
  data: T
  clonedData: T
}
```

## Options

`Options` 继承自 `Sortablejs` 所有的配置项，具体请查看 [`Sortablejs` 官方文档](https://github.com/SortableJS/Sortable)

```ts
type Easing =
  | 'steps(int, start | end)'
  | 'cubic-bezier(n, n, n, n)'
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'step-start'
  | 'step-end'
  | 'initial'
  | 'inherit'

type PullResult = ReadonlyArray<string> | boolean | 'clone'
type PutResult = ReadonlyArray<string> | boolean

interface GroupOptions {
  /**
   * 组名
   */
  name: string
  /**
   * 从列表中移动的能力。克隆——复制项目，而不是移动。
   */
  pull?: PullResult | ((to: Sortable, from: Sortable, dragEl: HTMLElement, event: SortableEvent) => PullResult) | undefined;
  /**
   * 是否可以从其他列表中添加元素，或者可以从中获取元素的组名数组。
   */
  put?: PutResult | ((to: Sortable, from: Sortable, dragEl: HTMLElement, event: SortableEvent) => PutResult) | undefined;
  /**
   * 移动到另一个列表后，将克隆的元素恢复到初始位置。
   */
  revertClone?: boolean | undefined
}

type Group = string | GroupOptions | undefined

type ScrollFn =
  | ((
      this: Sortable,
      offsetX: number,
      offsetY: number,
      originalEvent: Event,
      touchEvt: TouchEvent,
      hoverTargetEl: HTMLElement
    ) => 'continue' | void)
  | undefined
```

| 参数                  | 说明                                                                                                                                                         | 类型                                                | 默认值              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | ------------------- |
| animation             | 拖动时显示动画                                                                                                                                               | `Number`                                            | 0                   |
| chosenClass           | 被选中项的 css 类名                                                                                                                                          | `String`                                            | 'sortable-chosen'   |
| delay                 | 选中拖拽延时                                                                                                                                                 | `Number`                                            | 0                   |
| delayOnTouchOnly      | `touch` 事件延迟                                                                                                                                             | `Number`                                            | 0                   |
| direction             | 拖拽方向，默认自动判断。可选值有`horizontal` 和 `vertical`                                                                                                   | `String`                                            | -                   |
| disabled              | 是否禁止拖拽                                                                                                                                                 | `Boolean`                                           | false               |
| dragClass             | 拖拽项类名                                                                                                                                                   | `String`                                            | 'sortable-drag'     |
| draggable             | 指定元素内的哪些项目应该是可拖动的                                                                                                                           | `String`                                            | -                   |
| emptyInsertThreshold  | 拖动时鼠标必须与空可排序项的距离（以像素为单位）,以便将拖动元素插入到该可排序项中, 设置为`0`禁用此功能。                                                     | `Number`                                            | 5                   |
| easing                | 简化动画。                                                                                                                                                   | `Easing`                                            | -                   |
| fallbackClass         | 当使用 forceFallback 的时候，被复制的 dom 的 css 类名                                                                                                        | `String`                                            | `sortable-fallback` |
| fallbackOnBody        | 将 cloned DOM 元素挂到 body 元素上。                                                                                                                         | `Boolean`                                           | `false`             |
| fallbackTolerance     | 以像素为单位指定鼠标在被视为拖动之前应该移动多远。                                                                                                           | `Number`                                            | 0                   |
| filter                | 不需要进行拖动的元素                                                                                                                                         | `String`                                            | -                   |
| forceFallback         | 忽略 HTML5 拖拽行为，强制回退                                                                                                                                | `Boolean`                                           | `false`             |
| ghostClass            | drop placeholder 的 css 类名                                                                                                                                 | `String`                                            | 'sortable-ghost'    |
| group                 | 要将元素从一个列表拖到另一个列表中，两个列表必须具有相同的`group` 值。您还可以定义列表是否可以被移出、或者克隆以及接收其他列表元素。详情查阅上方 TS 类型定义 | `Group`                                             | -                   |
| handle                | 设置可拖拽句柄的 css 类名，如果不设置，默认对目标元素的子列表操作进行拖拽                                                                                    | `String`                                            | -                   |
| invertSwap            | 如果设置为 true，将始终使用反向交换区                                                                                                                        | `Boolean`                                           | `false`             |
| invertedSwapThreshold | 反向交换阈值，默认情况下将设置为`swapThreshold` 值                                                                                                           | `Number`                                            | -                   |
| preventOnFilter       | 触发 filter 时调用 event.preventDefault()                                                                                                                    | `Boolean`                                           | `true`              |
| removeCloneOnHide     | 删除不显示的克隆元素，而不是仅仅隐藏它                                                                                                                       | `Boolean`                                           | `true`              |
| sort                  | 定义列表单元是否可以在列表容器内进行拖拽排序                                                                                                                 | `Boolean`                                           | `true`              |
| swapThreshold         | 交换区的阈值                                                                                                                                                 | `Number`                                            | 1                   |
| touchStartThreshold   | 在取消延迟拖动事件之前点应该移动多少像素                                                                                                                     | `Number`                                            | 1                   |
| setData               | 传递一个函数，函数的第一个参数为`DataTransfer`类型，第二个参数为`HTMLElement` 类型                                                                           | `Function`                                          |                     |
| scroll                | 是否启用滚动                                                                                                                                                 | `Boolean` or `HTMLElement`                          | `true`              |
| scrollFn              | 自定义滚动                                                                                                                                                   | `ScrollFn`                                          | -                   |
| scrollSensitivity     | 鼠标必须离边缘多近才能开始滚动，单位 px                                                                                                                      | `Number`                                            | -                   |
| scrollSpeed           | 滚动速度(ms/px)                                                                                                                                              | `number`                                            | -                   |
| bubbleScroll          | 将自动滚动应用于所有父元素，以便更轻松地移动                                                                                                                 | `Boolean`                                           | `true`              |
| onChoose              | 元素被选中                                                                                                                                                   | `((event: DraggableEvent) => void)`                  | -                   |
| onUnchoose            | 元素取消选中                                                                                                                                                 | `((event: DraggableEvent) => void)`                  | -                   |
| onStart               | 元素开始拖拽                                                                                                                                                 | `((event: DraggableEvent) => void)`                  | -                   |
| onEnd                 | 元素取消拖拽                                                                                                                                                 | `((event: DraggableEvent) => void)`                  | -                   |
| onAdd                 | 元素从一个列表拖拽到另一个列表                                                                                                                               | `((event: DraggableEvent) => void)`                  | -                   |
| onUpdate              | 元素顺序更新时触发                                                                                                                                           | `((event: DraggableEvent) => void)`                  | -                   |
| onSort                | 列表的任何更改都会触发                                                                                                                                       | `((event: DraggableEvent) => void)`                  | -                   |
| onRemove              | 元素从列表中移除进入另一个列表                                                                                                                               | `((event: DraggableEvent) => void)`                  | -                   |
| onFilter              | 试图拖拽一个 filtered 的元素                                                                                                                                 | `((event: DraggableEvent) => void)`                  | -                   |
| onMove                | 拖拽移动的时候触发                                                                                                                                           | `((event: MoveEvent,originalEvent: Event) => void)` | -                   |
| onClone               | 克隆一个元素时触发                                                                                                                                           | `((event: DraggableEvent) => void)`                  | -                   |
| onChange              | 拖拽元素改变位置时触发                                                                                                                                       | `((event: DraggableEvent) => void)`                  | -                   |

## Component (组件属性)

### Props

组件的 props 包含 `Sortablejs` 的所有 options，都可以传递给组件，具体请查看 [Options](#options)

| 参数                | 描述                                                                               | 必传 | 默认值 |
| ------------------- | ---------------------------------------------------------------------------------- | ---- | ------ |
| modelValue(v-model) | 双向绑定的列表                                                                     | 是   | -      |
| tag                 | 组件渲染的根元素标签名                                                             | 否   | `div`  |
| target              | 指定目标容器，未传递时以组件为根元素，详见 [指定目标容器](/demo/target-container/) | 否   | -      |

### 插槽

| 名称    | 说明     | 参数                 |
| ------- | -------- | -------------------- |
| default | 默认插槽 | `UseDraggableReturn` |
