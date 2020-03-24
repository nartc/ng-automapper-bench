import { Component, Inject, OnInit } from '@angular/core';
import { mapFrom, Mapper } from '@nartc/automapper';
import { UsersToken } from '../constants';
import { Bio, BioVm, User, UserVm } from './models/user';

Mapper.createMap(User, UserVm)
  .forMember(d => d.first, mapFrom(s => s.firstName))
  .forMember(d => d.last, mapFrom(s => s.lastName))
  .forMember(d => d.full, mapFrom(s => s.firstName + ' ' + s.lastName));
Mapper.createMap(Bio, BioVm)
  .forMember(d => d.isAdult, mapFrom(s => s.age > 18))
  .forMember(d => d.birthday, mapFrom(s => s.birthday.toDateString()));

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300"
           alt="Angular Logo"
           src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>

  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'ng-automapper';

  constructor(@Inject(UsersToken) private users: User[]) {

  }

  ngOnInit() {
    // console.time('morphism');
    // const vmsMorp = morphism({
    //   first: 'firstName',
    //   last: 'lastName',
    //   full: ({ firstName, lastName }: any) => firstName + ' ' + lastName,
    //   bio: {
    //     job: 'bio.job',
    //     isAdult: ({ bio }: any) => bio.age > 18,
    //     birthday: ({ bio }: any) => bio.birthday.toDateString()
    //   }
    // }, this.users);
    // console.timeEnd('morphism');
    //
    // console.time('morphism create mapper');
    // const mapper = morphism({
    //   first: 'firstName',
    //   last: 'lastName',
    //   full: ({ firstName, lastName }: any) => firstName + ' ' + lastName,
    //   bio: {
    //     job: 'bio.job',
    //     isAdult: ({ bio }: any) => bio.age > 18,
    //     birthday: ({ bio }: any) => bio.birthday.toDateString()
    //   }
    // });
    // console.timeEnd('morphism create mapper');
    //
    // console.time('morphism mapper');
    // const vmsMorpMapper = mapper(this.users);
    // console.timeEnd('morphism mapper');

    console.time('mapper');
    const vms = Mapper.mapArray(this.users, UserVm);
    console.timeEnd('mapper');
  }
}
