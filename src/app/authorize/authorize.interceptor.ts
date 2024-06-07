import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizeService } from './authorize.service';

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthorizeService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessData = this.authSvc.getAccessData();
    if (!accessData) return next.handle(request);

    const newReq = request.clone({
      headers: request.headers.append(
        'Authorization',
        `${accessData.accessToken}`
      ),
    });

    return next.handle(newReq);
  }
}
