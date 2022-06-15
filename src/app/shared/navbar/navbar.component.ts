import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ElementRef, Input, OnDestroy, EventEmitter, Output, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Cliente } from 'src/app/model/cliente';
import { ChangePasswordComponent } from 'src/app/components/profile/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {

  location: Location;
  public isCollapsed = true;
  public logged = false;
  public user: any;
  public name = '';
  public cliente: Cliente;
  mySubscription: any;
  open = false;

  @Output() login: EventEmitter<boolean>;

  public sections = [
    { nombre: 'ABOUT', url: '/about' },
    {
      nombre: 'CLASES', url: '/disciplines', sublinks: [
        { name: 'SPIN', url: '/disciplines/beatspin' },
        { name: 'BARRE', url: '/disciplines/beatbarre' },
       // { name: 'YOGA', url: '/disciplines/beatyoga' },
        { name: 'POWER', url: '/disciplines/beatpower' }]
    },
    { nombre: 'COACHES', url: '/coaches' },
    // { nombre: 'ONLINE WORKOUTS', url: '' },
    { nombre: 'CONTACTO', url: '/contact' }
  ];

  // Inputs
  @Input() set isLogged(value: any) {
    this.logged = value !== undefined || value !== null;
  }


  constructor(location: Location,
    private element: ElementRef,
    private router: Router,
    private userSvc: UserService,
    private auth: AuthenticationService,
    private eRef: ElementRef,
    public dialog: MatDialog
  ) {
    this.location = location;
    this.login = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.name = '';
    this.userSvc.getUser().subscribe(res => {
      if (res !== undefined && res !== null && (this.cliente === undefined || this.cliente === null)) {
        this.user = res.data.user;
        this.name = this.user.first_name;
      }
      this.logged = (res !== undefined && res !== null);
      if ((res !== undefined && res !== null)) {
        this.closeSideBar();
      }
    });
    this.userSvc.getCustomUser().subscribe(
      cu => {
        if (cu !== null) {
          this.cliente = cu;
          this.name = cu.nombre;
        }
      }
    );
  }

  ngOnDestroy(): void {
  }

  logout(): void {
    this.auth.logout();
    this.closeSideBar();
  }

  goToProfile(): void {
    this.router.navigate(['/panel']);
  }

  navigate(s: string): void {
    window.scroll(0, 0);
      this.router.navigate([`/${s}`]);
  }

  scroll(url: string): void {
    const s: HTMLElement = document.getElementById(url);
    if (s !== null && s !== undefined) {
      s.scrollIntoView();
    }
  }

  checkLogin($event): void {
    this.login.emit($event);
  }

  openCustomPopover(): void {
    let popover = document.getElementById('custom-popover');
    popover.style.display = 'block';
  }


  openSideBar(): void {
    const sidebar = document.getElementById("mySidebar");
    if (sidebar.style.right === '-300px' || sidebar.style.right === '') {
      sidebar.style.right = "0px";
    } else {
      sidebar.style.right = "-300px";

    }
    // const sidebar = document.getElementById('sidebar');
    // if (sidebar.style.right === '' || sidebar.style.right === '-300px') {
    //   document.getElementById('sidebar-close').style.width = 'calc(100% - 300px)';
    //   sidebar.style.right = '0';
    //   this.open = true;
    // } else {
    //   document.getElementById('sidebar-close').style.width = '0';
    //   sidebar.style.right = '-300px';
    //   this.open = false;
    // }

  }

  closeSideBar() {
    const el = document.getElementById("mySidebar");
    if (el !== undefined && el !== null){
    document.getElementById("mySidebar").style.right = "-300px";
    }

    // if (this.open === true) {
    //   const sidebar = document.getElementById('sidebar');
    //   document.getElementById('sidebar-close').style.width = '0';
    //   sidebar.style.right = '-300px';
    //   this.open = false;
    // }

  }

  expandDisciplines(): void {
    var panel = document.getElementById('disciplines-list');
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  openLoginSidebar(): void {
    var panel = document.getElementById('sidebar-login');
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  openLogoutSidebar(): void {
    var panel = document.getElementById('sidebar-login');
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  cambiarPass() {
    this.openSideBar();
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      panelClass: 'custom-modalbox-info',
      data: { mail: this.user.email }
    });
  }
}
