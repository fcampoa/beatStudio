import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ElementRef, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Cliente } from 'src/app/model/cliente';

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

  @Output() login: EventEmitter<boolean>;

  public sections = [
    { nombre: 'ABOUT', url: 'dashboard/about' },
    {
      nombre: 'CLASES', url: 'dashboard/disciplines', sublinks: [
        { name: 'SPIN', url: 'dashboard/disciplines/beatspin' },
        { name: 'BARRE', url: 'dashboard/disciplines/beatbarre' },
        { name: 'YOGA', url: 'dashboard/disciplines/beatyoga' },
        { name: 'POWER', url: 'dashboard/disciplines/beatpower' }]
    },
    { nombre: 'COACHES', url: 'dashboard/coach' },
    // { nombre: 'ONLINE WORKOUTS', url: '' },
    { nombre: 'CONTACTO', url: 'dashboard/contact' }
  ];

  // Inputs
  @Input() set isLogged(value: any) {
    this.logged = value !== undefined || value !== null;
  }


  constructor(location: Location,
    private element: ElementRef,
    private router: Router,
    private userSvc: UserService,
    private auth: AuthenticationService
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
  }

  goToProfile(): void {
    this.router.navigate(['dashboard/panel']);
  }

  navigate(s: string): void {
    console.log(s);

    if (s.indexOf('dashboard') < 0) {
      this.scroll(s);
    } else {
      window.scroll(0, 0);
      this.router.navigate([s]);
    }
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
}
