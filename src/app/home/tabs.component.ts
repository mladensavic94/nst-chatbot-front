import { Component } from "@angular/core";
import { Tab } from "./tab.component";

@Component({
    selector: 'tabs',
    template: `
      <div class=content style=' margin-top:-4%;'>
      <button *ngFor="let tab of tabs" (click)="selectTab(tab)" class='btn btn-default' style='height: 25px;background: white;border:1px solid #D3D3D3;border-radius: 0 15px 0 0;border-bottom: 0;'>{{tab.tabTitle}}</button>
      </div>
      <ng-content></ng-content>
    `,
})
export class Tabs {
    tabs: Tab[] = [];

    selectTab(tab: Tab) {
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
        tab.active = true;
    }

    addTab(tab: Tab) {
        if (this.tabs.length === 0) {
            tab.active = true;
        }
        this.tabs.push(tab);
    }
}