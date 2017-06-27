export function collectionToArray (obj) {
  return Object.keys(obj).map(key => Object.assign({}, obj[key], {key: key}))
}