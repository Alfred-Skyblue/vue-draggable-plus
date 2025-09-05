---
map:
 path: /faq/
---

# FAQ

### Why is the order not updating correctly when I sort?

Answer: Please ensure that when using v-for to render a list, the bound key values are unique to avoid rendering errors. Avoid using the index as the key value.

### Why is the update order not what I expected when using the v-draggable directive?

Answer: If the data is asynchronous, it is recommended to use a combined function or component. The v-draggable directive cannot detect data updates, resulting in sorting failure!
