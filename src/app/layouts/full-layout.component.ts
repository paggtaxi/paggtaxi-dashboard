import { AuthService } from "../auth/auth.service";
import { ToasterConfig } from "angular2-toaster";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      preventDuplicates: true,
      showCloseButton: false,
      newestOnTop: true,
      mouseoverTimerStop: true,
      positionClass: 'toast-top-center'
    });

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
  }
}
