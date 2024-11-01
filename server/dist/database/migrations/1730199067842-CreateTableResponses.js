"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableResponses1730199067842 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableResponses1730199067842 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'responses',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'pollId',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'text',
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
        await queryRunner.createForeignKey('responses', new typeorm_1.TableForeignKey({
            columnNames: ['pollId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'polls',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('responses');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('pollId') !== -1);
        await queryRunner.dropForeignKey('responses', foreignKey);
        await queryRunner.dropTable('responses');
    }
}
exports.CreateTableResponses1730199067842 = CreateTableResponses1730199067842;
//# sourceMappingURL=1730199067842-CreateTableResponses.js.map