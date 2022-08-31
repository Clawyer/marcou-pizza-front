import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'MARCOU PIZZAS';
  subtitle: string = '05 63 62 85 86';
  searchClick: boolean;
  constructor(private changeService: FooterService) {
    this.searchClick = changeService.searchClick.value;
  }

  ngOnInit(): void {
    console.log(this.searchClick);
  }
}
