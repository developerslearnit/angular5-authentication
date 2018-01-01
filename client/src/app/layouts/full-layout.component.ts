import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'app/services/sessionstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled = false;
  public status: { isopen: boolean } = { isopen: false };

  constructor(private authSrv: AuthService,private router: Router,
    private sessionStorage: SessionStorageService) {

  }

  checkRoles(acceptedArr, incomingArr): boolean {
    
    return incomingArr.some(v => acceptedArr.includes(v));
  }

  userInRole(roles: any[]):boolean {
    var userRoles = this.sessionStorage.getLoggedInUser();
    // console.log("userRoles",userRoles.role);
    return this.checkRoles(roles, userRoles.role);
  }

  public toggled(open: boolean): void {
    
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void { }

  logout() {
    this.sessionStorage.logOut();
    this.router.navigate(['/auth/login']);
  }
}
