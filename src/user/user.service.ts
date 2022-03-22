import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UserService {

	private users: User[] = [{
		id: 1,
		firstName: "Ana",
		lastName: "Popa",
		email: "ana.popa@bearingpoint.com",
		username: "ana.popa"
	},
	{
		id: 2,
		firstName: "Andreea",
		lastName: "Bucur",
		email: "andreea.bucur@bearingpoint.com",
		username: "andreea.bucur"
	}];

	private idCounter = 2;

	public create(user: User): User {
		user.id = ++this.idCounter;
		this.users.push(user);
		return user;
	}

	public update(id: number, user: User): User {
		const userToEdit: User = this.findById(id);
		userToEdit.firstName = user.firstName;
		userToEdit.lastName = user.lastName;
		userToEdit.email = user.email;
		userToEdit.username = user.email.split('@')[0];
		return userToEdit;
	}

	public findAll(): User[] {
		return this.users;
	}

	public findById(id: number): User {
		return this.users.find(
			(user: User) => user.id === id
		);
	}

	public deleteById(id: number): void {
		const user: User | undefined = this.findById(id);
		if (user) {
			this.users.splice(this.users.indexOf(user), 1);
		}
	}

	public deleteUsers(ids: number[]): void {
		for(let id of ids) {
			this.deleteById(id);
		}
	}

	public isEmailTaken(formEmail: string, currentEmail?:string) : boolean {
		if(formEmail === currentEmail) {
			return false;
		}
		return this.users.some((user: User) => user.email === formEmail);
	}

}
