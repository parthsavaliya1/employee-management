import moment from 'moment';
export function formateDate(date) {
return moment(date).format('YYYY-MM-DD')
}