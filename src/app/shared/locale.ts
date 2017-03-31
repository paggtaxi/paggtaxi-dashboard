export class AppLocale {

  getCalendarLocale(locale?: string) {
    let locales = {
      'pt-br': {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
      }
    };
    return locales[locale] || locales['pt-br'];
  }

  getDatePickerFormat(locale?: string) {
    let locales = {
      'pt-br': 'dd/mm/yy'
    };
    return locales[locale] || locales['pt-br'];
  }
}