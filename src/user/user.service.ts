import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UserService {
	private userList: User[] = [];

	public create(user: User): User {
		this.userList.push(user);
		return user;
	}

	public update(id: number, user: User): User {
		const indexUser = this.findIndexById(id);
		if (indexUser > -1){
			this.userList[indexUser] = user;
		}
		return user;
		
	}

	public getUserById(id: number): User{
		return this.userList.find((user) => {user.id === id});
	}

	public findAll(): User[] {
		return this.userList;
	}

	public findIndexById(id: number):number {
		for (let i  = 0; i < this.userList.length; i ++){
			if (this.userList[i].id === id){
				return i;
			}
		}
		return -1;
	}

	public deleteById(id: number): void {
		this.userList = this.userList.filter((user) => user.id !== id);
	}

	public deleteUsers(ids: number[]): void {
		for(let id of ids) {
			this.deleteById(id);
		}
	}

	public checkEmailAvailability(formEmail: string, currentEmail?:string) : boolean {
		if(formEmail === currentEmail) {
			return false;
		}
		return this.userList.some((user) => user.email === formEmail);
	}

}
