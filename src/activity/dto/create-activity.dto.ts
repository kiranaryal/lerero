import { IsString, IsNotEmpty, IsDate, IsArray, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateActivityDto {
  @IsMongoId()
  readonly skill: ObjectId;  // Change to ObjectId

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsDate()
  readonly startDate: Date;

  @IsDate()
  readonly endDate: Date;

  @IsArray()
  @IsMongoId({ each: true })
  readonly participants: ObjectId[];  // Change to ObjectId[]
}
