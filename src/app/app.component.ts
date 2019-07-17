import { Component, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  languages = ['en', 'sv'];

  constructor(@Inject(LOCALE_ID) public localeId: string) {
  }
}
