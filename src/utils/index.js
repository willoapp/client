import forOwn from 'lodash-es/forOwn'

export function collectionToArray (obj) {
  return Object.keys(obj).map(key => obj[key])
}

export function insertIds (obj) {
  forOwn(obj, (value, key) => {
    obj[key]['id'] = key
  })
  return obj
}