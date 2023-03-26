const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    } else {
      console.log("cadastrado com sucesso!");
    }

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }
}

module.exports = UserCreateService;  
