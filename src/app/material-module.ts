import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

/*Comment for module 'material-module.ts'
 *Importing all necessary Material Modules API References for Material
 *https://material.angular.io
*/

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule,
    MatSlideToggleModule, MatTableModule, MatExpansionModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatInputModule, MatFormFieldModule,
    MatSnackBarModule, MatTabsModule, MatGridListModule, MatSelectModule
  ],

  exports: [MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule,
    MatSlideToggleModule, MatTableModule, MatExpansionModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatInputModule, MatFormFieldModule, MatSnackBarModule,
    MatTabsModule, MatGridListModule, MatSelectModule
  ],
})

// export material module class and import it in app.module.ts
export class Material {}

