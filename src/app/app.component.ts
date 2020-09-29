import { DomSanitizer } from '@angular/platform-browser';
import { Component, HostListener } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Router, Event } from '@angular/router'

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beatStudio'; public loading = false;

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private router: Router) {
    this.matIconRegistry
      .addSvgIcon('remove', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Basura_rojo.svg'))
      .addSvgIcon('menu_user', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Usuario(menu)-01.svg'))
      .addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Twitter(Layout contacto).svg'))
      .addSvgIcon('music_note', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Musica_morado.svg'))
      .addSvgIcon('white_arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Flecha para links_blanco.svg'))
      .addSvgIcon('twitter_blanco', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/twitter_blanco.svg'))
      .addSvgIcon('instagram_blanco', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/instagram_blanco.svg'))
      .addSvgIcon('facebook_blanco', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/facebook_blanco.svg'))
      .addSvgIcon('instagram_morado', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Instagram(Layout contacto).svg'))
      .addSvgIcon('facebook_morado', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Facebook(Layout contacto9.svg'))
      .addSvgIcon('twitter_morado', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Twitter(Layout contacto).svg'))
      .addSvgIcon('black_arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Flecha para navegar_negro.svg'))
      .addSvgIcon('logo_blanco', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/BeatStudio_Logo-03_blanco.svg'))
      .addSvgIcon('logo_negro', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/BeatStudio_Logo-negro.svg'))
      .addSvgIcon('logo_morado', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/BeatStudio_Logo-morado.svg'))
      ;
    this.router.events.subscribe((e: Event) => {
      window.scrollTo(0,0);
      document.getElementById("mySidebar").style.right = "-300px";
    })
  }

  public loader($event: boolean): void {
    this.loading = $event;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    let popover = document.getElementById('custom-popover');
    let sidebar = document.getElementById('sidebar-close');
    if (event.target == popover) {
      popover.style.display = "none";
    }
    if (event.target == sidebar) {
      document.getElementById('sidebar').style.right = '-300px';
      document.getElementById('sidebar-close').style.width = '0';
    }
  }
}
