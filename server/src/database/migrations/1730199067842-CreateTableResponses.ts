import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableResponses1730199067842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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

        await queryRunner.createForeignKey('responses', new TableForeignKey({
            columnNames: ['pollId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'polls',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('responses');
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf('pollId') !== -1);
        await queryRunner.dropForeignKey('responses', foreignKey!);

        await queryRunner.dropTable('responses');
    }
}
