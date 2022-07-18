import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Moment, fn, utc as moment } from 'moment/moment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

 //payLoad = JSON.parse(window.atob(localStorage.getItem('token')));
 userId = localStorage.getItem("user") ;
      token : string="";
      isAuth$ = new BehaviorSubject<boolean>(false);
        UserFullName : any
        UserN : any

    constructor(private fb: FormBuilder,  private http: HttpClient,private router: Router) {}
    readonly BaseURI = 'http://localhost:3001';
    formModel = this.fb.group({

        email: ['', Validators.email],
        Passwords: this.fb.group({
          Password: ['', [ Validators.minLength(2)]]}

        )

      });
    login(formData: any) {

        return this.http.post(this.BaseURI +'/auth/login', formData).subscribe(
            (res: any) => {
              this.token=res.token;
              console.log(this.token);
              this.userId=res.user;
              console.log(this.userId);
              localStorage.setItem('token', res.token);
              localStorage.setItem("user", res.data._id);
              // Retrieving data:
              let text = JSON.stringify(res);
             let obj = JSON.parse(text);
              this.router.navigateByUrl('/entreprise');
            }
          );
      }

    roleMatch(allowedRoles: any): boolean {
        var isMatch = false;
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
        var userRole = payLoad.role;
        var userid = payLoad.UserID;
        this.userId=userid
        this.UserFullName=payLoad.FullName
        this.UserN=payLoad.UserName
        allowedRoles.forEach((element: any) => {
          if (userRole == element) {
            isMatch = true;
            return false;
          }
        });
        return isMatch;
      }




      /*

    setLocalStorage(responseObj:any) {

        // Adds the expiration time defined on the JWT to the current moment
        const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');
        localStorage.setItem('id', responseObj._id)
        localStorage.setItem('id_token', responseObj.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("user");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration(), "second");
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if (expiration) {
            const expiresAt = JSON.parse(expiration);
            return moment(expiresAt);
        } else {
            return moment();
        }
    }*/
}
