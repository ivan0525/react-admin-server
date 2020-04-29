export const dictToArray = (dict: any): Array<any> => Object.keys(dict).map((name) => dict[name])

export const print = {
  log: (text: string) => console.log('\x1b[37m%s \x1b[2m%s\x1b[0m', '>', text),
  danger: (text: string) => console.log('\x1b[31m%s \x1b[31m%s\x1b[0m', '>', text),
  tip: (text: string) => console.log('\x1b[36m%s \x1b[36m%s\x1b[0m', '>', text)
}

export interface Iobject {
  [key: string]: any
}

export const only = (obj: Iobject, keys: string[] | string) => {
  obj = obj || {}
  if (typeof keys === 'string') {
    keys = new Array(keys)
  }
  return keys.reduce((ret: Iobject, key: string) => {
    if (null == obj[key]) return ret
    ret[key] = obj[key]
    return ret
  }, {})
}

export const exclude = (obj: Iobject, keys: string[] | string) => {
  obj = obj || {}
  const allKeys = Object.keys(obj)
  if (typeof keys === 'string') {
    keys = new Array(keys)
  }
  let result = Object.create(null)
  allKeys.forEach((key) => {
    if (keys.indexOf(key) === -1) {
      result[key] = obj[key]
    }
  })
  return result
}
