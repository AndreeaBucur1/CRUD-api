import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService) { }

	@Post()
	public create(@Body() user: UserEntity): Promise<UserEntity> {
		return this.userService.create(user);
	}

	@Put(':id')
	public update(@Param('id') id: string, @Body() user: UserEntity): Promise<UserEntity>  {
		return this.userService.update(parseInt(id), user);
	}

	@Get()
	public findAll(): Promise<UserEntity[]>{
		return this.userService.findAll();
	}

	@Get(':id')
	public findById(@Param('id') id: string): Promise<UserEntity>  {
		return this.userService.findById(parseInt(id));
	}

	@Delete(':id')
	public deleteById(@Param('id') id: string): Promise<void>{
		return this.userService.deleteById(parseInt(id));
	}

	@Delete('/delete-selected')
	public deleteSelected(@Body() ids: any) {
		return this.userService.deleteUsers(ids);
	}

	@Post('/check-email-availability')
	public checkEmailAvailability(@Body() emails: {formEmail: string, currentEmail?: string}): Promise<boolean> {
		return this.userService.checkEmailAvailability(emails.formEmail, emails.currentEmail);
	}

}
