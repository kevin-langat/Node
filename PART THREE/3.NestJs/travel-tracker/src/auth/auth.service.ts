import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDTO } from './register.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // handle user registration, login, and authentication logic here
  async register(registerDto: RegisterDTO) {
    const { email, password } = registerDto;
    const existingUser = await this.prisma.user.findUnique({
      where : {email}
    })

    // : check if the user exists
    if (existingUser) {
      throw new ConflictException('User already exist! Please login')
    }
    // : hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // : create a new user
    const newlyCreatedUser = await this.prisma.user.create({
      data: {
        email,
        password:hashedPassword,
      }
    })
    // : remove password from the return object
    const { password: _, ...result } = newlyCreatedUser
    return result;
  }
}
