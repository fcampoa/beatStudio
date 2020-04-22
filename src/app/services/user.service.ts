import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class UserService implements OnInit {
  loggedUser: any;
  permissions: any[];
  constructor() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.loggedUser !== undefined && this.loggedUser !== null) {
    this.permissions = this.loggedUser.data.permissions;
    }
  }

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));

  }

  getUser(): string {
    this.loggedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.loggedUser.data.name;
  }

  getUsserId(): number {
    this.loggedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.loggedUser.data.id;
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

  set user(u: any) {
    this.loggedUser = u;
  }
}
