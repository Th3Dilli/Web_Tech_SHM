import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, MatSlideToggleModule,
    MatIconModule, MatListModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatTabsModule, MatGridListModule],

  exports: [MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, MatSlideToggleModule,
     MatIconModule, MatListModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatTabsModule, MatGridListModule],
})

export class Material { }