import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

     constructor() { }

     setLoggedInUser(user) {

          window.localStorage.setItem("loggedInUser", JSON.stringify({
               role: user.roles,
               name: user.name
          }));
     }

     getLoggedInUser() {
          if (window.localStorage.getItem("loggedInUser")) {
               return JSON.parse(window.localStorage.getItem("loggedInUser"));
          } else {
               return null;
          }
     }

     logOut(){
          window.localStorage.removeItem("loggedInUser");
     }
}