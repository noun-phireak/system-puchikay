import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Service {


    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json',
            'withCredentials': 'true',
        })
    };

    constructor(private http: HttpClient) { }

    
    //==================================================================================>> Listing
    dashboard(): Observable<any> {

        const httpOptions = {};
        //httpOptions['params'] = params;

        return this.http.get<any>('/cp/dashboard', httpOptions);
    }

    recentOrder(): Observable<any> {
        const httpOptions = {};

        return this.http.get<any>('/cp/recently-order', httpOptions);
    }

    graph(){
        const httpOptions ={};
        return this.http.get<any>('/cp/graph', httpOptions);
    }

   
}
