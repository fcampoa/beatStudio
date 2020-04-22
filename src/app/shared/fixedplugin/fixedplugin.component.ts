import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'fixedplugin-cmp',
    templateUrl: 'fixedplugin.component.html'
})

export class FixedPluginComponent implements OnInit{

  public sidebarColor = 'white';
  public sidebarActiveColor = 'danger';

  public state = true;

  changeSidebarColor(color){
    const sidebar =  document.querySelector('.sidebar') as HTMLElement;

    this.sidebarColor = color;
    if (sidebar !== undefined){
        sidebar.setAttribute('data-color', color);
    }
  }
  changeSidebarActiveColor(color){
    const sidebar =  document.querySelector('.sidebar') as HTMLElement;
    this.sidebarActiveColor = color;
    if (sidebar !== undefined){
        sidebar.setAttribute('data-active-color', color);
    }
  }
  ngOnInit(){}
}
