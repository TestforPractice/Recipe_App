import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authSerice:AuthService){}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return this.authSerice.user.pipe(take(1),exhaustMap(user=>{
        if(!user){
            return next.handle(req);
        }
        const modifiedReq=req.clone({params:new HttpParams().set('auth',user.token)})
        return next.handle(modifiedReq);
       }));
       
   }//take(1) will take one instance and then unsubscribe the observable, exhausmap is used to replace with new observable  
}