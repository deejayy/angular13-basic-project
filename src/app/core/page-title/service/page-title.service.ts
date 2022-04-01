import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageTitleFacade } from '@core/page-title/store/page-title.facade';
import { filter, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageTitleService {
  public pageTitle$: Observable<string> = this.pageTitleFacade.title$;

  constructor(private pageTitleFacade: PageTitleFacade, private router: Router) {}

  public setTitle(title: string) {
    this.pageTitleFacade.setTitle(title);
  }

  public attachRoute(defaultTitle: string) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data['pageTitle'] || defaultTitle;
        }),
      )
      .subscribe((title: string) => {
        if (title) {
          this.setTitle(title);
        }
      });
  }
}
