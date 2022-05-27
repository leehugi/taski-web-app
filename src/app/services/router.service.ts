import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class RouterService {

    constructor(private router: Router, private route: ActivatedRoute){}

    routeTo(address: string) {
        this.router.navigate([address], {relativeTo: this.route});
    }
}