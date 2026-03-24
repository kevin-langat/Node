import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDestinationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  travelDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}