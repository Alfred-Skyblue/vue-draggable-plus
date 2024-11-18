---
map:
  path: /demo/clone
---

# Drag Clone


Drag and drop from one list to another list, you can use the `clone` attribute to enable it, internally use `JSON.parse(JSON.stringify())` to achieve cloning by default, if you need to pass a custom function, please Use the `clone` attribute to pass the function, and use the method to [customize the clone](../custom-clone/).

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

## Function Usage

<demo src="./function.vue"
title="Cloning using function"
desc="Use function to pass options to achieve cloning">
</demo>

## Directive Usage

<demo src="./directive.vue"
title="Clone using directive"
desc="Cloning with directives passing options">
</demo>
