import { Device } from "src/device/entities/device.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  salt: string;

  @OneToOne(() => Device, (device   ) => device.user)
  devices: Device[];
}