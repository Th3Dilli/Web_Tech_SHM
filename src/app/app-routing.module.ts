/**
 * Angular routes
 *
 * @author Markus Macher
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { DeviceDetailComponent } from './devices/device/device-detail/device-detail.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: LoginComponent, children: [
      {path: 'login', component: LoginComponent  }
    ]
  },
{path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
{path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
{path: 'detail', component: DeviceDetailComponent, canActivate: [AuthGuard]},
{path: 'user', component: UserComponent, canActivate: [AuthGuard]},
{path: '**', component: NotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
