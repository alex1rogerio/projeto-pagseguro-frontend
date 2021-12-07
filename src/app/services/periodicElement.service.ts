import { PeriodicElement } from './../models/PeriodicElement';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

 @Injectable()
 export class PeriodicElementService{
   elementApiUrl = 'http://localhost:8090/dadosBancarios';
   constructor(private http: HttpClient){}

   getElements(): Observable<PeriodicElement[]>{
    return this.http.get<PeriodicElement[]>(this.elementApiUrl);
   }
   createElements(element:PeriodicElement):Observable<PeriodicElement>{
     return this.http.post<PeriodicElement>(this.elementApiUrl,element);
   }
   editElements(element:PeriodicElement):Observable<PeriodicElement>{
    return this.http.put<PeriodicElement>(`${this.elementApiUrl}/${element.id}`,element);
  }
  deleteElements(id:number):Observable<any>{
    return this.http.delete<any>(`${this.elementApiUrl}/${id}`);
  }
 }
