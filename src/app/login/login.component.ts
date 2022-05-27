import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { ErrorHandler } from '../services/error-handler.service';
import { HTTPService } from '../services/http.service';
import { RouterService } from '../services/router.service';
import { User } from './user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("userForm",{static:false}) userForm!: NgForm

  isInProgress : boolean = false
  loginError : any | undefined
  subscriptions: Subscription[] = []

  constructor(private httpService: HTTPService, 
              private routerService: RouterService,
              private errorHandler: ErrorHandler) {}

  ngOnInit() {
    const token = localStorage.getItem("token");
    if(token){
      this.httpService.get("checkToken").subscribe(data =>{
        this.routerService.routeTo("home");
      }, err => {
        this.errorHandler.handleError(err);
      })
    }
  }

  onSubmit(){  
    const user: User = this.userForm.value;
    this.httpService.post("login", user).subscribe(data => {
      if(data.status == 200){

        localStorage.setItem("token", data.msg.token)
        localStorage.setItem("userName", data.msg.userName)

        this.routerService.routeTo("home");
      }else{
        console.log("onSubmit => else")
      }
    }, err => {
      this.errorHandler.handleError(err);
    })
 }

}
