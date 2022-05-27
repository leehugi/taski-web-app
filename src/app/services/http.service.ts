import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({ providedIn: 'root' })
export class HTTPService {
    basicUrl = "http://localhost:1000/";

    constructor(private http: HttpClient){}

    post(address: string, postData: any): Observable<any> {
        return this.http.post(this.basicUrl + address, postData);
    }

    get(address: string): Observable<any> {
        return this.http.get(this.basicUrl + address);
    }
}