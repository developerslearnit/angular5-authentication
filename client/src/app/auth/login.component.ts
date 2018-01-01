import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import {JwtHelper} from 'angular2-jwt';
import swal from 'sweetalert2';
import { SessionStorageService } from 'app/services/sessionstorage.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  showRegister: boolean = false;
  jwtHelper: JwtHelper = new JwtHelper();
  data: any = {};
  constructor(private router: Router, private authSrv: AuthService,private sessionStorage:SessionStorageService) {
    this.showRegister = false;
  }

  register() {
    this.router.navigate(['/auth/register']);
  }

  onloginClicked(): void {
    this.loginUser();
  }

  loginUser() {
    let body = {
      username: this.data.username,
      password: this.data.password,
      grant_type:'password'
    };

    this.authSrv.signIn(body).subscribe((res) => {
      
      this.authSrv.getUserRoles(res.access_token).subscribe((user)=>{      
        this.sessionStorage.setLoggedInUser(user);
        this.router.navigate(['/dashboard']);
      });
      
    }, (err) => {
      swal(
        'Oops...',
        err.message + '!',
        'error'
      )
    })


    
    
  //  useJwtHelper() {
  //    var token = localStorage.getItem('token');
    
  //    console.log(
  //      ,
  //      this.jwtHelper.getTokenExpirationDate(token),
  //      this.jwtHelper.isTokenExpired(token)
  //    );
  //  }

    // firebase.auth().signInWithEmailAndPassword(body.email, body.password).then((res) => {

    // }, (err) => {
    //   alert(err.message);
    //   //console.log("ERR",JSON.stringify(err,null,3));
    // });


  }

}
