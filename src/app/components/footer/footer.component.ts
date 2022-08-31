import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  filterButtons = [
    { text: '', icon: 'home.svg', isClicked: true },
    { text: 'search', icon: 'search.svg', isClicked: false },
    { text: 'account', icon: 'user.svg', isClicked: false },
    { text: 'cart', icon: 'cart.svg', isClicked: false },
  ];
  searchClick: boolean;
  setActive(button: any): void {
    for (let but of this.filterButtons) {
      but.isClicked = false;
      this.changeService.searchClicked(!this.searchClick);
    }
    if (button.text === 'search') {
      this.changeService.searchClicked(!this.searchClick);
    }
    button.isClicked = true;
  }
  constructor(private changeService: FooterService) {
    this.searchClick = changeService.searchClick.value;
  }

  ngOnInit(): void {}
}
