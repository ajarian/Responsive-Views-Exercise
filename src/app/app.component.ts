import { Component } from '@angular/core';

import { IconHandlerService } from './services/icon-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adrian-svc-link';

  constructor (
    private iconHandlerService: IconHandlerService
  ) {
    this.iconHandlerService.registerAllIcons();
  }

  ngOnInit() {

  }
}
