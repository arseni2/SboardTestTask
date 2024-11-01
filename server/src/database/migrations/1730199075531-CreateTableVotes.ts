import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableVotes1730199075531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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

        await queryRunner.createForeignKey('votes', new TableForeignKey({
            columnNames: ['responseId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'responses',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('votes');
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf('responseId') !== -1);
        await queryRunner.dropForeignKey('votes', foreignKey!);

        await queryRunner.dropTable('votes');
    }

}
