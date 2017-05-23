import { Component } from '@angular/core';

@Component({
  selector: 'error-card-block',
  template: `
      <div class="card-block">
          <list-errors
                  [errors]="['Desculpe, ocorreu um erro. Tente novamente mais tarde.']">
          </list-errors>
      </div>
  `
})
export class ErrorCardBlockComponent {

  constructor() {
  }

}
