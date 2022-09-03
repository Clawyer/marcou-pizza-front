import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { footerBtn } from 'src/app/_models/footerBtns';
import { FooterService } from 'src/app/_services/footer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'MARCOU PIZZAS';
  subtitle: string = '05 63 62 85 86';
  data: any;
  public searchClick: boolean | undefined;
  public buttons: Observable<footerBtn> | undefined;

  constructor(
    private changeService: FooterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  goBack(): void {
    this.router.navigateByUrl('/account');
  }
  ngOnInit(): void {

    this.buttons = this.changeService.buttonsListener;
    this.buttons.subscribe((value) => {
      this.searchClick = value['search'].isClicked;
    });
  }
}
