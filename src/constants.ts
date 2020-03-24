import { InjectionToken } from '@angular/core';
import { User } from './app/models/user';

export const UsersToken = new InjectionToken<User[]>('USERS');
