import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  content: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: (data) => {
        console.log(data.data)
        // this.content = JSON.stringify(data.data);
      },
      error: (err) => {
        this.content = JSON.parse(err.error).message;
      },
    });
  }
}