import { Component, ElementRef } from '@angular/core';

import { EnvironmentService } from './util/environment.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(private env: EnvironmentService,
      private eltRef: ElementRef) {
      //this.env.setEnv(eltRef.nativeElement.getAttribute('env'));
    }
 }
