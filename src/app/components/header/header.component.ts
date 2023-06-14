import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private sidebarService: NbSidebarService,
  ) {}

  toggleSidebar() {
    console.log('toggle');
    this.sidebarService.toggle(true, 'menu-sidebar');
  }
  navigateHome() {
    console.log('home');
  }
}
