export const dictToArray = (dict: any): Array<any> => Object.keys(dict).map((name) => dict[name])

export interface IObject {
  [key: string]: any
}

export const only = (obj: IObject, keys: string[] | string) => {
  obj = obj || {}
  if (typeof keys === 'string') {
    keys = new Array(keys)
  }
  return keys.reduce((ret: IObject, key: string) => {
    if (null == obj[key]) return ret
    ret[key] = obj[key]
    return ret
  }, {})
}

export const exclude = (obj: IObject, keys: string[] | string) => {
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
