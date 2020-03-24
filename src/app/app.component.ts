import { Component, Inject, OnInit } from '@angular/core';
import { mapFrom, Mapper } from '@nartc/automapper';
import { morphism } from 'morphism';
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
    <input type="text" [(ngModel)]="times">

    <button (click)="map(1)">map</button>
    <button (click)="map(2)">mapMorphism</button>
    <button (click)="map(3)">mapMorphismWithMapper</button>

  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'ng-automapper';
  times = '20';
  mapperTimes = [];
  mapMorphismTimes = [];
  mapMorphismWithMapperTimes = [];

  mapperMap: { [key: number]: [Function, any[]] } = {
    1: [this.mapMapper.bind(this), this.mapperTimes],
    2: [this.mapMorphism.bind(this), this.mapMorphismTimes],
    3: [this.mapMorphismWithMapper.bind(this), this.mapMorphismWithMapperTimes]
  };

  constructor(@Inject(UsersToken) private users: User[]) {

  }

  ngOnInit() {
  }

  map(type: 1 | 2 | 3) {
    this.mapInternal(type);
  }

  mapInternal(type: 1 | 2 | 3) {
    const times = Number(this.times);

    if (isNaN(times)) {
      return;
    }

    let i = times;
    while (i--) {
      this.mapperMap[type][0](i, times);
    }

    console.log('Average ', this.mapperMap[type][1].reduce((acc, cur) => acc + cur) / this.mapperMap[type][1].length);
  }

  mapMapper(iteration: number, times: number) {
    const t0 = performance.now();
    const vms = Mapper.mapArray(this.users, UserVm);
    const t1 = performance.now();
    console.log(`mapper ${ times - iteration }`, (t1 - t0).toFixed(4) + 'ms');
    this.mapperTimes.push(t1 - t0);
  }

  mapMorphism(iteration: number, times: number) {
    const t0 = performance.now();
    const vmsMorp = morphism({
      first: 'firstName',
      last: 'lastName',
      full: ({ firstName, lastName }: any) => firstName + ' ' + lastName,
      bio: {
        job: 'bio.job',
        isAdult: ({ bio }: any) => bio.age > 18,
        birthday: ({ bio }: any) => bio.birthday.toDateString()
      }
    }, this.users);
    const t1 = performance.now();
    console.log(`mapper-morphism ${ times - iteration }`, (t1 - t0).toFixed(4) + 'ms');
    this.mapMorphismTimes.push(t1 - t0);
  }

  mapMorphismWithMapper(iteration: number, times: number) {
    const t0 = performance.now();
    const mapper = morphism({
      first: 'firstName',
      last: 'lastName',
      full: ({ firstName, lastName }: any) => firstName + ' ' + lastName,
      bio: {
        job: 'bio.job',
        isAdult: ({ bio }: any) => bio.age > 18,
        birthday: ({ bio }: any) => bio.birthday.toDateString()
      }
    });

    const vmsMorpMapper = mapper(this.users);
    const t1 = performance.now();
    console.log(`mapper-morphism-create-mapper ${ times - iteration }`, (t1 - t0).toFixed(4) + 'ms');
    this.mapMorphismWithMapperTimes.push(t1 - t0);
  }
}
