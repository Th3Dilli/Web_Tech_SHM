import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Comment for module 'jwt.interceptor.ts'.
 * Comment for method 'intercept()'
 * Intercepts any HTTP requests and adds an Authorization header with the JWT-Token to the request header.
 * for identifying the logged in user on the backend.
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth_service: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth_service.getToken()}`
            }
        });

        return next.handle(request);
    }

}
