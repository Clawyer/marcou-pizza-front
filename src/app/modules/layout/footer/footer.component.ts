import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, take, delay, filter } from 'rxjs';
import { footerBtn } from 'src/app/_models/footerBtns';
import { FooterService } from 'src/app/_services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public filterButtons: footerBtn = this.changeService.getBtns();
  buttons: any[] = [];
  public buttons$: Observable<footerBtn> | undefined;
  url: string = '';
  currentRoute: string = '';

  constructor(private changeService: FooterService, private router: Router) {
    // this.searchClick = changeService.searchClick.value;
    Object.entries(this.filterButtons).forEach(([key, value]) => {
      this.buttons.push(value);
    });
    // this.changeService.setActive(this.router.url);
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
  setActive(btn: string) {
    console.log(btn);

    this.changeService.setActive(btn);

    this.changeService.buttonsListener
      .pipe(take(1))
      .subscribe((data) => (this.filterButtons = data));
  }
  ngOnInit(): void {
    this.buttons$ = this.changeService.buttonsListener;
    console.log(this.buttons);
  }
}
