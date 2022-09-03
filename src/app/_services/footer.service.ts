import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, delay, filter, Observable, Subject } from 'rxjs';
import { footerBtn } from '../_models/footerBtns';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  filterButtons = {
    home: { text: 'home', icon: 'home.svg', isClicked: true, path: '' },
    search: { text: 'search', icon: 'search.svg', isClicked: false },
    account: {
      text: 'account',
      icon: 'user.svg',
      isClicked: false,
      path: '',
    },
    cart: { text: 'cart', icon: 'cart.svg', isClicked: false, path: 'cart' },
  };
  private buttons = new BehaviorSubject<footerBtn>(this.filterButtons);
  public buttonsListener = this.buttons.asObservable();

  private loggedIn: boolean = false;
  public loggedInListener = this.authService.loggedInListener;
  private accountRoutes = ['profile', 'login', 'admin', 'signup'];
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) {
    this.loggedInListener.subscribe((event: any) => (this.loggedIn = event));
    console.log(this.loggedIn);
    this.filterButtons.account.path += this.loggedIn ? '/profile' : '/login';
    this.changeData(this.filterButtons);
    this.router.events
      .pipe(
        delay(10),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        let url = event.url.split('/')[1];
        console.log('url', url);
        if (this.accountRoutes.includes(url)) {
          this.setActive('account');
        }
        if (url === '') {
          this.setActive('home');
        }
        if (url !== '' && !this.accountRoutes.includes(url)) {
          this.setActive(url);
        }
      });
  }

  changeData(data: footerBtn) {
    this.buttons.next(data);
  }
  getBtns() {
    return this.buttons.getValue();
  }

  setActive(str: string): void {
    for (const key in this.filterButtons) {
      this.filterButtons[key as keyof footerBtn].isClicked = false;
    }
    this.filterButtons[str as keyof footerBtn].isClicked = true;
    this.changeData(this.filterButtons);
  }
}
