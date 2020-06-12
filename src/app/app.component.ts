import { DomSanitizer } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beatStudio';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry
    .addSvgIcon('remove', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Basura_rojo.svg'))
    .addSvgIcon('menu_user', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Usuario(menu)-01.svg'))
    .addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Twitter(Layout contacto).svg'))
    .addSvgIcon('music_note', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Musica_morado.svg'))
    .addSvgIcon('white_arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/SVG/Flecha para links_blanco.svg'))
    ;
  }

}
