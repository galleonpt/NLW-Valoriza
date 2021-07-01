import { getCustomRepository } from "typeorm"
import { CustomException } from "../errors/CustomException";
import { UserRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"
import { EnsureEmailSecurity } from "../providers/email/ensureEmailSecurity";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password:string
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UserRepositories);
    const emailProvider= new EnsureEmailSecurity()

    if (!email)
      throw new CustomException({status:422, message:"Invalid email!"})

    const allUsers= await usersRepository.find()

    //run user by user and check if the email match
    const userAlreadyExists= allUsers.find( item => emailProvider.decrypt(item.email) === email )

    if (userAlreadyExists)
      throw new CustomException({status:409, message:"User already exists!"})

    const hashedPW= await hash(password, 10)

    //creating an user
    const user = usersRepository.create({
      name, 
      email:emailProvider.encrypt(email), 
      admin,
      password:hashedPW
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserService }