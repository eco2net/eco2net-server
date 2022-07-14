// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
// import User from 'src/entities/user.entity';
// import { UserDto } from './dto/user.dto';
// import { UsersService } from './users.service';

// describe('UsersController', () => {
//   let controller: UsersController;

//   const mockUsersService = {

//   }

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [UsersService]
//     }).overrideProvider(UsersService).useValue(mockUsersService).compile();

//     controller = module.get<UsersController>(UsersController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it ('sould create a user', () => {
//     expect(controller.addUser())
//   })
// });
