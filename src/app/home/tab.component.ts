import { Component, Input } from "@angular/core";
import { Tabs } from "./tabs.component";

@Component({
    selector: 'tab',
    template: `
      <div class=content [hidden]="!active">
        <ng-content></ng-content>
      </div>
    `
  })
  export class Tab {
  
    @Input() tabTitle: string;
    active: boolean;
  
    constructor(tabs:Tabs) {
      tabs.addTab(this);
    }
  }  