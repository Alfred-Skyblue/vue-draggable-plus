---
map:
  path: /demo/clone
---

# 拖拽克隆

从一个列表中拖拽克隆到另一个列表，可以通过 `clone` 属性来开启它，内部默认使用 `JSON.parse(JSON.stringify())` 来实现克隆，如果您需要传递自定义函数，请使用 `clone` 属性传递函数，使用方式[自定义克隆](../custom-clone/)。

我们在使用该功能时，需要注意：
1. 被克隆组件的 `group` 属性中的 `pull` 属性必须为 `clone`，否则无法克隆。
2. 被克隆组件中的 `group` 中的 `name` 属性必须与克隆组件的 `group` 中的 `name` 属性一致，否则无法克隆。


::: tip
注意：当我们使用 `clone` 属性时，需要重新生成一个唯一的 `key`，否则会导致组件渲染异常。
:::

## 组件使用

<demo src="./demo.vue"
title="使用组件实现克隆"
desc="通过group的pull.clone属性传递，实现clone">
</demo>

## hooks 使用

<demo src="./hooks.vue"
title="使用 hooks 实现克隆"
desc="使用 hooks 传递 options 实现克隆">
</demo>

## 指令使用

<demo src="./directive.vue"
title="使用指令实现克隆"
desc="使用指令传递 options 实现克隆">
</demo>
