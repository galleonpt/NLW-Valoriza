import { getCustomRepository } from "typeorm"
import { CustomException } from "../errors/CustomException"
import { EnsureEmailSecurity } from "../providers/email/ensureEmailSecurity"
import { SendEmail } from "../providers/email/sendEmail"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UserRepositories } from "../repositories/UsersRepositories"

interface IComplimentRequest{
  tag_id:string,
  user_sender:string,
  user_receiver:string,
  message:string,
}


class CreateComplimentService{
  async execute({message, tag_id, user_receiver, user_sender}: IComplimentRequest){
    const complimentsRepositories= getCustomRepository(ComplimentsRepositories)
    const usersRepositories= getCustomRepository(UserRepositories)
    const sendEmail= new SendEmail()
    const ensureEmailSecurity= new EnsureEmailSecurity()

    if(user_sender === user_receiver)
      throw new CustomException({status:400, message:"Incorrect user receiver"})

    const userReceiverExists=await usersRepositories.findOne(user_receiver)

    if(!userReceiverExists)
      throw new CustomException({status:404, message:"User receiver does not exists"})

    const compliment= complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    })

    await complimentsRepositories.save(compliment)

    sendEmail.execute(ensureEmailSecurity.decrypt(userReceiverExists.email))

    return compliment

  }
}

export {CreateComplimentService}