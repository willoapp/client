import forOwn from 'lodash-es/forOwn'
import isEmpty from 'lodash-es/isEmpty'
import get from 'lodash-es/get'

export function collectionToArray (obj) {
  return Object.keys(obj).map(key => obj[key])
}

export function collectionToArrayWithIds (obj) {
  const arr = Object.keys(insertIds(obj)).map(key => obj[key])
  return arr
}

export function currentUserWithId(usersObj, auth) {
  if (!isEmpty(usersObj) && !isEmpty(auth)) {
    const foundUser = get(usersObj, auth.uid, null)
    if (!isEmpty(foundUser))
      return Object.assign({}, foundUser, {id: auth.uid})
    else
      return null
  }

  return null
}

export function insertIds (obj) {
  forOwn(obj, (value, key) => {
    obj[key]['id'] = key
  })
  return obj
}