/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { shareReplay } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('create',() => {
    it('should be created without error.', () => {
      const user = new User();
      user.email = 'email';

      jest
      .spyOn(service,'isEmailTaken')
      .mockReturnValue(false);

     expect.assertions(2);
     expect(service.create(user)).toEqual(user);
     expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    });

    it('should throw exception.', () => {
      const user = new User();
      user.email = 'email';
      const error = new Error('Email already exists.');

      jest
      .spyOn(service,'isEmailTaken')
      .mockReturnValue(true);

     expect.assertions(2);
     expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
     expect(service.create(user)).rejects.toThrow();
    })
  });

  describe('deleteById',() => {
    it('should be deleted.', () => {
      const userList= [new User(), new User()];
      userList[0].id = 0;
      userList[1].id = 1;

      service['userList'] = [...userList];
      service.deleteById(0);

      expect.assertions(1);
      expect(service.findAll())
        .toEqual(
          userList.filter(user => user.id !== 0)
        );
    });
  });

  describe('deleteUsers',() => {
    it('should be deleted.', () => {
      const userList= [new User(), new User()];
      userList[0].id = 0;
      userList[1].id = 1;

      service['userList'] = [...userList];
      service.deleteUsers([0,1]);

      expect.assertions(1);
      expect(service.findAll())
        .toEqual(
          []        
        );
    });
  });
});
