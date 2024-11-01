import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany} from "typeorm";
import {VoteEntity} from "../../votes/entities/vote.entity";
import { PollEntity } from '../../polls/entities/poll.entity';

@Entity('responses')
export class ResponseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => PollEntity, (poll) => poll.id, { onDelete: 'CASCADE' })
	poll: PollEntity;

	@Column({ nullable: true })
	pollId?: number;

	@Column()
	text: string;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@OneToMany(() => VoteEntity, (vote) => vote.response)
	votes: VoteEntity[];
}