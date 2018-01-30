import * as moment from 'moment'

export function currencyFilter(number) {
  if (!number) return
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function dateFilter(date) {
  moment.locale('pt-br')
  return moment(date).format('LLL')
}

export function truncateFilter(title, size) {
  if (!title) return
  const truncatedString = title.substring(0, size)
  return title.length >= size ? `${truncatedString}...` : title
}
