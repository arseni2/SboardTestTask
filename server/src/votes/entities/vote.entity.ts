import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ResponseEntity} from "../../responses/entities/response.entity";

@Entity('votes')
export class VoteEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => ResponseEntity, (response) => response.id, { onDelete: 'CASCADE' })
	response: ResponseEntity;

	@Column({ nullable: true })
	responseId: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;
}