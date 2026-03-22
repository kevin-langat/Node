import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register-new-user')
  async register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto)
  }
}
