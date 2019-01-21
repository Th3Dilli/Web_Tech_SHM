import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, 
    MatSlideToggleModule, MatTableModule, MatExpansionModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatInputModule, MatFormFieldModule, 
    MatSnackBarModule, MatTabsModule, MatGridListModule
  ],

  exports: [MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, 
    MatSlideToggleModule, MatTableModule, MatExpansionModule, MatProgressSpinnerModule,
     MatIconModule, MatListModule, MatInputModule, MatFormFieldModule, MatSnackBarModule,
      MatTabsModule, MatGridListModule
  ],
})
 
export class Material { }