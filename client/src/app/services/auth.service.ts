
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
     constructor(private http: Http) { }


     signIn(userParams) {
        let bodyObj = `username=${userParams.username}&password=${userParams.password}&grant_type=${userParams.grant_type}`;
         console.log("bodyObj",bodyObj);
         let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
         let options = new RequestOptions({ headers: headers });
  
          return this.http.post("http://localhost:54977/api/auth/token",bodyObj,options)
              .map((res: Response) => res.json());
      }

      getUserRoles(token){
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get("http://localhost:54977/api/user/roles", options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable
                .throw(error.json().error || 'Server error'));
      }
     
}