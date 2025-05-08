---
map:
 path: /faq/
---

# FAQ

### Why is the order not updating correctly when I sort?

Answer: Please ensure that when using v-for to render a list, the bound key values are unique to avoid rendering errors. Avoid using the index as the key value.

### How to use with common UI framework table components

Answer: Taking `el-table` from `element-plus` as an example, the `target` attribute works similarly to the native `querySelector`. Thus, we simply need to inspect the element and locate the `tbody` tag. [View the Vue 3 example on CodeSandbox](https://codesandbox.io/p/devbox/priceless-sky-ns6zgm).

```vue
<VueDraggable v-model="data" target=".el-table__body tbody">
```
