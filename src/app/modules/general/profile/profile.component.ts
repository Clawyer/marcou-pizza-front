import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  profileData: any = [];
  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
     this.userService.getUserBoard().subscribe({
       next: (data : any) => {
         console.log(data.data);
         this.profileData = JSON.stringify(data.data);
       },
       error: (err : any) => {
         this.profileData = JSON.parse(err.error).message;
       },
     });
  }
}
