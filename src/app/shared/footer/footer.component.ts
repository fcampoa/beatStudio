import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
    test: Date = new Date();
    constructor(private router: Router) { }
    goTo(here: string): void {
        this.router.navigate([`/dashboard/${here}`]);
    }
}
