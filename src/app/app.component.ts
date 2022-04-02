import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageTitleService } from '@core/page-title/service/page-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public defaultTitle: string = 'Projex';
  public projectsTitle: string = $localize`:@@menuItemProjects:`;

  constructor(private pageTitle: PageTitleService) {
    this.pageTitle.setTitle(this.defaultTitle);
    this.pageTitle.attachRoute(this.defaultTitle);
  }
}
