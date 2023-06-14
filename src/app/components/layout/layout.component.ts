import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { takeWhile } from 'rxjs';
import { PagesMockService } from 'src/app/services/pages-mock.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  menu: NbMenuItem[] = [];
  alive: boolean = true;

  constructor(
    private pageService: PagesMockService
  ) {
    this.initMenu();
  }

  initMenu() {
    this.pageService.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      })
  }
}
