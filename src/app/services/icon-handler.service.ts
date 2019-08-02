import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable()
export class IconHandlerService {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ){ }

    public registerAllIcons(): void {
        let icons = [
            {name: 'app-icon', url: '../assets/icons/app-icon.svg'},
            {name: 'context-menu-trigger', url: '../assets/icons/context-menu-trigger.svg'},
            {name: 'delete', url: '../assets/icons/delete.svg'},
            {name: 'drag-handle', url: '../assets/icons/drag-handle.svg'},
            {name: 'hamburgerMenu', url: '../assets/icons/hamburger-menu.svg'}
        ];

        icons.forEach(icon => {
            this.matIconRegistry.addSvgIcon(
                icon.name,
                this.domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
            );
        });
    }
}