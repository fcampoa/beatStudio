import { environment } from './../../../environments/environment';
import { GLOBAL_SERVICE_DEFINITION } from './global-service-dictionary';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { GlobalServiceSettings } from './global-service-settings';
import { GlobalApiService } from './global-service';
import { environment as config } from '../../../environments/environment';


export function getServicesSettings(): GlobalServiceSettings {
    if (document && document.getElementsByTagName) {
    const baseElements: HTMLBaseElement[] = Array.from(document.getElementsByTagName('base'));
    if (baseElements && baseElements.length > 0 ) {
      return new GlobalServiceSettings(`${ baseElements[0].href }api`, GLOBAL_SERVICE_DEFINITION);
    }
  }
  return new GlobalServiceSettings(config.base_url, GLOBAL_SERVICE_DEFINITION)
}
@NgModule({
imports: [HttpClientModule]
})
export class GlobalServiceModule {
  public static forRoot(): ModuleWithProviders<GlobalServiceModule> {
    return {
      ngModule: GlobalServiceModule,
      providers: [
        { provide: GlobalServiceSettings, useFactory: getServicesSettings },
        GlobalApiService
      ]
    }
  };
}
