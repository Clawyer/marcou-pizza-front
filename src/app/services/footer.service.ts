import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  constructor() {}

  public searchClick: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  searchClicked(value: boolean) {
    this.searchClick.next(value);
  }
}
