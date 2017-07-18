import moment from 'moment';
export function fromNow(time) {
    const dateTime = new Date(time);
    return moment(dateTime).fromNow();
}
//# sourceMappingURL=moment.js.map