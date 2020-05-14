
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class UserService implements OnInit {
  userValue: BehaviorSubject<any>;
  cUser: BehaviorSubject<any>;
  loggedUser: any;
  permissions: any[];
  constructor() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userValue = new BehaviorSubject<any>(this.loggedUser);
    this.cUser = new BehaviorSubject<any>(null);
    if (this.loggedUser !== undefined && this.loggedUser !== null) {
      this.permissions = this.loggedUser.data.permissions;
    }
  }

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    // this.user = JSON.parse(localStorage.getItem('currentUser'));

  }

  getUser(): Observable<any> {
    // this.loggedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // return this.loggedUser.data.name;
    return this.userValue.asObservable();
  }

  getCustomUser(): Observable<any> {
    return this.cUser.asObservable();
  }

  getUserName(): string {
    this.loggedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.loggedUser.data.user.first_name;
  }

  getUsserId(): number {
    this.loggedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.loggedUser.data.user.id;
  }

  getRole(): string {
    return this.loggedUser.data.role;
  }

  hasPermission(level: string, permission: string): boolean {
    if (this.permissions !== undefined && this.permissions.length > 0) {
      const p = this.permissions[level];
      if (p !== undefined && p.length > 0) {
        if (p[permission] !== undefined && p[permission] !== '') {
          return true;
        }
      }
    }
    return false;
  }

  public set user(u: any) {
    this.loggedUser = u;
    this.userValue.next(u);
  }
  public set customUser(u: any) {
    this.cUser.next(u);
  }
}
