import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { MatAccordion } from '@angular/material/expansion';

const address = {
  addressLine1: 'string',
  addressLine2: 'string',
  city: 'string',
  zip: '',
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion();
  currentUser: any;
  profileData: any = [];
  profileDisplay: any = [];
  userAddresses: any = [];
  isLoading: boolean = true;

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.currentUser = this.tokenStorage.getUser();
    this.userService.getUserBoard().subscribe({
      next: (data: any) => {
        this.profileData = {
          Email: data.email,
          Prénom: data.firstName,
          Nom: data.lastName,
          Téléphone: data.phone,
          Sexe: data.gender === 'male' ? 'Homme' : 'Femme',
        };
        console.log(this.profileData);
      },
      error: (err: any) => {
        this.profileData = JSON.parse(err.error).message;
      },
    });
    this.userService.getUserAddresses().subscribe({
      next: (data: any) => {
        const addresses = data.addresses.filter((address: any) => address._id);
        this.userAddresses.push(addresses.map((address: any) => address._id));
        this.userAddresses = this.userAddresses.flat();
        Object.keys(this.userAddresses).forEach((key) => {
          if (this.userAddresses[key].addressLine2 === '') {
            this.profileDisplay.push({
              Rue: this.userAddresses[key].addressLine1,
              Ville: this.userAddresses[key].city,
              'Code Postal': this.userAddresses[key].zip,
            });
          } else {
            this.profileDisplay.push({
              Rue: this.userAddresses[key].addressLine1,
              "Complément d'adresse": this.userAddresses[key].addressLine2,
              Ville: this.userAddresses[key].city,
              'Code Postal': this.userAddresses[key].zip,
            });
          }
        });
      },
      error: (err: any) => {
        this.profileData = JSON.parse(err.error).message;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
