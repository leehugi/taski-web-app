import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RouterService } from "./router.service";
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class ErrorHandler{

    constructor(private routerService: RouterService,
                private toastr: ToastrService) { }
    
    handleError(error: HttpErrorResponse){
        switch (error.status) {
            case 500:
                this.toastr.error("500", error.error)
                break;
            case 404:
                // TODO: handle 404
                // this.router.navigateByUrl('/not-found');
                break;
            case 401:
                this.logout();
                break;
            case 400:
                this.toastr.error("400", error.error);
                break;
            default:
                break;
        }
    }

    logout(){
        this.routerService.routeTo("");
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
    }
}
