import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorHandler } from '../services/error-handler.service';
import { RouterService } from '../services/router.service';
import { UserNameService } from '../services/user-name.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private routerService: RouterService,
              private errorHandler: ErrorHandler,
              public userNameService: UserNameService) { }

  ngOnInit(): void {}

  logout(){
    this.userNameService.loggedInUser = null;
    this.errorHandler.logout();
  }

}
