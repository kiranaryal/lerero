import { IsOptional, IsString, IsDate, IsArray, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateActivityDto {
  @IsMongoId()
  readonly skill?: ObjectId;  // Change to ObjectId

  @IsString()
  readonly title?: string;

  @IsString()
  readonly description?: string;

  @IsDate()
  readonly startDate?: Date;

  @IsDate()
  readonly endDate?: Date;

  @IsArray()
  @IsMongoId({ each: true })
  readonly participants?: ObjectId[];  // Change to ObjectId[]
}
