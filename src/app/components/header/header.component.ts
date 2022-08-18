import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'MARCOU PIZZAS';
  subtitle: string = '05 63 62 85 86';
  filterButtons = [
    { text: 'home', icon: 'home.svg', isClicked: true },
    { text: 'search', icon: 'search.svg', isClicked: false},
    { text: 'account', icon: 'user.svg', isClicked: false },
    { text: 'cart', icon: 'cart.svg', isClicked: false },
  ];
  isClicked: boolean = false;

  setActive(button: any): void {
    for (let but of this.filterButtons) {
      but.isClicked = false;
      this.isClicked = false
    }
    if (button.text === 'search') this.isClicked = !this.isClicked;
    button.isClicked = true;
  }
  constructor() {}

  ngOnInit(): void {}
}
