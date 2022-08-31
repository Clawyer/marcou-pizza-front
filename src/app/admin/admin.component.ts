import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  content: string = 'admin content';
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: (data) => {
        console.log(data.data)
        // this.content = data;
      },
      error: (err) => {
        this.content = JSON.parse(err.error).message;
      },
    });
  }
}
