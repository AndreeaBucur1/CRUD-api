import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>
	){}

	public create(user: UserEntity): Promise<UserEntity> {
		return this.userRepository.save(user);
	}

	public async update(id: number, user: UserEntity): Promise<UserEntity> {
		const userToEdit: UserEntity = await this.findById(id);
		for(const key in user){
			userToEdit[key] = user[key];
		}
		return this.userRepository.save(userToEdit);
	}

	public findAll(): Promise<UserEntity[]> {
		return this.userRepository.find();
	}

	public findById(id: number): Promise<UserEntity> {
		return this.userRepository.findOne(id);
	}

	public async deleteById(id: number): Promise<void> {
		const user: UserEntity | undefined = await this.findById(id);
		if (user) {
			this.userRepository.delete(id);
		}
	}

	public deleteUsers(ids: number[]): void {
		for(let id of ids) {
			this.deleteById(id);
		}
	}

	public async isEmailTaken(formEmail: string, currentEmail?:string) : Promise<boolean> {
		if(formEmail === currentEmail) {
			return false;
		}
		const user = await this.userRepository.findOne({
			where: {
				email: formEmail
			}
		})		
		return user !== undefined;
	}

}
