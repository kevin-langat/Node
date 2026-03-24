import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import { CreateDestinationDto } from './dto/create-destination.dto';

@Controller('destinations')
@UseGuards(JwtAuthGuard)
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) { }

  @Post()
  create(@Request() req, @Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationsService.create(req.user.userId, createDestinationDto);
    // Logic to create a new destination
  }

}
// Explanation:
// 1. The `DestinationsController` is decorated with `@Controller('destinations')`, which means it will handle requests to the `/destinations` route.
// 2. The `@UseGuards(JwtAuthGuard)` decorator is applied to the controller, which means that all routes within this controller will be protected by the `JwtAuthGuard`. This guard will ensure that only authenticated users with a valid JWT token can access the routes.
// 3. The controller has a constructor that injects the `DestinationsService`, which can be used to handle business logic related to destinations. However, since there are no routes defined in this snippet, the service is not currently being utilized.

// The `JwtAuthGuard` is a custom guard that extends the `AuthGuard` from the `@nestjs/passport` package, using the 'jwt' strategy. This means that it will validate incoming requests based on the presence and validity of a JWT token in the Authorization header. If the token is valid, the request will be allowed to proceed; otherwise, it will be rejected with an unauthorized error.
