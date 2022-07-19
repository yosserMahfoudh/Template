import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@modules/auth/services';




const baseURL = 'http://localhost:3001/entreprises';
@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {


  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  readAll(): Observable<any> {
    return this.httpClient.get(baseURL+'/list');
  }

  read(id: any): Observable<any> {
    return this.httpClient.get(`${baseURL}/${id}`);
  }

  create(data: any): Observable<any> {
    const headers = new HttpHeaders({
        "Authorization": "" + localStorage.getItem("token")
      });
      console.log( headers)    //headers: new HttpHeaders()
    return this.httpClient.post(baseURL+'/create', data, {headers});
  }

  updatee(data: any): Observable<any> {
    const headers = new HttpHeaders({
        "Authorization": "" + localStorage.getItem("token")
      });
      console.log( headers)    //headers: new HttpHeaders()
    return this.httpClient.post(baseURL+'/create', data, {headers});
  }

  update( data: any, id: any) {
   console.log(data);
   console.log(id);
   const headers = new HttpHeaders({
    "Authorization": "" + localStorage.getItem("token")
  });
return this.httpClient.put(`${baseURL}/${id}` + "/update", data,  {headers});
  }

  delete(id: any): Observable<any> {
    const headers = new HttpHeaders({
        "Authorization": "" + localStorage.getItem("token")
      });
    return this.httpClient.delete(`${baseURL}/${id}` +"/delete", {headers});
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseURL);
  }

  searchByName(name: any): Observable<any> {
    return this.httpClient.get(`${baseURL}?name=${name}`);
  }
}
