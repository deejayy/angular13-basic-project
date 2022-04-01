import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageTitleService } from '@core/page-title/service/page-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public defaultTitle: string = 'Projex';

  constructor(private pageTitle: PageTitleService, private router: Router) {
    this.pageTitle.setTitle(this.defaultTitle);
    this.pageTitle.attachRoute(this.defaultTitle);
  }
}
