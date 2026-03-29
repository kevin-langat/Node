import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginDTO, RegisterDTO } from './register.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  // handle user registration, login, and authentication logic here
  async register(registerDto: RegisterDTO) {
    const { email, password } = registerDto;
    const existingUser = await this.prisma.user.findUnique({
      where : {email}
    })

    if (existingUser) {
      throw new ConflictException('User already exist! Please login')
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newlyCreatedUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    // remove password from the return object
    const { password: _, ...result } = newlyCreatedUser
    return result;
  }

  // login
  async login(loginDto: loginDTO) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials! Please try again')
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials! Please try again')

    }

    const token = this.jwtService.sign({ userId: user.id })

    const { password: _, ...result } = user;
    return { ...result, token };
  }
}
