import {
    Column,

    CreateDateColumn,
    Entity,

    PrimaryGeneratedColumn,

} from 'typeorm';

@Entity('phone_numbers')
export class Phone {
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column({
        name: 'country_code'
    })
    countryCode!: string;

    @Column({
        name: 'phone_number'
    })
    phoneNumber!: string;

    @CreateDateColumn()
    created_at!: Date;
}
