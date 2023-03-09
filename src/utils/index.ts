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
