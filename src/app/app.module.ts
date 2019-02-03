import { BrowserModule } from '@angular/platform-browser';
import { Material } from './material-module';
import { AuthService } from './auth.service';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DevicesComponent } from './devices/devices.component';
import { HomeComponent } from './home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DeviceService } from './services/device.service';
import { DeviceDetailComponent } from './devices/device/device-detail/device-detail.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.inceptor';
import { ErrorInterceptor } from './error.inceptor';
import { FilterPipe } from './filter.pipe';
import { UserComponent } from './user/user.component';
import { DeviceComponent } from './devices/device/device.component';
import { Sonoff4chComponent } from './devices/device/type/sonoff4ch/sonoff4ch.component';
import { SonoffbasicComponent } from './devices/device/type/sonoffbasic/sonoffbasic.component';
import { TypeDirective } from './devices/device/type.directive';
import { NotFoundComponent } from './not-found/not-found.component';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DevicesComponent,
    LoginComponent,
    HomeComponent,
    DeviceDetailComponent,
    FilterPipe,
    UserComponent,
    DeviceComponent,
    Sonoff4chComponent,
    SonoffbasicComponent,
    TypeDirective,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    Material,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/login']
      }
    })

  ],
  providers: [AuthService, AuthGuard, DeviceService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ Sonoff4chComponent, SonoffbasicComponent ]
})
export class AppModule { }
