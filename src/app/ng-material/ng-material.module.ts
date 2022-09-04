import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarConfig, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarComponent } from '../modules/layout/ng-material/snack-bar/snack-bar.component';

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  verticalPosition: 'top',
  horizontalPosition: 'right',
  duration: 2500,
};

@NgModule({
  declarations: [SnackbarComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatRadioModule,
    NgxMatIntlTelInputComponent,
    MatStepperModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatRadioModule,
    NgxMatIntlTelInputComponent,
    MatStepperModule,
    MatProgressSpinnerModule,
    SnackbarComponent,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: matSnackbarDefaultConfig,
    },
  ],
  entryComponents: [SnackbarComponent],
})
export class NgMaterialModule {}
