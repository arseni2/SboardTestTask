"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTablePolls1730199050611 = void 0;
const typeorm_1 = require("typeorm");
class CreateTablePolls1730199050611 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'polls',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'question',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('polls');
    }
}
exports.CreateTablePolls1730199050611 = CreateTablePolls1730199050611;
//# sourceMappingURL=1730199050611-CreateTablePolls.js.map