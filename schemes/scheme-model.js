const db = require("../data/dbConfig");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function add(schema) {
  return db("schemes")
    .insert(schema)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  let schema;
  return findById(id)
    .then(data => {
      schema = data;
      return db("schemes")
        .where("id", id)
        .del();
    })
    .then(() => {
      return schema;
    });
}

function findSteps(id) {
  return db("schemes")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .join("steps", "schemes.id", "=", "steps.scheme_id")
    .where("scheme_id", id);
}

module.exports = { find, findById, add, update, remove, findSteps };
