import { Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class I18n {
  constructor(private translate: TranslateService) {
    translate.addLangs(["en", "de", "ar"]);
    translate.setDefaultLang('de');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de|ar/) ? browserLang : 'de');
  }

  setLanguage(language: string) {
    return this.translate.use(language);
  }

  get language() {
    return this.translate.currentLang;
  }
}
