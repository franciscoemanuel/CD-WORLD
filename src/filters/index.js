import * as moment from 'moment'

export function currencyFilter(number) {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function dateFilter(date) {
  moment.locale('pt-br')
  return moment(date).format('LLL')
}
