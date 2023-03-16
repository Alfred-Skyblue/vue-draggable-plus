---
map:
 path: /demo/custom-clone
---

# Custom Clone


We can pass a function through the `clone` attribute to customize the cloned node, and `JSON.parse(JSON.stringify())` is used internally to implement cloning. You can also choose to use `lodash` or other third-party libraries. Clone, this function is commonly used in low-code scenarios, such as dragging form elements to the canvas, and a new component element needs to be cloned.

When we use this function, we need to pay attention to：
1. The `pull` attribute in the `group` attribute of the cloned component must be `clone`, otherwise it cannot be cloned.
2. The `name` attribute in the `group` of the cloned component must be consistent with the `name` attribute in the `group` of the cloned component, otherwise it cannot be cloned.

::: tip
Note: When we use the `clone` attribute, we need to regenerate a unique `key`, otherwise it will cause the component to render abnormally.
:::

## Component Usage

<demo src="./demo.vue"
title="Clone using components"
desc="Pass through the pull.clone attribute of the group to realize clone">
</demo>

## Hooks Usage

<demo src="./hooks.vue"
title="Cloning using hooks"
desc="Use hooks to pass options to achieve cloning">
</demo>

## Directive Usage

<demo src="./directive.vue"
title="Clone using directive"
desc="Cloning with directives passing options">
</demo>
