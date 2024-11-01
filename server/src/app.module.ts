import { Module } from '@nestjs/common';
import { PollsModule } from './polls/polls.module';
import { ResponsesModule } from './responses/responses.module';
import { VotesModule } from './votes/votes.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './config/typeorm.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join(process.cwd(), '.env'),
		}),
		TypeOrmModule.forRootAsync(ormconfig),
		PollsModule,
		ResponsesModule,
		VotesModule
	],
	controllers: []
})
export class AppModule {
}
