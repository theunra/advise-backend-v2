import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sensor } from "./sensor.entity";
import { Condition } from "./condition.entity";

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @ManyToOne(() => User, (user) => user.devices)
  user: User;

  @OneToOne(() => Sensor, (sensor) => sensor.device)
  sensors: Sensor[];

  @OneToOne(() => Condition, (condition) => condition.device)
  conditions: Condition[];
}