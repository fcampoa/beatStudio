
import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    level: string;
    name: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', level: 'dashb', name: 'viewAll' },
    { path: '/report/view', title: 'Reportes', icon: 'nc-single-copy-04', class: '', level: 'dashb', name: 'viewAll' },
    { path: '/employee/userList', title: 'Usuarios', icon: 'nc-circle-10', class: '', level: 'user', name: 'viewAll' },
    { path: '/employee/list', title: 'Empleados', icon: 'nc-badge', class: '', level: 'employee', name: 'viewAll' },
    { path: '/employee/schedule/list', title: 'Horario', icon: 'nc-badge', class: '', level: 'schedule', name: 'viewAll' },
    { path: '/teamsList', title: 'Equipos', icon: 'nc-single-02', class: '', level: 'team', name: 'viewAll' },
    { path: '/machine/list', title: 'Maquinas', icon: 'nc-settings-gear-65', class: '', level: 'machine', name: 'viewAll' },
    { path: '/typography', title: 'Metas', icon: 'nc-caps-small', class: '', level: 'dashb', name: 'viewAll' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon: 'nc-spaceship',  class: 'active-pro' },
    // { path: '/test',          title: 'Test form',         icon: 'nc-spaceship', class: ''}
    // { path: '/report', title: 'Reporte', icon: 'nc-caps-small', class: '', level: 'dashb', name: 'viewAll' },
];

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public user: string;
    public role: string;


    constructor() {
       // this.user = this.userService.getUser();
       // this.role = this.userService.getRole();
    }
    validatepermison(level, name) {
        return true;
      //  return this.userService.hasPermission(level, name);
    }
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    get userName(): string {
        return this.user;
    }

    get roleName(): string {
        return this.role;
    }
}
