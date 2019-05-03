
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments()

            tbl
            integer('id')
                .string('name', 128)
                .string('desc', 256)
                .boolean('completed')
                .notNullable()
                .unique()
        })

};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('projects')
};
