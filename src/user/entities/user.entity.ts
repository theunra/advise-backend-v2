import { Device } from "src/device/entities/device.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', {
    nullable: true,
  })
  email: string;

  @Column('varchar')
  username: string;

  @Column('varchar', { length: 60 })
  pasw_hash: string;

  @Column('varchar')
  pasw_salt: string;

  @OneToOne(() => Device, (device   ) => device.user)
  devices: Device[];
}