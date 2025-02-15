/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UserService {
  private userList: User[] = [];

  public create(user: User): User | undefined {
    if (this.isEmailTaken(user.email)) {
      throw new Error('Email is already taken')
    }
    this.userList.push(user);
    return user;
  }

  public update(id: number, user: User): User {
    if (this.isEmailTaken(user.email)) {
      throw new Error('Email is already taken')
    }
    const indexUser = this.findIndexById(id);
    if (indexUser > -1) {
      this.userList[indexUser] = user;
      return user;
    }
    return undefined;
  }

  public getUserById(id: number): User {
    return this.userList.find((user) => {
      user.id === id;
    });
  }

  public findAll(): User[] {
    return this.userList;
  }

  public findIndexById(id: number): number {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  public deleteById(id: number): void {
    this.userList = this.userList.filter((user) => user.id !== id);
  }

  public deleteUsers(ids: number[]): void {
    for (const id of ids) {
      this.deleteById(id);
    }
  }

  public isEmailTaken(formEmail: string, currentEmail?: string): boolean {
    if (formEmail === currentEmail) {
      return false;
    }
    return this.userList.some((user) => user.email === formEmail);
  }

  
  private isAccountValid(index: number): boolean {
    return this.userList[index].firstName !== ''
    && this.userList[index].lastName !== ''
    && this.userList[index].username !== '';
  }
  
  private takeARandomIndex(): number {
    return Math.floor(Math.random() * this.userList.length);
  }
  
  public findRandomUser(): User | undefined {
    if (this.userList.length === 0) {
      return;
    }

    const index = this.takeARandomIndex();
    if (this.isAccountValid(index)) {
      return this.userList[index];
    }
    return;
  }

  public div(a: number, b: number) {
    if (b === 0) {
      throw new Error('Cannot divide by 0');
    }
    return a / b;
  }


}
