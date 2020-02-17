import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

/**
 * Comment for module 'material-module.ts'
 *  Importing all necessary Material Modules API References for Material
 *  https://material.angular.io
 *
 * @author Markus Macher
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

