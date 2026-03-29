import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// This module is responsible for providing the PrismaService to the rest of the application. By marking it as a global module, we can ensure that the PrismaService is available throughout the entire application without needing to import the PrismaModule in every other module. The PrismaService is registered as a provider, and it is also exported so that it can be injected into other modules that need to use it. This setup allows for a clean and modular architecture, where the database access logic is encapsulated within the PrismaService and can be easily reused across different parts of the application.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
