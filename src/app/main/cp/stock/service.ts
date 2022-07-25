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
    listing(params): Observable<any> {

        const httpOptions = {};
        httpOptions['params'] = params;

        return this.http.get<any>('/cp/stock', httpOptions);
    }

    delete(id:number = 0): Observable<any> {
        return this.http.delete('/cp/stock/'+id, this.httpOptions);
    }
    action(uri: String = ""): Observable<any> {
        return this.http
            .post('/cp/stock/'+uri, {});
    } 

   

   
}
