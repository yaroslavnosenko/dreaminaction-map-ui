import uk from './locales/uk.json'

function getProp(object: any, keys: string[], defaultVal: string): any {
  const key = keys[0]
  if (key && object[key] !== undefined) {
    if (keys.length === 1) {
      return object[key]
    }
    return getProp(object[key], keys.slice(1), defaultVal)
  }
  return defaultVal
}

export const t = (key: string): string => {
  return getProp(uk, key.split('.'), key)
}
