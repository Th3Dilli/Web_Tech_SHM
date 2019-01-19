import { Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
 
  // ngif bug undefined, view child update the property if dom change
  @ViewChild('sidenav') sidenav;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  isLoggedIn$: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.userLoggedIn;
  }

  logout(){
    this.authService.logout();
    this.snackBar.open('Successfully Logged Out',"Okay", {duration : 3000});
  }


}
