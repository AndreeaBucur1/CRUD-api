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
    it('should be created.', () => {
      const user = new User();
      user.email = 'email';

      jest
      .spyOn(service,'isEmailTaken')
      .mockReturnValue(false);

     expect.assertions(2);
     expect(service.create(user)).toEqual(user);
     expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    });

    it('should return undefined.', () => {
      const user = new User();
      user.email = 'email';

      jest
      .spyOn(service,'isEmailTaken')
      .mockReturnValue(true);

     expect.assertions(2);
     expect(service.create(user)).toEqual(undefined);
     expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    })
  });

  describe('update',() => {
    it('should be updated.', () => {
      const user = new User();
      user.email = 'email';
      service['userList'] = [new User()]

      jest
      .spyOn(service,'isEmailTaken')
      .mockReturnValue(false);

      jest
      .spyOn(service,'findIndexById')
      .mockReturnValue(0);

     expect.assertions(3);
     expect(service.update(0,user)).toEqual(user);
     expect(service.findIndexById).toHaveBeenCalledWith(0);
     expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    });

    it('should return undefined because id is not found.', () => {
      const user = new User();
      user.email = 'email';
      service['userList'] = []

      jest
      .spyOn(service,'isEmailTaken')
      .mockReturnValue(false);

      jest
      .spyOn(service,'findIndexById')
      .mockReturnValue(-1);

     expect.assertions(3);
     expect(service.update(0,user)).toEqual(undefined);
     expect(service.findIndexById).toHaveBeenCalledWith(0);
     expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    });

    it('should return undefined because email is taken.', () => {
      const user = new User();
      user.email = 'email';
      service['userList'] = [new User()]

      jest
      .spyOn(service,'isEmailTaken')
      .mockReturnValue(true);

     expect.assertions(2);
     expect(service.update(0,user)).toEqual(undefined);
     expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    });
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

  describe('findSpecialUser', () => {
    it('Should be userList an empty array.', () => {
      service['userList'] = [];
      expect.assertions(1);
      expect(service.findSpecialUser()).toEqual(undefined);
    });

    it('Should be userList has users, but the returning user will not be valid.', () => {
      service['userList'] = [new User()];

      jest
        .spyOn(UserService.prototype as any, 'takeARandomIndex')
        .mockReturnValue(0);
      
      jest
        .spyOn(UserService.prototype as any, 'isAccountValid')
        .mockReturnValue(false);

      expect.assertions(3);
      expect(service.findSpecialUser()).toEqual(undefined);
      expect(service['takeARandomIndex']).toHaveBeenCalled();
      expect(service['isAccountValid']).toHaveBeenCalledWith(0);
    });

    it('Should be userList has users, but the returning user will be valid.', () => {
      service['userList'] = [new User()];

      jest
        .spyOn(UserService.prototype as any, 'takeARandomIndex')
        .mockReturnValue(0);
      
      jest
        .spyOn(UserService.prototype as any, 'isAccountValid')
        .mockReturnValue(true);

      expect.assertions(3);
      expect(service.findSpecialUser()).toEqual({});
      expect(service['takeARandomIndex']).toHaveBeenCalled();
      expect(service['isAccountValid']).toHaveBeenCalledWith(0);
    });
  });
});
