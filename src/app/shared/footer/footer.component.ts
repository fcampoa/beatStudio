import { Component, HostBinding } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent{
    test: Date = new Date();
}
