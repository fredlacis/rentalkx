import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create a authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@teste.com',
      password: '1234',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to create a authenticate a non existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'non.existent@email.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '123123',
        email: 'user2@teste.com',
        password: '4321',
        name: 'User Test 2',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: '123456 incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
