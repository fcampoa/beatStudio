import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location} from '@angular/common';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    private logged = false;

    public isCollapsed = true;
    @ViewChild('navbar-cmp') button;

    constructor(location: Location, private renderer: Renderer2, private element: ElementRef, private router: Router,
               // private auth: AuthenticationService
                ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        // tslint:disable-next-line: prefer-const
        let navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
    }
    getTitle(){
      let titlee = this.location.prepareExternalUrl(this.location.path());
      if (titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      // tslint:disable-next-line: prefer-for-of
      for (let item = 0; item < this.listTitles.length; item++){
          if (this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Accesos Rápidos';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =   document.getElementsByClassName('main-panel')[0] as HTMLElement;
          // tslint:disable-next-line: only-arrow-functions
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      }
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =   document.getElementsByClassName('main-panel')[0] as HTMLElement;
          if (window.innerWidth < 991) {
            // tslint:disable-next-line: only-arrow-functions
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      }
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }

      logout(): void {
       // this.auth.logout();
      }

}
