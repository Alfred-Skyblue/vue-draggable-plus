---
map:
  path: /demo/drag-disable
---

# Disable Drag Items

### How can I make some elements in a draggable container non draggable?

Answer: use the `filter` attribute and pass in a `class` to filter out the elements that should not be draggable.

<demo src="./filter.vue"
title="Drag disable"
desc="Make the first element of the left list non-draggable.">
</demo>