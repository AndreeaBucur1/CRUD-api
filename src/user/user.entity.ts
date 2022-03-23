import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', nullable: false })
    public firstName!: string;

    @Column({ type: 'varchar', nullable: false })
    public lastName!: string;

    @Column({ type: 'varchar', nullable: false })
    public email!: string;
    
    @Column({ type: 'varchar', nullable: false })
    public username!: string;
  }
   