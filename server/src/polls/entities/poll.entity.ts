import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import {ResponseEntity} from "../../responses/entities/response.entity";

@Entity('polls')
export class PollEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	question: string;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@OneToMany(() => ResponseEntity, (response) => response.poll)
	responses: ResponseEntity[];
}