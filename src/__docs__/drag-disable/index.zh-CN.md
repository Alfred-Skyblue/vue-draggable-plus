---
map:
  path: /demo/drag-disable
---

# 禁用拖拽项

### 如何让拖拽容器中部分元素不能进行拖拽？

答：可以使用 `filter` 属性通过传入 `class` 过滤出不需要进行拖拽的元素

<demo src="./filter.vue"
title="禁用拖拽"
desc="使左侧列表第一个元素无法进行拖拽">
</demo>