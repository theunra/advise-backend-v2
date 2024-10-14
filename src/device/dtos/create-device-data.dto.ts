import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ConditionExpression } from "../enums/condition-expression.enum";

export class CreateDeviceDataDto {
    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsNumber()
    speed: number;

    @IsEnum(ConditionExpression)
    expression: ConditionExpression;

    @IsBoolean()
    drowsiness: boolean;
  }