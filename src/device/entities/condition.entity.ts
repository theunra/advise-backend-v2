import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./device.entity";
import { ConditionExpression } from "../enums/condition-expression.enum";

@Entity('conditions')
export class Condition {
    @PrimaryGeneratedColumn(
        'increment', 
        {type : "bigint"}
    )
    id: number;

    @Column("enum", {
        enum: ConditionExpression,
        nullable: true
    })
    expression: ConditionExpression;

    @Column("bool", {nullable: true})
    drowsiness: boolean;

    @Column("timestamp")
    created_at: Date;

    @Column("timestamp")
    updated_at: Date;

    @ManyToOne(() => Device, (device) => device.conditions)
    device: Device;
}