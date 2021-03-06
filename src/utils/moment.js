import moment from 'moment'

export function fromNow(time) {
  const dateTime = new Date(time)
  return moment(dateTime).fromNow()
}

export default moment