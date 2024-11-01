import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker/locale/ru';
import {ResponseEntity} from '../../responses/entities/response.entity';

define(ResponseEntity, () => {
	const response = new ResponseEntity();
	response.text = faker.lorem.sentence();
	return response;
});