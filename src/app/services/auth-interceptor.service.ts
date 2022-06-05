import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    token: string | null = null;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem("token");
        if(this.token){
            req = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.token)
            })
        }
        return next.handle(req);
    }

}