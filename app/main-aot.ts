///<reference path="../typings/index.d.ts"/>

import { platformBrowser }    from '@angular/platform-browser';

import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';
import {enableProdMode} from "@angular/core";

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
  .then(success => console.log(`Bootstrap success`))
  .catch(error => console.log(error));
