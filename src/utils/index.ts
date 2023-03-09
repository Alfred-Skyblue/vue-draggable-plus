/**
 * Moves an element in an array from one position to another.
 * @param {T[]} array
 * @param {number} from
 * @param {number} to
 */
export function moveArrayElement<T>(
  array: T[],
  from: number,
  to: number
): void {
  if (to >= 0 && to < array.length) {
    array.splice(to, 0, array.splice(from, 1)[0])
  }
}

/**
 * Convert a hyphen-delimited string to camelCase.
 * @param {string} str
 * @returns {string}
 */
export function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * Convert an object's keys from hyphen-delimited to camelCase.
 * @param {Record<string, any>} object
 * @returns {Record<string, any>}
 */
export function objectMap(object: Record<any, any>) {
  return Object.keys(object).reduce((result, key) => {
    result[camelize(key)] = object[key]
    return result
  }, {} as Record<string, any>)
}

/**
 * Removes an element from an array.
 * @param {T[]} array
 * @param {number} index
 * @returns {T[]}
 */
export function removeElement<T>(array: T[], index: number) {
  return array.splice(index, 1)
}

/**
 * Inserts an element into an array.
 * @param {T[]} array
 * @param {number} index
 * @param element
 */
export function insertElement<T>(array: T[], index: number, element: any) {
  return array.splice(index, 0, element)
}

/**
 * If the value is undefined, return true, otherwise return false.
 * @param {any} value - any
 * @returns {value is undefined}
 */
export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

/**
 * If the value is string, return true, otherwise return false.
 * @param value
 * @returns {value is string}
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}

/**
 * Inserts a element into the DOM at a given index.
 * @param parentElement
 * @param element
 * @param {number} index
 */
export function insertNodeAt(
  parentElement: Element,
  element: Element,
  index: number
) {
  const refElement =
    index === 0 ? parentElement.firstChild : parentElement.children[index]
  parentElement.insertBefore(element, refElement)
}

/**
 * Removes a node from the DOM.
 * @param {Node} node
 */
export function removeNode(node: Node) {
  if (node.parentNode) node.parentNode.removeChild(node)
}

/**
 * Logs a warning message.
 * @param {string} msg
 */
export function warn(msg: string) {
  console.warn(`[vue-draggable-plus]: ${msg}`)
}

/**
 * Get an element by selector.
 * @param {string} selector
 * @returns {Element}
 */
export function getElementBySelector(selector: string) {
  const el = document?.querySelector(selector)
  if (!el) {
    warn(`Element not found: ${selector}`)
  }
  return el as HTMLElement
}
