import { Component } from '@angular/core';
import { AuthService } from "./auth.service";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  templateUrl: 'login.component.html',

})
export class LoginComponent {
  isLoading = false;
  errorMessage = null;
  form = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.route.queryParams.subscribe((params)=>{
      if(params['expired']){
        this.errorMessage = 'Sua sessão expirou, faça login novamente.';
      }
    });
  }

  public submitLogin(form: FormControl) {
    if (form.valid) {
      this.isLoading = true;
      this.auth.login(this.form.username, this.form.password)
        .then(() => {
            this.errorMessage = null;
            this.isLoading = false;
            this.router.navigate(['/dashboard']).then((e) => console.log(e)).catch((e) => console.log(e));
          }
        )
        .catch((error) => {
          console.error(error);
          if (error.status === 400) {
            this.errorMessage = 'Suas credenciais estão incorretas. Tente novamente ou redefina sua senha.';
          } else {
            this.errorMessage = `Ocorreu um erro inesperado, tente novamente mais tarde. [Cod.: ${error.status || 0}]`;
          }
          this.isLoading = false;
        })
    }
  }

}
