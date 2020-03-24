import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Bio, User } from './app/models/user';
import { UsersToken } from './constants';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const users = [];

for (let i = 0; i < 50000; i++) {
  const user = new User();
  user.firstName = 'Chau' + i;
  user.lastName = 'Tran' + i;
  user.bio = new Bio();
  user.bio.age = i + 1;
  user.bio.job = 'dev' + i;
  user.bio.birthday = new Date();
  users.push(user);
}
platformBrowserDynamic([
  {
    provide: UsersToken, useValue: users
  }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
