import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./device.entity";

@Entity('sensors')
export class Sensor {
    @PrimaryGeneratedColumn(
        'increment', 
        {type : "bigint"}
    )
    id: number;

    @Column("double precision", {nullable: true})
    latitude: number;

    @Column("double precision", {nullable: true})
    longitude: number;

    @Column("float", {nullable: true})
    speed: number;

    @Column("timestamp")
    created_at: Date;

    @Column("timestamp")
    updated_at: Date;

    @ManyToOne(() => Device, (device) => device.sensors)
    device: Device;
}