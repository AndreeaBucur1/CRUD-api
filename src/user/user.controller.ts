/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService) { }

	@Post()
	public create(@Body() user: User): User {
		return this.userService.create(user);
	}

	@Put(':id')
	public update(@Param('id') id: string, @Body() user: User): User  {
		return this.userService.update(parseInt(id), user);
	}

	@Get()
	public findAll(): User[]{
		return this.userService.findAll();
	}

	@Get(':id')
	public getUserById(@Param('id') id: string): User  {
		return this.userService.getUserById(parseInt(id));
	}

	@Delete(':id')
	public deleteById(@Param('id') id: string): void{
		return this.userService.deleteById(parseInt(id));
	}

	@Delete('/delete-selected')
	public deleteSelected(@Body() ids: any) {
		return this.userService.deleteUsers(ids);
	}

	@Post('/check-email-availability')
	public isEmailTaken(@Body() emails: {formEmail: string, currentEmail?: string}): boolean {
		return this.userService.isEmailTaken(emails.formEmail, emails.currentEmail);
	}

}
