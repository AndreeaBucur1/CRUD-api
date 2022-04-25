/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
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




  describe('create', () => {
    it('should be created.', () => {
      const user = {email: 'diego@gmail.com' } as User;
      service['userList'] = [{email: 'david@gmail.com'} as User]
      const allUsers = [service['userList'][0], user];
      
      jest.spyOn(service, 'isEmailTaken').mockReturnValue(false);

      expect.assertions(3);
      expect(service.create(user)).toEqual(user);
      expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
      expect(service.findAll()).toEqual(allUsers)
    });



    it('should throw error if user already exists.', () => {
      const user = new User();
      user.email = 'email';

      jest.spyOn(service, 'isEmailTaken').mockReturnValue(true);

      expect.assertions(2);
      expect(
        () => service.create(user)
      ).toThrow('Email is already taken')
      expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    })
  });

  
  test('test', () => { 
    const n = null, d = 10, u = undefined, f = false, t = true; 
 
    expect.assertions(6); 
    expect(n).toBeNull(); 
    expect(d).toBeDefined(); 
    expect(u).toBeUndefined(); 
    expect(t).toBeTruthy(); 
    expect(f).toBeFalsy(); 
    expect(f).not.toBeTruthy(); 
  });

  describe('update', () => {
    it('should be updated.', () => {
      const user = new User();
      user.email = 'email';
      service['userList'] = [new User()]

      jest
        .spyOn(service, 'isEmailTaken')
        .mockReturnValue(false);

      jest
        .spyOn(service, 'findIndexById')
        .mockReturnValue(0);

      expect.assertions(3);
      expect(service.update(0, user)).toEqual(user);
      expect(service.findIndexById).toHaveBeenCalledWith(0);
      expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    });

    it('should return undefined because id is not found.', () => {
      const user = new User();
      user.email = 'email';
      service['userList'] = []

      jest
        .spyOn(service, 'isEmailTaken')
        .mockReturnValue(false);

      jest
        .spyOn(service, 'findIndexById')
        .mockReturnValue(-1);

      expect.assertions(3);
      expect(service.update(0, user)).toEqual(undefined);
      expect(service.findIndexById).toHaveBeenCalledWith(0);
      expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    });

    it('should return undefined because email is taken.', () => {
      const user = new User();
      user.email = 'email';
      service['userList'] = [new User()]

      jest
        .spyOn(service, 'isEmailTaken')
        .mockReturnValue(true);

      expect.assertions(2);
      expect(service.update(0, user)).toEqual(undefined);
      expect(service.isEmailTaken).toHaveBeenCalledWith(user.email);
    });
  });

  describe('deleteById', () => {
    it('should be deleted.', () => {
      const userList: User[] = [{ id: 1 } as User, { id: 2 } as User];

      service['userList'] = [...userList];
      service.deleteById(1);

      expect.assertions(1);
      expect(service.findAll())
        .toEqual(
          userList.filter(user => user.id !== 1)
        );
    });
  });

  describe('deleteUsers', () => {
    it('should be deleted.', () => {
      const userList = [new User(), new User()];
      userList[0].id = 0;
      userList[1].id = 1;

      service['userList'] = [...userList];
      service.deleteUsers([0, 1]);

      expect.assertions(1);
      expect(service.findAll())
        .toEqual(
          []
        );
    });
  });

  describe('sum', () => {

    it('Should return the result of the division', () => {
      expect.assertions(1);
      expect(service.div(9, 3)).toEqual(3);
    })

    it('should throw an exception', () => {
      expect.assertions(1);
      expect(
        () => service.div(3, 0)
      ).toThrow('Cannot divide by 0')
    })

  })

  describe('findRandomUser', () => {
    it('Should return undefined if userList is empty.', () => {
      service['userList'] = [];
      expect.assertions(1);
      expect(service.findRandomUser()).toEqual(undefined);
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
      expect(service.findRandomUser()).toEqual(undefined);
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
      expect(service.findRandomUser()).toEqual({});
      expect(service['takeARandomIndex']).toHaveBeenCalled();
      expect(service['isAccountValid']).toHaveBeenCalledWith(0);
    });
  });
});
