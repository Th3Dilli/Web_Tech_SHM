import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * Comment for module 'error.inceptor.ts'.
 * Intercepts all 401 Unauthorized errors.
 * the user getting logged out if a 401 status response occurs.
 * @author Markus Macher
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
            // Backend says token is invalid, logout the user
                this._authService.logoutAuthenticationError();
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
