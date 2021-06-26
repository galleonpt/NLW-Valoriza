import { getCustomRepository } from "typeorm"
import { CustomException } from "../exceptions/CustomException"
import { EnsureEmailSecurity } from "../providers/email/ensureEmailSecurity"
import { UserRepositories } from "../repositories/UsersRepositories"
import { compare } from 'bcryptjs'
import {sign} from 'jsonwebtoken'


interface IAuthenticateRequest{
  email:string,
  password: string
}

class AuthenticateUserService{
  async execute({email, password}: IAuthenticateRequest){
    const userRepositories=getCustomRepository(UserRepositories)
  const emailProvider= new EnsureEmailSecurity()

    const allUsers = await userRepositories.find()

    const user= allUsers.find( item => emailProvider.decrypt(item.email) === email )

    // user.email= emailProvider.decrypt(user.email)

    if(!user)
      throw new CustomException({status: 400, message: 'Invalid credentials'})

    const pwMatch = await compare(password, user.password)

    if(!pwMatch)
      throw new CustomException({status: 400, message: 'Invalid credentials'})

    const token= sign({
      email:user.email
    }, process.env.JWT_SECRET,{
      subject:user.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticateUserService }