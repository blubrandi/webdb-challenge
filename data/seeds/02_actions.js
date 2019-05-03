
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name')
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { desc: 'complete these things to finish sprint', notes: 'Easy.  You got this.', completed: false, project_id: 1 },
        { desc: 'actually make lunch', notes: 'you\re hungry!  don\'t forget this!', completed: false, project_id: 2 },
      ]);
    });
};
