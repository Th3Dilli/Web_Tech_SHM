import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { LoginComponent } from './login/login.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from './auth.guard';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: LoginComponent, children: [
      {path: 'login', component: LoginComponent  }
    ]
  },
{path:'devices', component: DevicesComponent, canActivate: [AuthGuard] },
{path:'home', component: HomeComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
