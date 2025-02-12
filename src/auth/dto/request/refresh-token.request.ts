import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
