---
map:
  path: /faq/
---

# 常见问题

### 为什么我在排序时，更新顺序错误？

答：请确保在使用 v-for 渲染列表时，绑定的 key 值是唯一的，否则会导致渲染错误。避免使用 index 作为 key 值。

### 如何与常见的UI框架的表格组件一起使用

答：以 `element-plus` 的 `el-table` 为例 `target` 属性其实相当于原生的 `querySelector`, 所以我们需要审查元素找到 `tbody` 标签所在位置即可 [通过codesandbox查看vue3示例]( https://codesandbox.io/p/devbox/priceless-sky-ns6zgm) 

```vue
<VueDraggable v-model="data" target=".el-table__body tbody">
```
