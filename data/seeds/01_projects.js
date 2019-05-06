
exports.seed = function (knex, Promise) {

  return knex('projects')
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { name: 'Finish sprint', desc: 'Finish WEBDB Sprint challenge and the stretch', complete: false },
        { name: 'Eat Lunch', desc: 'Nourish yourself.  Maybe leftovers, maybe something new.  Will need to decide.', complete: false }
      ]);
    });
};
