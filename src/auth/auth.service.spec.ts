import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repositories/auth-repository';
import * as bcrypt from 'bcrypt';
import { ValidateUserInput } from './interfaces/validate-user-input';
import { User, UserWithPassword } from 'src/users/interfaces/user';
import { RegisterUserDTO } from './dto/register-user-dto';

const mockUsersService = {
  findByEmailWithPassword: jest.fn(),
  create: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let passwordHash: string;

  const createdAt = new Date();
  const updatedAt = new Date();

  const buildMockUserWithoutPassword = (email: string): User => ({
    id: '123',
    email,
    createdAt,
    updatedAt,
  });

  const buildMockUserWithPassword = (
    email: string,
    passwordHash: string,
  ): UserWithPassword => ({
    id: '123',
    email,
    passwordHash,
    createdAt,
    updatedAt,
  });

  const buildValidateUserInput = (
    email: string,
    password: string,
  ): ValidateUserInput => ({
    email,
    password,
  });

  const buildRegisterInput = (
    email: string,
    password: string,
  ): RegisterUserDTO => ({
    email,
    password,
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: ConfigService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: AuthRepository, useValue: {} },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  beforeAll(async () => {
    passwordHash = await bcrypt.hash('plaintextpassword', 1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate user credentials and return user data without password', async () => {
    const userInput = buildValidateUserInput(
      'mock@user.pl',
      'plaintextpassword',
    );

    const mockUser = buildMockUserWithPassword(userInput.email, passwordHash);
    mockUsersService.findByEmailWithPassword.mockResolvedValue(mockUser);

    const result = await service.validateUser(userInput);
    const expectedUser = buildMockUserWithoutPassword(userInput.email);

    expect(result).toEqual(expectedUser);
  });

  it('should fail if password is incorrect', async () => {
    const userInput = buildValidateUserInput('mock@user.pl', 'wrongpassword');

    const mockUser = buildMockUserWithPassword(userInput.email, passwordHash);
    mockUsersService.findByEmailWithPassword.mockResolvedValue(mockUser);

    const result = await service.validateUser(userInput);
    expect(result).toBeNull();
  });

  it("should fail if user don't exist", async () => {
    const userInput = buildValidateUserInput(
      'nonexistent@user.pl',
      'plaintextpassword',
    );

    mockUsersService.findByEmailWithPassword.mockResolvedValue(null);

    const result = await service.validateUser(userInput);
    expect(result).toBeNull();
  });

  it('should create a new user with hashed password', async () => {
    const registerData = buildRegisterInput(
      'mock@user.pl',
      'plaintextpassword',
    );

    const mockUser = buildMockUserWithoutPassword(registerData.email);
    mockUsersService.create.mockResolvedValue(mockUser);

    await service.register(registerData);

    expect(mockUsersService.create).not.toHaveBeenCalledWith(
      expect.objectContaining({
        passwordHash: registerData.password,
      }),
    );
  });
});
