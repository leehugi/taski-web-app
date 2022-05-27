import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from '../services/error-handler.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private routerService: RouterService,
              private errorHandler: ErrorHandler) { }

  ngOnInit(): void {
  }

  logout(){
    this.errorHandler.logout();
  }

}
