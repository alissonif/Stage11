const sqliteConnection = require("../database/sqlite");

class UserRepository {
  //busca por email
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("select * from users where email = (?)", [
      email,
    ]);

    return user;
  }
  //cadastro de user
  async create({ name, email, password }) {
    const database = await sqliteConnection();
    const userId = await database.run(
      "insert into users (name, email, password) values (?, ?, ?)",
      [name, email, password]
    );

    return { id: userId };
  }
}

module.exports = UserRepository;
