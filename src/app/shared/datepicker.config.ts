import * as moment from "moment";

export const DATEPICKER_CONFIG = {
  alwaysShowCalendars: true,
  ranges: {
    'Hoje': [moment(), moment()],
    'Ontem': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
    'Últimos 7 dias': [moment().subtract(7, 'day'), moment()],
    'Semana atual': [moment().startOf('week'), moment()],
    'Semana passada': [moment().subtract(5, 'day').isoWeekday(1), moment().subtract(7, 'day').isoWeekday(7)],
    'Mês atual': [moment().startOf('month'), moment().endOf('month')],
    'Mês passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Ano atual': [moment().startOf('year'), moment()],
    'Ano passado': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
  },
  locale: {
    format: 'DD/MM/YYYY',
    "separator": " - ",
    "applyLabel": "Aplicar",
    "cancelLabel": "Cancelar",
    "fromLabel": "De",
    "toLabel": "Para",
    "customRangeLabel": "Customizado",
    "weekLabel": "S",
    "daysOfWeek": [
      "Dom",
      "Seg",
      "Ter",
      "Qua",
      "Qui",
      "Sex",
      "Sáb"
    ],
    "monthNames": [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ]
  },
};