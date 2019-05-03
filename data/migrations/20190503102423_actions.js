
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('actions', tb => {
            tbl.increments()

            tbl
                .integer('action_id')
                .string('action_name', 128)
                .string('action_desc', 256)
                .string('action_notes', 256)
                .boolean('action_completed')
                .notNullable()
                .unique()

            tbl
                .integer('project_id')
                .unsigned()
                .notNullabvle()
                .references('id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

        })
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('actions')
};
