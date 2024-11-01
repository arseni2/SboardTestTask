"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableVotes1730199075531 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableVotes1730199075531 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'votes',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'responseId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
        await queryRunner.createForeignKey('votes', new typeorm_1.TableForeignKey({
            columnNames: ['responseId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'responses',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('votes');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('responseId') !== -1);
        await queryRunner.dropForeignKey('votes', foreignKey);
        await queryRunner.dropTable('votes');
    }
}
exports.CreateTableVotes1730199075531 = CreateTableVotes1730199075531;
//# sourceMappingURL=1730199075531-CreateTableVotes.js.map